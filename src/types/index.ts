export type SkillCategory =
  | 'SQL'
  | 'TypeScript'
  | 'JavaScript'
  | 'React'
  | 'Node.js'
  | 'Python'
  | 'Java'
  | 'C++'
  | 'Git'
  | 'Docker'
  | 'AWS'
  | 'System Design'
  | 'Algorithms'
  | 'Data Structures';

export type QuestionType = 'multiple-choice' | 'code' | 'short-answer';

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  skill: SkillCategory;
  type: QuestionType;
  question: string;
  answers?: Answer[];
  correctAnswer?: string;
  explanation?: string;
  code?: string;
}

export interface DetectedSkill {
  skill: SkillCategory;
  confidence: number;
  mentions: number;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timestamp: Date;
  score?: number; // 0-100, for AI-evaluated code
}

export interface TestSession {
  skills: DetectedSkill[];
  questions: Question[];
  userAnswers: UserAnswer[];
  score: number;
  startTime: Date;
  endTime?: Date;
}
