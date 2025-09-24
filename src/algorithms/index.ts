import { dfs } from './dfs';
import type { AlgorithmInfo } from './types';

export const algorithms: AlgorithmInfo[] = [
  {
    name: 'Depth-First Search',
    key: 'dfs',
    algorithm: dfs
  }
  // Add more algorithms here later
];

export { type AlgorithmResult, type AlgorithmFunction } from './types';