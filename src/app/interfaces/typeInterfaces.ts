export interface Game {
  bestTime: number;
  moyTime: number;
  pseudo: string;
  id: number;
}
export interface Click {
  time: number;
  gameId: number;
  clickNumber: number;
}

export interface Pos {
  x: number;
  y: number;
}
