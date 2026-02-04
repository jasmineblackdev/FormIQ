import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/ui/ProgressRing";

interface ProgramProgressProps {
  currentWeek: number;
  totalWeeks: number;
  currentDay: number;
  totalDays: number;
  className?: string;
}

export function ProgramProgress({
  currentWeek,
  totalWeeks,
  currentDay,
  totalDays,
  className,
}: ProgramProgressProps) {
  const weekProgress = (currentWeek / totalWeeks) * 100;
  const dayProgress = (currentDay / totalDays) * 100;

  return (
    <div className={cn("p-5 rounded-2xl bg-card border border-border", className)}>
      <div className="flex items-center justify-between gap-6">
        {/* Week progress ring */}
        <ProgressRing progress={weekProgress} size={80} strokeWidth={6}>
          <div className="text-center">
            <span className="text-xl font-bold text-foreground">{currentWeek}</span>
            <span className="text-xs text-muted-foreground block">/ {totalWeeks}</span>
          </div>
        </ProgressRing>

        {/* Progress details */}
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Week {currentWeek} of {totalWeeks}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Day {currentDay} of {totalDays}
          </p>
          
          {/* Day progress bar */}
          <div className="mt-3">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${dayProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
