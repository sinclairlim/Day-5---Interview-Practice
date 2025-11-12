import { SkillCategory, DetectedSkill } from '../types';

const skillKeywords: Record<SkillCategory, string[]> = {
  SQL: ['sql', 'mysql', 'postgresql', 'postgres', 'database', 'queries', 'nosql', 'mongodb'],
  TypeScript: ['typescript', 'ts', 'type safety', 'strongly typed'],
  JavaScript: ['javascript', 'js', 'es6', 'ecmascript', 'node'],
  React: ['react', 'reactjs', 'react.js', 'jsx', 'hooks', 'redux'],
  'Node.js': ['node', 'nodejs', 'node.js', 'express', 'npm', 'backend'],
  Python: ['python', 'django', 'flask', 'pandas', 'numpy'],
  Java: ['java', 'spring', 'hibernate', 'maven'],
  'C++': ['c++', 'cpp'],
  Git: ['git', 'github', 'gitlab', 'version control', 'bitbucket'],
  Docker: ['docker', 'container', 'kubernetes', 'k8s'],
  AWS: ['aws', 'amazon web services', 'ec2', 's3', 'lambda'],
  'System Design': ['system design', 'architecture', 'scalability', 'microservices', 'distributed systems'],
  Algorithms: ['algorithms', 'algorithmic', 'leetcode', 'coding challenge'],
  'Data Structures': ['data structures', 'arrays', 'linked lists', 'trees', 'graphs', 'hash tables'],
};

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractSkills(jobDescription: string): DetectedSkill[] {
  const lowerText = jobDescription.toLowerCase();
  const detectedSkills: DetectedSkill[] = [];

  for (const [skill, keywords] of Object.entries(skillKeywords)) {
    let mentions = 0;

    keywords.forEach(keyword => {
      const escapedKeyword = escapeRegex(keyword);
      const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        mentions += matches.length;
      }
    });

    if (mentions > 0) {
      const confidence = Math.min(mentions * 20, 100); // Cap at 100%
      detectedSkills.push({
        skill: skill as SkillCategory,
        confidence,
        mentions,
      });
    }
  }

  // Sort by mentions (most mentioned first)
  return detectedSkills.sort((a, b) => b.mentions - a.mentions);
}

export function getTopSkills(detectedSkills: DetectedSkill[], count: number = 5): DetectedSkill[] {
  return detectedSkills.slice(0, count);
}
