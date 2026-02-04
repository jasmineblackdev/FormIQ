import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgramProgress } from "@/components/workout/ProgramProgress";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { Moon, Battery, ChevronRight } from "lucide-react";

interface HomeRestDayProps {
  onViewNextWorkout?: () => void;
}

const tomorrowsExercises = [
  { name: "Squat", sets: 4, reps: "6-8", targetMuscle: "Quads / Glutes" },
  { name: "Romanian Deadlift", sets: 4, reps: "8-10", targetMuscle: "Hamstrings" },
  { name: "Leg Press", sets: 3, reps: "10-12", targetMuscle: "Quads" },
];

const recoveryTips = [
  { icon: "💧", title: "Stay Hydrated", desc: "Aim for 3L water today" },
  { icon: "🥗", title: "Eat Protein", desc: "Hit your protein goal" },
  { icon: "😴", title: "Sleep Well", desc: "8+ hours for recovery" },
];

export function HomeRestDay({ onViewNextWorkout }: HomeRestDayProps) {
  return (
    <div className="px-4 py-6 space-y-6 animate-slide-up">
      {/* Header greeting */}
      <div className="space-y-1">
        <p className="text-muted-foreground">Rest Day 😌</p>
        <h2 className="text-xl font-semibold text-foreground">Recovery is part of progress</h2>
      </div>

      {/* Program progress */}
      <ProgramProgress
        currentWeek={2}
        totalWeeks={6}
        currentDay={6}
        totalDays={18}
      />

      {/* Rest day hero */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary to-accent border border-border text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <Moon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Rest & Recover</h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Your muscles grow during rest. Take today to recover and come back stronger tomorrow.
        </p>
      </div>

      {/* Recovery tips */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Battery className="h-4 w-4 text-primary" />
          Recovery Checklist
        </h3>
        <div className="grid gap-2">
          {recoveryTips.map((tip, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
            >
              <span className="text-2xl">{tip.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{tip.title}</p>
                <p className="text-xs text-muted-foreground">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tomorrow's preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Tomorrow: Leg Day</h3>
          <Button variant="ghost" size="sm" onClick={onViewNextWorkout} className="text-primary">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {tomorrowsExercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              {...exercise}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
