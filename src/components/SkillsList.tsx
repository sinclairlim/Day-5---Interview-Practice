import { useState } from 'react';
import { DetectedSkill } from '../types';

interface SkillsListProps {
  skills: DetectedSkill[];
  onStartTest: (aiProvider: 'none' | 'openai' | 'gemini') => void;
}

export function SkillsList({ skills, onStartTest }: SkillsListProps) {
  const [selectedMode, setSelectedMode] = useState<'preset' | 'openai' | 'gemini'>('preset');

  return (
    <div className="skills-container">
      <h2>Detected Skills</h2>
      <p className="subtitle">
        We found {skills.length} skill{skills.length !== 1 ? 's' : ''} from the job description
      </p>

      <div className="skills-grid">
        {skills.map((skillData) => (
          <div key={skillData.skill} className="skill-card">
            <div className="skill-header">
              <h3>{skillData.skill}</h3>
              <span className="skill-badge">{skillData.mentions} mentions</span>
            </div>
            <div className="skill-confidence">
              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${Math.min(skillData.confidence, 100)}%` }}
                />
              </div>
              <span className="confidence-text">{Math.min(skillData.confidence, 100)}% relevance</span>
            </div>
          </div>
        ))}
      </div>

      <div className="action-section">
        <h3>Choose Question Mode</h3>

        <div className="mode-selector">
          <button
            className={`mode-option ${selectedMode === 'preset' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('preset')}
          >
            <div className="mode-icon">📚</div>
            <div className="mode-title">Pre-set Questions</div>
            <div className="mode-description">Curated questions from our question bank</div>
            <div className="mode-badge">Free • Instant</div>
          </button>

          <button
            className={`mode-option ${selectedMode === 'gemini' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('gemini')}
          >
            <div className="mode-icon">✨</div>
            <div className="mode-title">Gemini AI</div>
            <div className="mode-description">Custom questions with Google's Gemini</div>
            <div className="mode-badge">Free Tier Available</div>
          </button>

          <button
            className={`mode-option ${selectedMode === 'openai' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('openai')}
          >
            <div className="mode-icon">🤖</div>
            <div className="mode-title">OpenAI GPT</div>
            <div className="mode-description">Custom questions with GPT-4</div>
            <div className="mode-badge">Paid API Required</div>
          </button>
        </div>

        <button
          onClick={() => onStartTest(selectedMode === 'preset' ? 'none' : selectedMode)}
          className="btn-primary btn-large"
        >
          Start Practice Test
        </button>
      </div>
    </div>
  );
}
