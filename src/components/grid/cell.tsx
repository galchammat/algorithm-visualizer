import { Play, Target } from "lucide-react";

type CellProps = {
    index: number;
    type?: 'start' | 'end' | 'wall' | 'empty';
    onClick: (index: number) => void;
}

export function Cell({ index, type, onClick }: CellProps) {
    return (
        <div
            key={index}
            onClick={() => onClick(index)}
            className={`flex items-center justify-center bg-muted border border-border hover:bg-accent hover:border-accent-foreground transition-colors duration-200 cursor-pointer ${
            type === 'wall' ? 'bg-red': ''
            }`}
            style={{ height: '100%' }}
        >
            {type === 'start' && <Play color="green" fill="green" className="h-4 w-4 text-muted-foreground" />}
            {type === 'end' && <Target color="red" className="h-4 w-4 text-muted-foreground" />}
        </div>
    )
}