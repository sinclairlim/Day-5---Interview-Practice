import { useState } from 'react';

interface JobDescriptionInputProps {
  onAnalyze: (jobDescription: string) => void;
}

export function JobDescriptionInput({ onAnalyze }: JobDescriptionInputProps) {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      onAnalyze(jobDescription);
    }
  };

  const sampleJD = `Full Stack Developer - Tech Startup

We are looking for an experienced Full Stack Developer to join our growing team.

Required Skills:
- 3+ years of experience with React and TypeScript
- Strong proficiency in Node.js and Express
- Experience with SQL databases (PostgreSQL preferred)
- Knowledge of Git and version control
- Familiarity with AWS cloud services

Nice to have:
- Docker and containerization experience
- System design knowledge
- Experience with algorithms and data structures

Responsibilities:
- Build scalable web applications using React and Node.js
- Design and implement RESTful APIs
- Write efficient SQL queries and optimize database performance
- Collaborate using Git and code reviews`;

  const handleUseSample = () => {
    setJobDescription(sampleJD);
  };

  return (
    <div className="job-input-container">
      <h1>Interview Practice Analyzer</h1>
      <p className="subtitle">
        Paste a job description to identify required skills and test your knowledge
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          className="job-textarea"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={15}
        />

        <div className="button-group">
          <button type="button" onClick={handleUseSample} className="btn-secondary">
            Use Sample Job Description
          </button>
          <button type="submit" className="btn-primary" disabled={!jobDescription.trim()}>
            Analyze & Start Practice
          </button>
        </div>
      </form>
    </div>
  );
}
