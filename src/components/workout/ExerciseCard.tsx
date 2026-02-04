import { cn } from "@/lib/utils";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import { Dumbbell } from "lucide-react";

interface ExerciseCardProps {
  name: string;
  sets: number;
  reps: string;
  targetMuscle: string;
  lastFormScore?: number;
  isCompleted?: boolean;
  onClick?: () => void;
  showChevron?: boolean;
  className?: string;
}

export function ExerciseCard({
  name,
  sets,
  reps,
  targetMuscle,
  lastFormScore,
  isCompleted = false,
  onClick,
  showChevron = false,
  className,
}: ExerciseCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl bg-card border border-border",
        "flex items-center gap-4 text-left",
        "transition-all duration-200 hover:bg-accent hover:border-primary/30",
        "active:scale-[0.98]",
        isCompleted && "opacity-60",
        className
      )}
    >
      {/* Exercise icon */}
      <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
        <Dumbbell className="h-6 w-6 text-muted-foreground" />
      </div>

      {/* Exercise info */}
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-semibold text-foreground truncate",
          isCompleted && "line-through"
        )}>
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {sets} sets × {reps} reps
        </p>
        <p className="text-xs text-muted-foreground/70 mt-0.5">
          {targetMuscle}
        </p>
      </div>

      {/* Form score only - no chevron on home */}
      {lastFormScore !== undefined && (
        <div className="flex-shrink-0">
          <FormScoreBadge score={lastFormScore} size="sm" />
        </div>
      )}
    </button>
  );
}
