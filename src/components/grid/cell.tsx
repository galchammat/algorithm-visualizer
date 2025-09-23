import { Play, Target } from "lucide-react";

type CellProps = {
    index: number;
    type?: 'start' | 'end' | 'wall' | 'empty';
}
export function Cell({ index, type }: CellProps) {
    return (
        <div
            key={index}
            className={`bg-muted border border-border hover:bg-accent hover:border-accent-foreground transition-colors duration-200 cursor-pointer ${
                type === 'start' ? 'bg-green-500' : type === 'end' ? 'bg-red-500' : type === 'wall' ? 'bg-red': ''
            }`}
        >
            {type === 'start' && <Play className="h-4 w-4 m-auto text-muted-foreground rotate-90" />}
            {type === 'end' && <Target className="h-4 w-4 m-auto text-muted-foreground" />}
        </div>
    )
}