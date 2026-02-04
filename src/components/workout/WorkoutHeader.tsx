import { cn } from "@/lib/utils";
import { Calendar, Clock, Flame } from "lucide-react";

interface WorkoutHeaderProps {
  workoutName: string;
  programName?: string;
  weekInfo?: string;
  estimatedTime?: number;
  exerciseCount?: number;
  className?: string;
}

export function WorkoutHeader({
  workoutName,
  programName,
  weekInfo,
  estimatedTime,
  exerciseCount,
  className,
}: WorkoutHeaderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Program badge */}
      {programName && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Flame className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">{programName}</span>
        </div>
      )}

      {/* Workout title */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {workoutName}
        </h1>
        {weekInfo && (
          <p className="text-muted-foreground mt-1">{weekInfo}</p>
        )}
      </div>

      {/* Quick stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {estimatedTime && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime} min</span>
          </div>
        )}
        {exerciseCount && (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{exerciseCount} exercises</span>
          </div>
        )}
      </div>
    </div>
  );
}
