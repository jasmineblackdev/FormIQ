import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WorkoutHeader } from "@/components/workout/WorkoutHeader";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { ProgramProgress } from "@/components/workout/ProgramProgress";
import { Play, TrendingUp } from "lucide-react";

interface HomeMidProgramProps {
  onStartWorkout?: () => void;
}

const todaysExercises = [
  { name: "Deadlift", sets: 4, reps: "5", targetMuscle: "Back / Posterior Chain", lastFormScore: 87 },
  { name: "Barbell Rows", sets: 4, reps: "8-10", targetMuscle: "Upper Back", lastFormScore: 92 },
  { name: "Lat Pulldowns", sets: 3, reps: "10-12", targetMuscle: "Lats", lastFormScore: 78 },
  { name: "Face Pulls", sets: 3, reps: "15-20", targetMuscle: "Rear Delts", lastFormScore: 85 },
  { name: "Barbell Curls", sets: 3, reps: "10-12", targetMuscle: "Biceps", lastFormScore: 91 },
  { name: "Hammer Curls", sets: 3, reps: "12-15", targetMuscle: "Brachialis", lastFormScore: 88 },
];

const averageFormScore = Math.round(
  todaysExercises.reduce((sum, ex) => sum + (ex.lastFormScore || 0), 0) / todaysExercises.length
);

export function HomeMidProgram({ onStartWorkout }: HomeMidProgramProps) {
  return (
    <div className="px-4 py-6 space-y-6 animate-slide-up">
      {/* Header greeting */}
      <div className="space-y-1">
        <p className="text-muted-foreground">Good afternoon 💪</p>
        <h2 className="text-xl font-semibold text-foreground">Week 3 is treating you well!</h2>
      </div>

      {/* Program progress */}
      <ProgramProgress
        currentWeek={3}
        totalWeeks={6}
        currentDay={8}
        totalDays={18}
      />

      {/* Stats summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-primary mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">Avg Form Score</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{averageFormScore}</p>
          <p className="text-xs text-muted-foreground">+5 from last week</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-primary mb-1">
            <span className="text-xs font-medium">🔥 Streak</span>
          </div>
          <p className="text-2xl font-bold text-foreground">8 days</p>
          <p className="text-xs text-muted-foreground">Personal best!</p>
        </div>
      </div>

      {/* Today's workout */}
      <div className="space-y-4">
        <WorkoutHeader
          workoutName="Pull Day"
          programName="Push/Pull/Legs"
          weekInfo="Week 3, Day 8 of 6-week program"
          estimatedTime={60}
          exerciseCount={todaysExercises.length}
        />

        {/* Start workout button */}
        <Button 
          onClick={onStartWorkout}
          className="w-full h-14 text-lg font-semibold gap-3 gradient-primary shadow-glow"
        >
          <Play className="h-5 w-5" />
          Start Workout
        </Button>
      </div>

      {/* Exercise list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Today's Exercises</h3>
          <span className="text-sm text-muted-foreground">Last form scores</span>
        </div>
        
        <div className="space-y-2">
          {todaysExercises.map((exercise, index) => (
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
