export type AlgorithmResult = {
  path: number[];
  visitedOrder: number[];
}

export type AlgorithmFunction = (
  start: number,
  end: number,
  walls: boolean[],
  gridWidth: number,
  gridHeight: number
) => AlgorithmResult | null;

export type AlgorithmInfo = {
  name: string;
  key: string;
  algorithm: AlgorithmFunction;
}