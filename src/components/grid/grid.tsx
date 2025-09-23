import { useState } from "react";
import { Cell } from "./cell";


export function Grid() {
  const [start, setStart] = useState<[number, number] | null>(null);
  const [end, setEnd] = useState<[number, number] | null>(null);

  return (
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
          {Array.from({ length: 400 }).map((_, index) => (
            <Cell 
              index={index}
              type={
                start && index === start[0] * 20 + start[1] ? 'start' :
                end && index === end[0] * 20 + end[1] ? 'end' :
                'empty'
              } 
            />
          ))}
        </div>
      </div>
    </div>
  )
}