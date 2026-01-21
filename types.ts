
export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum SkillCategory {
  CODING = 'CODING',
  LANGUAGES = 'LANGUAGES',
  ARTS = 'ARTS',
  SCIENCE = 'SCIENCE'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  level: number;
  streak: number;
  badges: Badge[];
  completedLessons: string[];
  currentQuest?: Quest;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlockedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  category: SkillCategory;
  difficulty: Difficulty;
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quest {
  id: string;
  title: string;
  steps: string[];
  currentStep: number;
  rewardPoints: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  avatar: string;
}
