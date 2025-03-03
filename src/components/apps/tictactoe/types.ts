export type PlayerSymbol = 'X' | 'O';

export type Players = {
  X: string;
  O: string;
};

export type GameTurn = {
  square: {
    row: number;
    col: number;
  };
  player: PlayerSymbol;
};

export type GameBoardType = (null | PlayerSymbol)[][];

export interface PlayerProps {
  initialName: string;
  symbol: PlayerSymbol;
  isActive: boolean;
  onChangeName: (symbol: PlayerSymbol, newName: string) => void;
}

export interface GameBoardProps {
  onSelectSquare: (row: number, col: number) => void;
  board: GameBoardType;
}

export interface GameOverProps {
  winner?: string;
  onRestart: () => void;
}

export interface LogProps {
  turns: GameTurn[];
}