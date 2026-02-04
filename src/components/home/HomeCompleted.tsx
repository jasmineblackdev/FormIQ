import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgramProgress } from "@/components/workout/ProgramProgress";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import { Check, Trophy, ChevronRight, Flame, Clock, Dumbbell } from "lucide-react";

interface HomeCompletedProps {
  onViewSummary?: () => void;
}

const workoutSummary = {
  duration: 58,
  exercisesCompleted: 6,
  setsCompleted: 20,
  avgFormScore: 86,
  prs: 2,
};

const exerciseResults = [
  { name: "Bench Press", formScore: 92, improvement: "+4" },
  { name: "Incline Dumbbell Press", formScore: 85, improvement: "+2" },
  { name: "Overhead Press", formScore: 88, improvement: "NEW" },
];

export function HomeCompleted({ onViewSummary }: HomeCompletedProps) {
  return (
    <div className="px-4 py-6 space-y-6 animate-slide-up">
      {/* Celebration header */}
      <div className="text-center py-4">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/20 mb-4 animate-scale-in">
          <Check className="h-10 w-10 text-success" strokeWidth={3} />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Great Work! 🎉</h1>
        <p className="text-muted-foreground">You crushed Push Day</p>
      </div>

      {/* Program progress */}
      <ProgramProgress
        currentWeek={2}
        totalWeeks={6}
        currentDay={5}
        totalDays={18}
      />

      {/* Workout stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Duration</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{workoutSummary.duration}m</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Dumbbell className="h-4 w-4" />
            <span className="text-xs">Sets</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{workoutSummary.setsCompleted}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Flame className="h-4 w-4" />
            <span className="text-xs font-medium">Avg Form</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{workoutSummary.avgFormScore}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-warning mb-1">
            <Trophy className="h-4 w-4" />
            <span className="text-xs font-medium">PRs Today</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{workoutSummary.prs}</p>
        </div>
      </div>

      {/* Form scores highlight */}
      <div className="p-4 rounded-xl bg-card border border-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Form Scores</h3>
          <Button variant="ghost" size="sm" onClick={onViewSummary} className="text-primary">
            Full summary <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {exerciseResults.map((exercise, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{exercise.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-success font-medium">{exercise.improvement}</span>
                <FormScoreBadge score={exercise.formScore} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next workout preview */}
      <div className="p-4 rounded-xl bg-secondary border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Next Workout</p>
            <p className="font-semibold text-foreground">Rest Day (Tomorrow)</p>
            <p className="text-sm text-muted-foreground">Then: Pull Day</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
