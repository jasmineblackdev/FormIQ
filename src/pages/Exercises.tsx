import { AppLayout } from "@/components/layout/AppLayout";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const muscleGroups = ["All", "Chest", "Back", "Shoulders", "Legs", "Arms", "Core"];

const exercises = [
  { name: "Bench Press", sets: 4, reps: "8-10", targetMuscle: "Chest", lastFormScore: 92 },
  { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", targetMuscle: "Chest", lastFormScore: 85 },
  { name: "Deadlift", sets: 4, reps: "5", targetMuscle: "Back", lastFormScore: 78 },
  { name: "Barbell Rows", sets: 4, reps: "8-10", targetMuscle: "Back", lastFormScore: 88 },
  { name: "Lat Pulldowns", sets: 3, reps: "10-12", targetMuscle: "Back" },
  { name: "Overhead Press", sets: 4, reps: "8-10", targetMuscle: "Shoulders", lastFormScore: 91 },
  { name: "Lateral Raises", sets: 3, reps: "15-20", targetMuscle: "Shoulders" },
  { name: "Squat", sets: 4, reps: "6-8", targetMuscle: "Legs", lastFormScore: 86 },
  { name: "Romanian Deadlift", sets: 4, reps: "8-10", targetMuscle: "Legs", lastFormScore: 82 },
  { name: "Leg Press", sets: 3, reps: "10-12", targetMuscle: "Legs" },
  { name: "Barbell Curls", sets: 3, reps: "10-12", targetMuscle: "Arms", lastFormScore: 94 },
  { name: "Tricep Pushdowns", sets: 3, reps: "12-15", targetMuscle: "Arms" },
  { name: "Plank", sets: 3, reps: "60s", targetMuscle: "Core" },
  { name: "Cable Crunches", sets: 3, reps: "15-20", targetMuscle: "Core" },
];

const Exercises = () => {
  const [search, setSearch] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = selectedMuscle === "All" || ex.targetMuscle === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  return (
    <AppLayout
      programInfo={{
        programName: "Push/Pull/Legs",
        currentWeek: 2,
        totalWeeks: 6,
        currentDay: 6,
        totalDays: 18,
        isRestDay: false,
      }}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Exercise Library</h1>
          <p className="text-muted-foreground text-sm">100+ movements with AI form analysis</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Muscle group filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {muscleGroups.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedMuscle === muscle
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              )}
            >
              {muscle}
            </button>
          ))}
        </div>

        {/* Exercise list */}
        <div className="space-y-2">
          {filteredExercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              {...exercise}
              onClick={() => console.log("Exercise selected:", exercise.name)}
            />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No exercises found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Exercises;
