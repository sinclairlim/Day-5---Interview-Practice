import { useState } from 'react';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { SkillsList } from './components/SkillsList';
import { TestInterface } from './components/TestInterface';
import { ApiKeyInput } from './components/ApiKeyInput';
import { extractSkills, getTopSkills } from './services/skillExtractor';
import { generateQuestionsForSkills } from './services/questionGenerator';
import { initializeOpenAI, generateAIQuestions } from './services/aiQuestionGenerator';
import { initializeGemini, generateGeminiQuestions } from './services/geminiQuestionGenerator';
import { DetectedSkill, Question } from './types';

type AppState = 'input' | 'skills' | 'test' | 'api-key' | 'loading';
type AIProvider = 'none' | 'openai' | 'gemini';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [detectedSkills, setDetectedSkills] = useState<DetectedSkill[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [aiProvider, setAIProvider] = useState<AIProvider>('none');

  const handleAnalyze = (jd: string) => {
    const skills = extractSkills(jd);
    const topSkills = getTopSkills(skills, 5);
    setDetectedSkills(topSkills);
    setJobDescription(jd);
    setState('skills');
  };

  const handleStartTest = async (provider: AIProvider) => {
    setAIProvider(provider);

    if (provider !== 'none') {
      // Check for API key based on provider
      const envKeyName = provider === 'openai' ? 'VITE_OPENAI_API_KEY' : 'VITE_GEMINI_API_KEY';
      const storageKeyName = provider === 'openai' ? 'openai_api_key' : 'gemini_api_key';

      const envKey = import.meta.env[envKeyName];
      const savedKey = localStorage.getItem(storageKeyName);
      const apiKey = envKey && envKey !== 'your-api-key-here' ? envKey : savedKey;

      if (!apiKey) {
        setState('api-key');
        return;
      }

      // Generate AI questions
      setState('loading');
      try {
        const skillNames = detectedSkills.map(s => s.skill);
        let aiQuestions: Question[];

        if (provider === 'openai') {
          initializeOpenAI(apiKey);
          aiQuestions = await generateAIQuestions(skillNames, 3, jobDescription);
        } else {
          initializeGemini(apiKey);
          aiQuestions = await generateGeminiQuestions(skillNames, 3, jobDescription);
        }

        if (aiQuestions.length === 0) {
          throw new Error('No questions generated');
        }

        setQuestions(aiQuestions);
        setState('test');
      } catch (err: any) {
        setState('skills');
        alert('Error generating AI questions: ' + (err.message || 'Unknown error') + '\n\nPlease check your API key or try pre-set questions.');
      }
    } else {
      // Use pre-set questions
      const generatedQuestions = generateQuestionsForSkills(detectedSkills, 3);
      setQuestions(generatedQuestions);
      setState('test');
    }
  };

  const handleApiKeySubmit = async (key: string) => {
    const storageKey = aiProvider === 'openai' ? 'openai_api_key' : 'gemini_api_key';
    localStorage.setItem(storageKey, key);
    // Now start the test with AI
    await handleStartTest(aiProvider);
  };

  const handleRestart = () => {
    setDetectedSkills([]);
    setQuestions([]);
    setJobDescription('');
    setState('input');
  };

  return (
    <div className="app">
      <div className="container">
        {state === 'input' && <JobDescriptionInput onAnalyze={handleAnalyze} />}

        {state === 'skills' && (
          <SkillsList skills={detectedSkills} onStartTest={handleStartTest} />
        )}

        {state === 'api-key' && (
          <ApiKeyInput
            onApiKeySubmit={handleApiKeySubmit}
            provider={aiProvider === 'gemini' ? 'gemini' : 'openai'}
          />
        )}

        {state === 'loading' && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h2>Generating AI Questions...</h2>
            <p>This may take 10-30 seconds</p>
          </div>
        )}

        {state === 'test' && (
          <TestInterface
            questions={questions}
            skills={detectedSkills}
            onRestart={handleRestart}
            useAI={aiProvider !== 'none'}
          />
        )}
      </div>
    </div>
  );
}

export default App;
