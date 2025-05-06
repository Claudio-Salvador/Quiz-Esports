export interface Player {
  id: number;
  name: string;
  score: number;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  backgroundColor: string;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export type GameStage = 'registration' | 'category-selection' | 'quiz' | 'results';