import { ModeToggle } from '@/components/theme-provider/mode-toggle'
import { buttonVariants } from '@/components/ui/button'
import { Github } from 'lucide-react'
import * as React from 'react'

type MainLayoutProps = {
  headerControls?: React.ReactNode;
  children: React.ReactNode;
}
  
export function MainLayout({ headerControls, children }: MainLayoutProps) {
  
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center p-4 border-b">
        {/* Left section - H1 */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Algo Vis</h1>
        </div>

        {headerControls}

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