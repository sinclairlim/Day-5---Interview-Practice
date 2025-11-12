import { useState } from 'react';
import { Question, UserAnswer, DetectedSkill } from '../types';
import { QuestionCard } from './QuestionCard';

interface TestInterfaceProps {
  questions: Question[];
  skills: DetectedSkill[];
  onRestart: () => void;
  useAI?: boolean;
}

export function TestInterface({ questions, skills, onRestart, useAI = false }: TestInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  const handleAnswer = (questionId: string, selectedAnswer: string, isCorrect: boolean, score?: number) => {
    const newAnswer: UserAnswer = {
      questionId,
      selectedAnswer,
      isCorrect,
      timestamp: new Date(),
      score,
    };

    setUserAnswers([...userAnswers, newAnswer]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const score = userAnswers.filter((a) => a.isCorrect).length;
  const totalAnswered = userAnswers.length;
  const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

  if (testComplete) {
    const skillScores = skills.map((skill) => {
      const skillQuestions = questions.filter((q) => q.skill === skill.skill);
      const skillAnswers = userAnswers.filter((a) =>
        skillQuestions.some((q) => q.id === a.questionId)
      );
      const skillScore = skillAnswers.filter((a) => a.isCorrect).length;
      return {
        skill: skill.skill,
        score: skillScore,
        total: skillQuestions.length,
        percentage: skillQuestions.length > 0 ? Math.round((skillScore / skillQuestions.length) * 100) : 0,
      };
    });

    return (
      <div className="test-complete">
        <h2>Test Complete!</h2>

        <div className="overall-score">
          <div className="score-circle">
            <span className="score-number">{percentage}%</span>
            <span className="score-label">Overall Score</span>
          </div>
          <p className="score-text">
            You got {score} out of {questions.length} questions correct
          </p>
        </div>

        <div className="skill-breakdown">
          <h3>Performance by Skill</h3>
          {skillScores.map((skillScore) => (
            <div key={skillScore.skill} className="skill-score-card">
              <div className="skill-score-header">
                <span className="skill-name">{skillScore.skill}</span>
                <span className="skill-score">
                  {skillScore.score}/{skillScore.total}
                </span>
              </div>
              <div className="skill-score-bar">
                <div
                  className="skill-score-fill"
                  style={{ width: `${skillScore.percentage}%` }}
                />
              </div>
              <span className="skill-percentage">{skillScore.percentage}% correct</span>
            </div>
          ))}
        </div>

        <div className="recommendations">
          <h3>Recommendations</h3>
          {skillScores
            .filter((s) => s.percentage < 70)
            .map((s) => (
              <div key={s.skill} className="recommendation-card">
                <strong>{s.skill}</strong>: Consider reviewing this topic more. You scored {s.percentage}%.
              </div>
            ))}
          {skillScores.every((s) => s.percentage >= 70) && (
            <p className="success-message">
              Great job! You're well-prepared for this position. Keep practicing to maintain your skills.
            </p>
          )}
        </div>

        <button onClick={onRestart} className="btn-primary btn-large">
          Analyze New Job Description
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnsweredCurrent = userAnswers.some((a) => a.questionId === currentQuestion.id);

  return (
    <div className="test-interface">
      <div className="test-header">
        <h2>Practice Test</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">
          Progress: {currentQuestionIndex + 1} / {questions.length} questions
        </p>
      </div>

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        useAI={useAI}
      />

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="btn-secondary"
        >
          Previous
        </button>

        <div className="score-display">
          Score: {score} / {totalAnswered} answered
        </div>

        <button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent}
          className="btn-primary"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish Test'}
        </button>
      </div>
    </div>
  );
}
