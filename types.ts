export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface StatItem {
  num: string;
  label: string;
}