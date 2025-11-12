import { Question, DetectedSkill, SkillCategory } from '../types';
import { questionBank } from '../data/questions';

export function generateQuestionsForSkills(
  detectedSkills: DetectedSkill[],
  questionsPerSkill: number = 3
): Question[] {
  const selectedQuestions: Question[] = [];

  detectedSkills.forEach(({ skill }) => {
    const skillQuestions = questionBank.filter(q => q.skill === skill);

    // Shuffle and take the specified number of questions
    const shuffled = [...skillQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, questionsPerSkill);

    selectedQuestions.push(...selected);
  });

  return selectedQuestions;
}

export function getQuestionsBySkill(skill: SkillCategory): Question[] {
  return questionBank.filter(q => q.skill === skill);
}

export function getAllQuestions(): Question[] {
  return questionBank;
}
