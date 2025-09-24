import { useState } from "react";
import { Cell } from "./cell";
import { Controls } from "./controls";
import type { editMode } from './controls'
import { algorithms } from "@/algorithms";
import type { AlgorithmResult } from "@/algorithms";

const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

export function Grid() {
  const [currentMode, setCurrentMode] = useState<editMode>('start')
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [walls, setWalls] = useState<boolean[]>(Array(GRID_WIDTH * GRID_HEIGHT).fill(false))
  const [running, setRunning] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<keyof typeof algorithms>('Dijkstra');
  const [algorithmResult, setAlgorithmResult] = useState<AlgorithmResult | null>(null);
  const [animationStep, setAnimationStep] = useState<number>(-1);

  function handleCellClick(index: number) {
    switch (currentMode) {
      case 'start':
        setStart(index);
        break;
      case 'end':
        setEnd(index);
        break;
      case 'wall':
        setWalls(prev => {
          const newWalls = [...prev]; // Create a new array
          newWalls[index] = !newWalls[index];
          return newWalls;
        });
        break;
    }
  }
  const isTail = (index: number) => {
    if (!algorithmResult) return false;
    if (animationStep === -1) return false;
    
    // Get the cells visited up to current animation step
    const visitedSoFar = algorithmResult.visitedOrder.slice(0, animationStep + 1);
    
    // Get the last 6 cells from those visited (excluding the current cell)
    const tailCells = visitedSoFar.slice(-7, -1); // -7 to -1 gives us 6 cells before current
    
    return tailCells.includes(index);
  }

  const isCurrentlyVisitted = (index: number) => {
    if (!algorithmResult) return false;
    if (animationStep === -1) return false;
    return algorithmResult.visitedOrder[animationStep] === index;
  }

  const animateAlgorithm = async (result: AlgorithmResult) => {
    console.log("Animating algorithm", result);
    setAnimationStep(-1);

    if (!result.visitedOrder.length) return;

    for (let i = 0; i < result.visitedOrder.length; i++) {
      console.log("animating step", i, result.visitedOrder[i]);
      setAnimationStep(i);
      await new Promise(resolve => setTimeout(resolve, 25)); // Adjust speed here
    }

    setAnimationStep(result.visitedOrder.length);
  };

  function run() {
    if (start === null || end === null || running) {
      alert("Please set both start and end points or stop the current run.");
      return;
    }
    const algo = algorithms.find(a => a.key === algorithm);
    if (!algo) {
      alert("Selected algorithm not found.");
      return;
    }
    setRunning(true);
    const result = algo.algorithm(start, end, walls, GRID_WIDTH, GRID_HEIGHT);
    setAlgorithmResult(result);
    if (algorithmResult) {
      animateAlgorithm(algorithmResult);
    }
    setRunning(false);
  }

  const controls = Controls({currentMode, setCurrentMode, setAlgorithm, run})

  const grid = (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="bg-card p-6 rounded-lg shadow-lg border flex-shrink-0">
        <div className="grid grid-cols-20 grid-rows-20 gap-1 aspect-square w-[min(70vw,calc(100vh-200px))] h-[min(70vw,calc(100vh-200px))]">
          {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, index) => (
            <Cell 
              index={index}
              type={
                start && index === start ? 'start' :
                end && index === end ? 'end' :
                walls[index] === true ? 'wall':
                isCurrentlyVisitted(index) ? 'current' :
                isTail(index) ? 'tail' :
                'empty'
              } 
              onClick={handleCellClick}
            />
          ))}
        </div>
      </div>
    </div>
  )

  return {
    grid,
    controls
  }
}