import type { AlgorithmResult } from './types';

export function dfs(
  start: number,
  end: number,
  walls: boolean[],
  gridWidth: number,
  gridHeight: number
): AlgorithmResult | null {
  const stack = [start];
  const visited = new Set<number>();
  const parent: { [key: number]: number } = {};
  const visitedOrder: number[] = [];

  const getNeighbors = (index: number): number[] => {
    const neighbors = [];
    const row = Math.floor(index / gridWidth);
    const col = index % gridWidth;
    
    // Up, Right, Down, Left
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const newIndex = newRow * gridWidth + newCol;
      
      if (newRow >= 0 && newRow < gridHeight && newCol >= 0 && newCol < gridWidth && !walls[newIndex]) {
        neighbors.push(newIndex);
      }
    }
    return neighbors;
  };

  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (visited.has(current)) continue;
    
    visited.add(current);
    visitedOrder.push(current);
    
    if (current === end) {
      // Reconstruct path
      const path = [];
      let pathNode = end;
      while (pathNode !== undefined) {
        path.push(pathNode);
        pathNode = parent[pathNode];
      }
      
      return {
        path: path.reverse(),
        visitedOrder
      };
    }
    
    // Add neighbors to stack
    for (const neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        parent[neighbor] = current;
        stack.push(neighbor);
      }
    }
  }
  
  return null;
}