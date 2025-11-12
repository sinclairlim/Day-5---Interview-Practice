import OpenAI from 'openai';
import { Question, SkillCategory } from '../types';

// Initialize OpenAI client (will use API key from user)
let openaiClient: OpenAI | null = null;

export function initializeOpenAI(apiKey: string) {
  openaiClient = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Note: In production, API calls should go through a backend
  });
}

export async function generateAIQuestions(
  skills: SkillCategory[],
  questionsPerSkill: number = 3,
  jobDescription: string
): Promise<Question[]> {
  if (!openaiClient) {
    throw new Error('OpenAI client not initialized. Please provide an API key.');
  }

  const allQuestions: Question[] = [];

  for (const skill of skills) {
    try {
      const prompt = `You are an expert technical interviewer. Based on this job description:

${jobDescription}

Generate ${questionsPerSkill} CODING CHALLENGE questions for the skill: ${skill}

Requirements:
- Questions should be realistic coding problems they'd encounter in this specific role
- Mix of difficulty levels (easy, medium, hard)
- Should be solvable in 5-15 minutes
- Include a description of what the function/code should do
- Provide test cases or examples
- Provide a sample solution

Format your response as a JSON array with this structure:
[
  {
    "question": "Write a function that does X. Include function signature and examples.",
    "sampleSolution": "// Complete working code solution",
    "testCases": "Example inputs and expected outputs"
  }
]

Return ONLY the JSON array, no additional text.`;

      const response = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a technical interview coding challenge generator. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        console.warn(`No content received for skill: ${skill}`);
        continue;
      }

      console.log(`Raw response for ${skill}:`, content);

      // Parse the JSON response
      let generatedQuestions;
      try {
        // Try to extract JSON if it's wrapped in markdown code blocks
        const jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        generatedQuestions = JSON.parse(jsonString);
      } catch (parseError) {
        console.error(`JSON parse error for ${skill}:`, parseError);
        console.error('Content was:', content);
        continue;
      }

      // Convert to our Question format
      if (Array.isArray(generatedQuestions)) {
        generatedQuestions.forEach((q: any, index: number) => {
          allQuestions.push({
            id: `ai-${skill}-${index}-${Date.now()}`,
            skill: skill,
            type: 'code',
            question: q.question || 'Question not provided',
            correctAnswer: q.sampleSolution || '',
            explanation: q.testCases || '',
          });
        });
      }
    } catch (error: any) {
      console.error(`Error generating questions for ${skill}:`, error);
      console.error('Error details:', error.message, error.stack);
      // Continue with other skills even if one fails
    }
  }

  console.log(`Total questions generated: ${allQuestions.length}`);

  if (allQuestions.length === 0) {
    throw new Error('No questions were generated. Please check your API key and try again.');
  }

  return allQuestions;
}

// AI Code Evaluation
export interface CodeEvaluation {
  score: number; // 0-100
  isCorrect: boolean;
  feedback: string;
  strengths: string[];
  improvements: string[];
  correctedCode?: string;
}

export async function evaluateCode(
  question: string,
  userCode: string,
  skill: SkillCategory,
  sampleSolution?: string
): Promise<CodeEvaluation> {
  if (!openaiClient) {
    throw new Error('OpenAI client not initialized. Please provide an API key.');
  }

  try {
    const prompt = `You are an expert technical interviewer evaluating a candidate's coding solution.

QUESTION:
${question}

${sampleSolution ? `SAMPLE SOLUTION:\n${sampleSolution}\n\n` : ''}CANDIDATE'S CODE:
${userCode}

Evaluate the candidate's code for the skill: ${skill}

Provide a JSON response with this structure:
{
  "score": 0-100 (integer),
  "isCorrect": true/false,
  "feedback": "Overall assessment in 2-3 sentences",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "correctedCode": "If code has bugs, provide corrected version. Otherwise null"
}

Consider:
- Correctness: Does it solve the problem?
- Code quality: Is it clean and readable?
- Efficiency: Is it reasonably optimized?
- Best practices: Does it follow conventions for ${skill}?
- Edge cases: Does it handle edge cases?

Be constructive and specific in feedback. Return ONLY valid JSON.`;

    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a fair and constructive technical interviewer. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const evaluation: CodeEvaluation = JSON.parse(content);
    return evaluation;
  } catch (error) {
    console.error('Error evaluating code:', error);
    throw error;
  }
}
