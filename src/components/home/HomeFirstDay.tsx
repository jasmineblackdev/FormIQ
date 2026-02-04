import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WorkoutHeader } from "@/components/workout/WorkoutHeader";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { ProgramProgress } from "@/components/workout/ProgramProgress";
import { Play } from "lucide-react";

interface HomeFirstDayProps {
  onStartWorkout?: () => void;
}

const todaysExercises = [
  { name: "Bench Press", sets: 4, reps: "8-10", targetMuscle: "Chest" },
  { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", targetMuscle: "Upper Chest" },
  { name: "Overhead Press", sets: 4, reps: "8-10", targetMuscle: "Shoulders" },
  { name: "Cable Flyes", sets: 3, reps: "12-15", targetMuscle: "Chest" },
  { name: "Tricep Pushdowns", sets: 3, reps: "12-15", targetMuscle: "Triceps" },
  { name: "Lateral Raises", sets: 3, reps: "15-20", targetMuscle: "Side Delts" },
];

export function HomeFirstDay({ onStartWorkout }: HomeFirstDayProps) {
  return (
    <div className="px-4 py-6 space-y-6 animate-slide-up">
      {/* Header greeting */}
      <div className="space-y-1">
        <p className="text-muted-foreground">Good morning 👋</p>
        <h2 className="text-xl font-semibold text-foreground">Let's crush your first workout!</h2>
      </div>

      {/* Program progress */}
      <ProgramProgress
        currentWeek={1}
        totalWeeks={6}
        currentDay={1}
        totalDays={18}
      />

      {/* Today's workout */}
      <div className="space-y-4">
        <WorkoutHeader
          workoutName="Push Day"
          programName="Push/Pull/Legs"
          weekInfo="Week 1, Day 1 of 6-week program"
          estimatedTime={55}
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
          <span className="text-sm text-muted-foreground">No form scores yet</span>
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
