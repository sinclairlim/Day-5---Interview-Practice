# Interview Practice Analyzer

An interactive web application that analyzes job descriptions, identifies required skills, and generates practice questions to help you prepare for technical interviews.

## Features

- **Job Description Analysis**: Paste any job description and automatically detect required skills
- **Skill Detection**: Identifies 14+ skill categories including:
  - SQL, TypeScript, JavaScript, React, Node.js
  - Python, Java, C++, Git, Docker, AWS
  - System Design, Algorithms, Data Structures
- **Dual Question Modes**:
  - **Pre-set Questions**: 30+ curated questions (free, instant)
  - **AI-Generated Questions**: Custom questions tailored to the specific job description using OpenAI API
- **Multiple Question Types**:
  - Multiple choice questions
  - Code writing exercises
  - Short answer questions
- **Performance Tracking**:
  - Overall score calculation
  - Skill-by-skill breakdown
  - Personalized recommendations
- **Interactive UI**: Clean, modern interface with instant feedback

## How It Works

1. **Paste Job Description**: Enter the job posting text
2. **View Detected Skills**: See which skills are required and their relevance
3. **Choose Mode**: Select pre-set questions (free) or AI-generated (requires OpenAI API key)
4. **Take Practice Test**: Answer 3 questions per detected skill
5. **Review Results**: Get your score and recommendations for improvement

## AI-Powered Questions

For custom, job-specific questions:
1. Get a free API key from [OpenAI](https://platform.openai.com/api-keys)
2. Select "AI-Generated" mode when starting your test
3. Enter your API key (stored only in your browser)
4. Questions are generated in ~15-30 seconds
5. Cost: ~$0.01-0.02 per test session

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with responsive design
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app will run on [http://localhost:5173](http://localhost:5173)

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the Vite configuration
6. Click "Deploy"

### Option 3: Manual Deploy

1. Build the project: `npm run build`
2. Upload the `dist` folder to Vercel
3. Configure the output directory as `dist`

## Project Structure

```
src/
├── components/          # React components
│   ├── JobDescriptionInput.tsx
│   ├── SkillsList.tsx
│   ├── QuestionCard.tsx
│   └── TestInterface.tsx
├── services/           # Business logic
│   ├── skillExtractor.ts
│   └── questionGenerator.ts
├── data/              # Question bank
│   └── questions.ts
├── types/             # TypeScript definitions
│   └── index.ts
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Styles
```

## Customization

### Adding New Skills

Edit `src/types/index.ts` to add new skill categories:

```typescript
export type SkillCategory = 'SQL' | 'TypeScript' | 'YourNewSkill';
```

Then add keywords in `src/services/skillExtractor.ts`:

```typescript
const skillKeywords: Record<SkillCategory, string[]> = {
  YourNewSkill: ['keyword1', 'keyword2', 'keyword3'],
  // ...
};
```

### Adding New Questions

Add questions to `src/data/questions.ts`:

```typescript
{
  id: 'unique-id',
  skill: 'SQL',
  type: 'multiple-choice',
  question: 'Your question here?',
  answers: [
    { id: 'a', text: 'Option A', isCorrect: true },
    { id: 'b', text: 'Option B', isCorrect: false },
  ],
  explanation: 'Why the answer is correct',
}
```

### Styling

Modify `src/index.css` to customize colors and layout. CSS variables are defined at the top:

```css
:root {
  --primary-color: #3b82f6;
  --success-color: #22c55e;
  --error-color: #ef4444;
  /* ... */
}
```

## Features Roadmap

- [ ] Add more question types (drag & drop, fill in the blank)
- [ ] Save progress to localStorage
- [ ] Export results as PDF
- [ ] Add timer for timed practice sessions
- [ ] Include coding sandbox for live code execution
- [ ] Add difficulty levels for questions
- [ ] Support multiple languages (i18n)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your interview preparation!

## Sample Job Description

Try this sample job description to see the app in action:

```
Full Stack Developer - Tech Startup

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
- Collaborate using Git and code reviews
```

## Support

For issues or questions, please open a GitHub issue.

---

Built with React, TypeScript, and Vite. Ready for deployment on Vercel.
