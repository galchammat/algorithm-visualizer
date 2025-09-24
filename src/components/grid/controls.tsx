import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { algorithms } from '@/algorithms'


export type editMode = "wall" | "start" | "end"

type ControlsProps = {
  currentMode: editMode;
  setCurrentMode: React.Dispatch<React.SetStateAction<editMode>>;
  setAlgorithm: React.Dispatch<React.SetStateAction<keyof typeof algorithms>>;
  run: () => void;
}


export function Controls({ currentMode, setCurrentMode, setAlgorithm, run }: ControlsProps) {
  const handleAlgorithmChange = (value: string) => {
    setAlgorithm(value as keyof typeof algorithms);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Drawing Mode Controls */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <Button
            variant={currentMode === 'start' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentMode('start')}
          >
            Set Start
          </Button>
          <Button
            variant={currentMode === 'end' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentMode('end')}
          >
            Set End
          </Button>
          <Button
            variant={currentMode === 'wall' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentMode('wall')}
          >
            Draw Walls
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Algorithm Controls */}
      <div className="flex items-center gap-2">
        <Select defaultValue="dijkstra" onValueChange={handleAlgorithmChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dijkstra">Dijkstra</SelectItem>
            <SelectItem value="astar">A*</SelectItem>
            <SelectItem value="bfs">BFS</SelectItem>
            <SelectItem value="dfs">DFS</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6" />
        <Separator orientation="vertical" className="h-6" />
        <Separator orientation="vertical" className="h-6" />

        <Button variant="default" onClick={run}>
          Start
        </Button>
        <Button variant="destructive">
          Clear
        </Button>
      </div>
    </div>
  )
}