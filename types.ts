export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export enum AIState {
  NORMAL = 'NORMAL',
  POISONED = 'POISONED',
  TRIGGERED = 'TRIGGERED',
}

export interface SimulationStats {
  confidence: number;
  classification: string;
  isCorrect: boolean;
}