export type GameState = 'WELCOME' | 'PLAYING' | 'ROOM_TRANSITION' | 'VICTORY' | 'GAME_OVER';

export interface RoomConfig {
  id: number;
  title: string;
  subtitle: string;
  exhibitName: string;
  lore: string;
  backgroundUrl: string;
  clues: string[];
  answer: string[]; // accepted string variants (case-insensitive)
  solutionExplanation: string;
}

export interface GameStats {
  hintsUsed: number;
  timeRemaining: number;
  timeElapsed: number;
  completedRooms: number[];
  failedRoom?: number;
}
