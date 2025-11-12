import { useState } from 'react';
import { Question, Answer } from '../types';
import { evaluateCode, CodeEvaluation } from '../services/aiQuestionGenerator';
import { evaluateCodeWithGemini } from '../services/geminiQuestionGenerator';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: string, selectedAnswer: string, isCorrect: boolean, score?: number) => void;
  useAI?: boolean;
}

export function QuestionCard({ question, questionNumber, totalQuestions, onAnswer, useAI = false }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userCodeAnswer, setUserCodeAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<CodeEvaluation | null>(null);

  const handleMultipleChoiceAnswer = (answer: Answer) => {
    setSelectedAnswer(answer.id);
    setShowExplanation(true);
    onAnswer(question.id, answer.id, answer.isCorrect);
  };

  const handleCodeAnswer = async () => {
    if (!userCodeAnswer.trim()) return;

    setIsEvaluating(true);

    try {
      if (useAI) {
        // Use AI to evaluate the code
        // Detect which AI provider is being used by checking question ID
        const isGemini = question.id.startsWith('gemini-');

        let result: CodeEvaluation;
        if (isGemini) {
          result = await evaluateCodeWithGemini(
            question.question,
            userCodeAnswer,
            question.skill,
            question.correctAnswer
          );
        } else {
          result = await evaluateCode(
            question.question,
            userCodeAnswer,
            question.skill,
            question.correctAnswer
          );
        }

        setEvaluation(result);
        setShowExplanation(true);
        onAnswer(question.id, userCodeAnswer, result.isCorrect, result.score);
      } else {
        // Simple check for pre-set questions
        const isCorrect = userCodeAnswer.trim().toLowerCase().includes(
          question.correctAnswer?.toLowerCase().split(' ')[0] || ''
        );

        setShowExplanation(true);
        onAnswer(question.id, userCodeAnswer, isCorrect);
      }
    } catch (error) {
      console.error('Error evaluating code:', error);
      alert('Error evaluating your code. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="skill-tag">{question.skill}</span>
      </div>

      <h3 className="question-text">{question.question}</h3>

      {question.type === 'multiple-choice' && question.answers && (
        <div className="answers-list">
          {question.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleMultipleChoiceAnswer(answer)}
              disabled={selectedAnswer !== null}
              className={`answer-button ${
                selectedAnswer === answer.id
                  ? answer.isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : ''
              } ${selectedAnswer !== null && answer.isCorrect ? 'show-correct' : ''}`}
            >
              <span className="answer-letter">{answer.id.toUpperCase()}</span>
              <span className="answer-text">{answer.text}</span>
              {selectedAnswer !== null && answer.isCorrect && (
                <span className="check-mark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {question.type === 'code' && (
        <div className="code-answer-section">
          <textarea
            className="code-textarea"
            value={userCodeAnswer}
            onChange={(e) => setUserCodeAnswer(e.target.value)}
            placeholder="Write your code solution here..."
            rows={12}
            disabled={showExplanation}
            spellCheck={false}
          />
          {!showExplanation && (
            <button
              onClick={handleCodeAnswer}
              className="btn-primary"
              disabled={!userCodeAnswer.trim() || isEvaluating}
            >
              {isEvaluating ? 'Evaluating...' : 'Submit & Get AI Feedback'}
            </button>
          )}
        </div>
      )}

      {/* AI Evaluation Results */}
      {evaluation && useAI && (
        <div className={`ai-evaluation ${evaluation.isCorrect ? 'correct' : 'needs-improvement'}`}>
          <div className="evaluation-header">
            <h4>AI Evaluation</h4>
            <div className="score-badge">
              Score: {evaluation.score}/100
            </div>
          </div>

          <div className="evaluation-feedback">
            <p className="feedback-text">{evaluation.feedback}</p>
          </div>

          {evaluation.strengths.length > 0 && (
            <div className="evaluation-section strengths">
              <h5>✓ Strengths:</h5>
              <ul>
                {evaluation.strengths.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.improvements.length > 0 && (
            <div className="evaluation-section improvements">
              <h5>→ Suggestions for Improvement:</h5>
              <ul>
                {evaluation.improvements.map((improvement, idx) => (
                  <li key={idx}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.correctedCode && (
            <div className="corrected-code">
              <h5>Corrected Solution:</h5>
              <pre>{evaluation.correctedCode}</pre>
            </div>
          )}

          {!evaluation.correctedCode && question.correctAnswer && (
            <div className="sample-solution">
              <h5>Sample Solution:</h5>
              <pre>{question.correctAnswer}</pre>
            </div>
          )}

          {question.explanation && (
            <div className="test-cases">
              <h5>Test Cases:</h5>
              <pre>{question.explanation}</pre>
            </div>
          )}
        </div>
      )}

      {/* Non-AI Explanation (for pre-set questions) */}
      {showExplanation && !useAI && question.explanation && (
        <div className="explanation">
          <h4>Explanation:</h4>
          <p>{question.explanation}</p>
          {question.type === 'code' && question.correctAnswer && (
            <div className="correct-answer">
              <strong>Example Answer:</strong>
              <pre>{question.correctAnswer}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
