import { ModeToggle } from '@/components/theme-provider/mode-toggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Github } from 'lucide-react'
import * as React from 'react'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [currentMode, setCurrentMode] = React.useState('wall')
  
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center p-4 border-b">
        {/* Left section - H1 */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Algorithm Visualizer</h1>
        </div>

        {/* Center section - Controls */}
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
            <Select defaultValue="dijkstra">
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
            
            <Button variant="default">
              Start
            </Button>
            <Button variant="destructive">
              Clear
            </Button>
          </div>
        </div>

        {/* Right section - Mode Toggle */}
        <div className="flex-1 flex justify-end gap-2">
          <a href="https://github.com/galchammat" className={buttonVariants({ variant: 'outline', size: 'icon' })} target="_blank" rel="noreferrer">
            <Github />
          </a>
          <ModeToggle />
        </div>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  )
}