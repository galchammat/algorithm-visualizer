import { Play, Target } from "lucide-react";

type CellProps = {
    index: number;
    type?: 'start' | 'end' | 'wall' | 'empty' | 'current' | 'tail';
    onClick: (index: number) => void;
}

export function Cell({ index, type, onClick }: CellProps) {
    return (
        <div
            key={index}
            onClick={() => onClick(index)}
            className={`flex items-center justify-center border border-border hover:border-accent-foreground transition-colors duration-30 cursor-pointer overflow-hidden ${
            type === 'wall' ? 'bg-card border-none hover:border-accent-foreground' : 
            type === 'current' ? 'bg-primary' : // Most prominent
            type === 'tail' ? 'bg-primary/50' : // Less prominent
            'bg-muted'
            }`}
            style={{ 
            width: '100%',
            height: '100%',
            minWidth: 0,
            minHeight: 0
            }}
        >
            {type === 'start' && <Play color="green" fill="green"  />}
            {type === 'end' && <Target color="red"  />}
        </div>
    )
}