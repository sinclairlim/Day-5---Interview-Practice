import { Question } from '../types';

export const questionBank: Question[] = [
  // SQL Questions
  {
    id: 'sql-1',
    skill: 'SQL',
    type: 'multiple-choice',
    question: 'Which SQL clause is used to filter the results of a query?',
    answers: [
      { id: 'a', text: 'WHERE', isCorrect: true },
      { id: 'b', text: 'HAVING', isCorrect: false },
      { id: 'c', text: 'GROUP BY', isCorrect: false },
      { id: 'd', text: 'ORDER BY', isCorrect: false },
    ],
    explanation: 'WHERE is used to filter rows before grouping, while HAVING filters after grouping.',
  },
  {
    id: 'sql-2',
    skill: 'SQL',
    type: 'code',
    question: 'Write a SQL query to find all employees with a salary greater than 50000:',
    correctAnswer: 'SELECT * FROM employees WHERE salary > 50000;',
    explanation: 'Use SELECT with WHERE clause to filter based on salary condition.',
  },
  {
    id: 'sql-3',
    skill: 'SQL',
    type: 'multiple-choice',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    answers: [
      { id: 'a', text: 'INNER JOIN returns only matching rows from both tables', isCorrect: true },
      { id: 'b', text: 'LEFT JOIN returns only matching rows from both tables', isCorrect: false },
      { id: 'c', text: 'There is no difference', isCorrect: false },
      { id: 'd', text: 'INNER JOIN is faster than LEFT JOIN', isCorrect: false },
    ],
    explanation: 'INNER JOIN returns only rows with matches in both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right.',
  },
  {
    id: 'sql-4',
    skill: 'SQL',
    type: 'multiple-choice',
    question: 'Which SQL function is used to count the number of rows?',
    answers: [
      { id: 'a', text: 'SUM()', isCorrect: false },
      { id: 'b', text: 'COUNT()', isCorrect: true },
      { id: 'c', text: 'TOTAL()', isCorrect: false },
      { id: 'd', text: 'NUM()', isCorrect: false },
    ],
    explanation: 'COUNT() is the aggregate function used to count rows.',
  },

  // TypeScript Questions
  {
    id: 'ts-1',
    skill: 'TypeScript',
    type: 'multiple-choice',
    question: 'What is the correct way to define an interface in TypeScript?',
    answers: [
      { id: 'a', text: 'interface User { name: string; }', isCorrect: true },
      { id: 'b', text: 'type User = { name: string; }', isCorrect: false },
      { id: 'c', text: 'class User { name: string; }', isCorrect: false },
      { id: 'd', text: 'const User = { name: string; }', isCorrect: false },
    ],
    explanation: 'While option b (type alias) also works, interfaces use the "interface" keyword.',
  },
  {
    id: 'ts-2',
    skill: 'TypeScript',
    type: 'code',
    question: 'Define a TypeScript type for a function that takes two numbers and returns a number:',
    correctAnswer: 'type MathOperation = (a: number, b: number) => number;',
    explanation: 'Function types can be defined using arrow function syntax in type aliases.',
  },
  {
    id: 'ts-3',
    skill: 'TypeScript',
    type: 'multiple-choice',
    question: 'What does the "readonly" modifier do in TypeScript?',
    answers: [
      { id: 'a', text: 'Makes a property immutable after initialization', isCorrect: true },
      { id: 'b', text: 'Makes a property private', isCorrect: false },
      { id: 'c', text: 'Makes a property optional', isCorrect: false },
      { id: 'd', text: 'Makes a property nullable', isCorrect: false },
    ],
    explanation: 'readonly prevents reassignment of a property after it is initialized.',
  },
  {
    id: 'ts-4',
    skill: 'TypeScript',
    type: 'multiple-choice',
    question: 'What is a union type in TypeScript?',
    answers: [
      { id: 'a', text: 'A type that can be one of several types', isCorrect: true },
      { id: 'b', text: 'A type that combines multiple interfaces', isCorrect: false },
      { id: 'c', text: 'A type that represents an array', isCorrect: false },
      { id: 'd', text: 'A type that is always undefined', isCorrect: false },
    ],
    explanation: 'Union types (Type1 | Type2) allow a value to be one of several types.',
  },

  // JavaScript Questions
  {
    id: 'js-1',
    skill: 'JavaScript',
    type: 'multiple-choice',
    question: 'What is the difference between "==" and "===" in JavaScript?',
    answers: [
      { id: 'a', text: '=== checks both value and type', isCorrect: true },
      { id: 'b', text: '== checks both value and type', isCorrect: false },
      { id: 'c', text: 'There is no difference', isCorrect: false },
      { id: 'd', text: '=== only checks type', isCorrect: false },
    ],
    explanation: '=== is strict equality (checks type and value), while == is loose equality (type coercion).',
  },
  {
    id: 'js-2',
    skill: 'JavaScript',
    type: 'multiple-choice',
    question: 'What does the "map()" method do in JavaScript?',
    answers: [
      { id: 'a', text: 'Transforms each element in an array and returns a new array', isCorrect: true },
      { id: 'b', text: 'Filters elements in an array', isCorrect: false },
      { id: 'c', text: 'Reduces an array to a single value', isCorrect: false },
      { id: 'd', text: 'Sorts an array', isCorrect: false },
    ],
    explanation: 'map() creates a new array by applying a function to each element.',
  },
  {
    id: 'js-3',
    skill: 'JavaScript',
    type: 'multiple-choice',
    question: 'What is a closure in JavaScript?',
    answers: [
      { id: 'a', text: 'A function that has access to variables in its outer scope', isCorrect: true },
      { id: 'b', text: 'A way to close the browser window', isCorrect: false },
      { id: 'c', text: 'A method to end a loop', isCorrect: false },
      { id: 'd', text: 'A type of object', isCorrect: false },
    ],
    explanation: 'Closures allow inner functions to access variables from their outer function scope.',
  },

  // React Questions
  {
    id: 'react-1',
    skill: 'React',
    type: 'multiple-choice',
    question: 'What hook is used to manage state in a functional component?',
    answers: [
      { id: 'a', text: 'useState', isCorrect: true },
      { id: 'b', text: 'useEffect', isCorrect: false },
      { id: 'c', text: 'useContext', isCorrect: false },
      { id: 'd', text: 'useReducer', isCorrect: false },
    ],
    explanation: 'useState is the primary hook for managing local state in functional components.',
  },
  {
    id: 'react-2',
    skill: 'React',
    type: 'multiple-choice',
    question: 'When does useEffect run by default?',
    answers: [
      { id: 'a', text: 'After every render', isCorrect: true },
      { id: 'b', text: 'Only on mount', isCorrect: false },
      { id: 'c', text: 'Only on unmount', isCorrect: false },
      { id: 'd', text: 'Never', isCorrect: false },
    ],
    explanation: 'useEffect runs after every render unless you provide a dependency array.',
  },
  {
    id: 'react-3',
    skill: 'React',
    type: 'multiple-choice',
    question: 'What is the purpose of keys in React lists?',
    answers: [
      { id: 'a', text: 'To help React identify which items have changed', isCorrect: true },
      { id: 'b', text: 'To style list items', isCorrect: false },
      { id: 'c', text: 'To sort list items', isCorrect: false },
      { id: 'd', text: 'To encrypt data', isCorrect: false },
    ],
    explanation: 'Keys help React identify which items in a list have changed, been added, or been removed.',
  },
  {
    id: 'react-4',
    skill: 'React',
    type: 'code',
    question: 'Write a basic React component that displays "Hello World":',
    correctAnswer: 'function HelloWorld() { return <div>Hello World</div>; }',
    explanation: 'A basic React component returns JSX that will be rendered to the DOM.',
  },

  // Node.js Questions
  {
    id: 'node-1',
    skill: 'Node.js',
    type: 'multiple-choice',
    question: 'What is the purpose of package.json in Node.js?',
    answers: [
      { id: 'a', text: 'Manages project metadata and dependencies', isCorrect: true },
      { id: 'b', text: 'Contains JavaScript code', isCorrect: false },
      { id: 'c', text: 'Stores environment variables', isCorrect: false },
      { id: 'd', text: 'Configures the web server', isCorrect: false },
    ],
    explanation: 'package.json is the manifest file that contains project metadata, dependencies, and scripts.',
  },
  {
    id: 'node-2',
    skill: 'Node.js',
    type: 'multiple-choice',
    question: 'What does npm stand for?',
    answers: [
      { id: 'a', text: 'Node Package Manager', isCorrect: true },
      { id: 'b', text: 'New Programming Method', isCorrect: false },
      { id: 'c', text: 'Node Process Manager', isCorrect: false },
      { id: 'd', text: 'Network Package Manager', isCorrect: false },
    ],
    explanation: 'npm is the Node Package Manager used to install and manage dependencies.',
  },

  // Python Questions
  {
    id: 'py-1',
    skill: 'Python',
    type: 'multiple-choice',
    question: 'What is the correct way to create a list in Python?',
    answers: [
      { id: 'a', text: 'my_list = [1, 2, 3]', isCorrect: true },
      { id: 'b', text: 'my_list = (1, 2, 3)', isCorrect: false },
      { id: 'c', text: 'my_list = {1, 2, 3}', isCorrect: false },
      { id: 'd', text: 'my_list = <1, 2, 3>', isCorrect: false },
    ],
    explanation: 'Lists in Python are created using square brackets [].',
  },
  {
    id: 'py-2',
    skill: 'Python',
    type: 'multiple-choice',
    question: 'What is a decorator in Python?',
    answers: [
      { id: 'a', text: 'A function that modifies another function', isCorrect: true },
      { id: 'b', text: 'A way to add colors to output', isCorrect: false },
      { id: 'c', text: 'A type of loop', isCorrect: false },
      { id: 'd', text: 'A class method', isCorrect: false },
    ],
    explanation: 'Decorators are functions that modify the behavior of other functions or methods.',
  },

  // Algorithms Questions
  {
    id: 'algo-1',
    skill: 'Algorithms',
    type: 'multiple-choice',
    question: 'What is the time complexity of binary search?',
    answers: [
      { id: 'a', text: 'O(log n)', isCorrect: true },
      { id: 'b', text: 'O(n)', isCorrect: false },
      { id: 'c', text: 'O(n^2)', isCorrect: false },
      { id: 'd', text: 'O(1)', isCorrect: false },
    ],
    explanation: 'Binary search divides the search space in half each iteration, resulting in O(log n) time complexity.',
  },
  {
    id: 'algo-2',
    skill: 'Algorithms',
    type: 'multiple-choice',
    question: 'Which sorting algorithm has the best average-case time complexity?',
    answers: [
      { id: 'a', text: 'Merge Sort (O(n log n))', isCorrect: true },
      { id: 'b', text: 'Bubble Sort (O(n^2))', isCorrect: false },
      { id: 'c', text: 'Selection Sort (O(n^2))', isCorrect: false },
      { id: 'd', text: 'Insertion Sort (O(n^2))', isCorrect: false },
    ],
    explanation: 'Merge Sort, Quick Sort, and Heap Sort all have O(n log n) average-case complexity.',
  },

  // Data Structures Questions
  {
    id: 'ds-1',
    skill: 'Data Structures',
    type: 'multiple-choice',
    question: 'What data structure uses LIFO (Last In, First Out)?',
    answers: [
      { id: 'a', text: 'Stack', isCorrect: true },
      { id: 'b', text: 'Queue', isCorrect: false },
      { id: 'c', text: 'Linked List', isCorrect: false },
      { id: 'd', text: 'Tree', isCorrect: false },
    ],
    explanation: 'Stacks follow LIFO principle, where the last element added is the first one removed.',
  },
  {
    id: 'ds-2',
    skill: 'Data Structures',
    type: 'multiple-choice',
    question: 'What is the average time complexity for searching in a hash table?',
    answers: [
      { id: 'a', text: 'O(1)', isCorrect: true },
      { id: 'b', text: 'O(log n)', isCorrect: false },
      { id: 'c', text: 'O(n)', isCorrect: false },
      { id: 'd', text: 'O(n^2)', isCorrect: false },
    ],
    explanation: 'Hash tables provide O(1) average-case time complexity for search, insert, and delete operations.',
  },

  // Git Questions
  {
    id: 'git-1',
    skill: 'Git',
    type: 'multiple-choice',
    question: 'What command is used to create a new branch in Git?',
    answers: [
      { id: 'a', text: 'git branch <branch-name>', isCorrect: true },
      { id: 'b', text: 'git create <branch-name>', isCorrect: false },
      { id: 'c', text: 'git new <branch-name>', isCorrect: false },
      { id: 'd', text: 'git add <branch-name>', isCorrect: false },
    ],
    explanation: 'git branch creates a new branch, and git checkout -b creates and switches to it.',
  },
  {
    id: 'git-2',
    skill: 'Git',
    type: 'multiple-choice',
    question: 'What does "git pull" do?',
    answers: [
      { id: 'a', text: 'Fetches and merges changes from remote repository', isCorrect: true },
      { id: 'b', text: 'Pushes local changes to remote', isCorrect: false },
      { id: 'c', text: 'Creates a new branch', isCorrect: false },
      { id: 'd', text: 'Deletes a branch', isCorrect: false },
    ],
    explanation: 'git pull is equivalent to git fetch followed by git merge.',
  },

  // System Design Questions
  {
    id: 'sys-1',
    skill: 'System Design',
    type: 'multiple-choice',
    question: 'What is horizontal scaling?',
    answers: [
      { id: 'a', text: 'Adding more servers to handle increased load', isCorrect: true },
      { id: 'b', text: 'Adding more resources to a single server', isCorrect: false },
      { id: 'c', text: 'Reducing the number of servers', isCorrect: false },
      { id: 'd', text: 'Optimizing code performance', isCorrect: false },
    ],
    explanation: 'Horizontal scaling (scale out) adds more machines, while vertical scaling (scale up) adds resources to existing machines.',
  },
  {
    id: 'sys-2',
    skill: 'System Design',
    type: 'multiple-choice',
    question: 'What is the purpose of a load balancer?',
    answers: [
      { id: 'a', text: 'Distribute traffic across multiple servers', isCorrect: true },
      { id: 'b', text: 'Store user session data', isCorrect: false },
      { id: 'c', text: 'Cache frequently accessed data', isCorrect: false },
      { id: 'd', text: 'Encrypt network traffic', isCorrect: false },
    ],
    explanation: 'Load balancers distribute incoming network traffic across multiple servers to ensure high availability.',
  },
];
