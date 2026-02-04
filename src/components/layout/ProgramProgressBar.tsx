import { cn } from "@/lib/utils";
import { Flame, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProgramProgressBarProps {
  programName?: string;
  currentWeek?: number;
  totalWeeks?: number;
  currentDay?: number;
  totalDays?: number;
  isRestDay?: boolean;
  className?: string;
}

export function ProgramProgressBar({
  programName = "Push/Pull/Legs",
  currentWeek = 2,
  totalWeeks = 6,
  currentDay = 6,
  totalDays = 18,
  isRestDay = false,
  className,
}: ProgramProgressBarProps) {
  const progress = (currentDay / totalDays) * 100;

  return (
    <Link 
      to="/program"
      className={cn(
        "block px-4 py-3 bg-card/50 backdrop-blur-sm border-b border-border",
        "hover:bg-card/80 transition-colors",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Program icon */}
        <div className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
          isRestDay ? "bg-secondary" : "bg-primary/20"
        )}>
          <Flame className={cn(
            "h-5 w-5",
            isRestDay ? "text-muted-foreground" : "text-primary"
          )} />
        </div>

        {/* Progress info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-foreground text-sm truncate">
              {programName}
            </p>
            <div className="flex items-center gap-1 text-muted-foreground shrink-0">
              <span className="text-xs">View</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              Week {currentWeek}/{totalWeeks}
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-xs text-muted-foreground">
              Day {currentDay}/{totalDays}
            </span>
            {isRestDay && (
              <>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-xs text-primary font-medium">Rest Day</span>
              </>
            )}
          </div>

          {/* Compact progress bar */}
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
