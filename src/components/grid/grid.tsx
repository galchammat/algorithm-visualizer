import { useState } from "react";
import { Cell } from "./cell";
import { Controls } from "./controls";
import type { editMode } from './controls'

const GRID_SIZE = 400;

export function Grid() {
  const [currentMode, setCurrentMode] = useState<editMode>('start')
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [walls, setWalls] = useState<boolean[]>(Array(GRID_SIZE).fill(false))

  function handleCellClick(index: number) {
    switch (currentMode) {
      case 'start':
        setStart(index);
        break;
      case 'end':
        setEnd(index);
        break;
      case 'wall':
        let newWalls = walls;
        newWalls[index] = !newWalls[index];
        setWalls(newWalls)
        break;
    }
    console.log(start)
    console.log(end)
    console.log(index)
    console.log(currentMode)
  }
  const controls = Controls({currentMode, setCurrentMode})

  const grid = (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="bg-card p-6 rounded-lg shadow-lg border flex-shrink-0">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: 'repeat(20, 1fr)',
            gridTemplateRows: 'repeat(20, 1fr)',
            width: 'min(70vw, calc(100vh - 200px))',
            height: 'min(70vw, calc(100vh - 200px))',
            aspectRatio: '1'
          }}
        >
          {Array.from({ length: GRID_SIZE }).map((_, index) => (
            <Cell 
              index={index}
              type={
                start && index === start ? 'start' :
                end && index === end ? 'end' :
                walls[index] === true ? 'wall':
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