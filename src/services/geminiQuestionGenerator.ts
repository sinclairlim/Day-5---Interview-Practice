import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question, SkillCategory } from '../types';

let genAI: GoogleGenerativeAI | null = null;

export function initializeGemini(apiKey: string) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export interface CodeEvaluation {
  score: number; // 0-100
  isCorrect: boolean;
  feedback: string;
  strengths: string[];
  improvements: string[];
  correctedCode?: string;
}

export async function generateGeminiQuestions(
  skills: SkillCategory[],
  questionsPerSkill: number = 3,
  jobDescription: string
): Promise<Question[]> {
  if (!genAI) {
    throw new Error('Gemini not initialized. Call initializeGemini first.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Generate ${questionsPerSkill} short coding questions for: ${skills.join(', ')}.

Return ONLY this JSON array (no markdown, no code blocks):
[{"skill":"React","question":"Write a debounce hook","explanation":"Test case","correctAnswer":"function useDebounce() {}"}]`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('Gemini Raw Response:', text);

    let parsedQuestions;
    try {
      // Try multiple parsing strategies
      let jsonText = text;

      // Strategy 1: Strip ALL markdown code blocks (including nested ones)
      // Remove outer markdown wrapper
      jsonText = jsonText.replace(/```(?:json)?\s*/g, '').replace(/```\s*/g, '');

      // Strategy 2: Find JSON array pattern
      const arrayMatch = jsonText.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        jsonText = arrayMatch[0];
      } else {
        // Strategy 3: Remove any leading/trailing text
        const cleanText = jsonText.trim();
        if (cleanText.startsWith('[')) {
          jsonText = cleanText;
        }
      }

      parsedQuestions = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Text that failed to parse:', text);
      throw new Error('Failed to parse Gemini response as JSON. Check console for details.');
    }

    if (!Array.isArray(parsedQuestions)) {
      throw new Error('Gemini response is not an array');
    }

    // Convert to Question format
    const questions: Question[] = parsedQuestions.map((q: any, index: number) => ({
      id: `gemini-${q.skill}-${index}`,
      skill: q.skill as SkillCategory,
      type: 'code' as const,
      question: q.question,
      explanation: q.explanation,
      correctAnswer: q.correctAnswer,
    }));

    return questions;
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
}

export async function evaluateCodeWithGemini(
  question: string,
  userCode: string,
  skill: SkillCategory,
  sampleSolution?: string
): Promise<CodeEvaluation> {
  if (!genAI) {
    throw new Error('Gemini not initialized. Call initializeGemini first.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Evaluate this ${skill} code:

Question: ${question}
Code: ${userCode}

Return JSON:
{
  "score": 85,
  "isCorrect": true,
  "feedback": "Brief feedback",
  "strengths": ["strength1"],
  "improvements": ["improvement1"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('Gemini Evaluation Response:', text);

    let evaluation: CodeEvaluation;
    try {
      // Try multiple parsing strategies
      let jsonText = text;

      // Strategy 1: Strip ALL markdown code blocks (including nested ones)
      // Remove outer markdown wrapper
      jsonText = jsonText.replace(/```(?:json)?\s*/g, '').replace(/```\s*/g, '');

      // Strategy 2: Find JSON object pattern
      const objectMatch = jsonText.match(/\{[\s\S]*\}/);
      if (objectMatch) {
        jsonText = objectMatch[0];
      } else {
        // Strategy 3: Remove any leading/trailing text
        const cleanText = jsonText.trim();
        if (cleanText.startsWith('{')) {
          jsonText = cleanText;
        }
      }

      evaluation = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Text that failed to parse:', text);
      throw new Error('Failed to parse Gemini evaluation response. Check console for details.');
    }

    // Ensure required fields exist
    if (typeof evaluation.score !== 'number') {
      evaluation.score = 50; // default
    }
    if (typeof evaluation.isCorrect !== 'boolean') {
      evaluation.isCorrect = evaluation.score >= 70;
    }
    if (!Array.isArray(evaluation.strengths)) {
      evaluation.strengths = [];
    }
    if (!Array.isArray(evaluation.improvements)) {
      evaluation.improvements = [];
    }

    return evaluation;
  } catch (error: any) {
    console.error('Gemini Evaluation Error:', error);
    throw new Error(`Failed to evaluate code: ${error.message}`);
  }
}
