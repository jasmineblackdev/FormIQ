import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomeFirstDay } from "@/components/home/HomeFirstDay";
import { HomeMidProgram } from "@/components/home/HomeMidProgram";
import { HomeRestDay } from "@/components/home/HomeRestDay";
import { HomeCompleted } from "@/components/home/HomeCompleted";
import { HomeCustomEmpty } from "@/components/home/HomeCustomEmpty";
import { HomeCustomActive } from "@/components/home/HomeCustomActive";
import { ExerciseDetailSheet } from "@/components/exercises/ExerciseDetailSheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type HomeState = "first-day" | "mid-program" | "rest-day" | "completed" | "custom-empty" | "custom-active";

const stateLabels: Record<HomeState, string> = {
  "first-day": "First Day",
  "mid-program": "Mid-Program",
  "rest-day": "Rest Day",
  "completed": "Completed",
  "custom-empty": "Custom Empty",
  "custom-active": "Custom Active",
};

// Exercise data for all home states
const exerciseDatabase: Record<string, { sets: number; reps: string; targetMuscle: string; lastFormScore?: number }> = {
  "Bench Press": { sets: 4, reps: "8-10", targetMuscle: "Chest", lastFormScore: 92 },
  "Incline Dumbbell Press": { sets: 3, reps: "10-12", targetMuscle: "Upper Chest", lastFormScore: 85 },
  "Overhead Press": { sets: 4, reps: "8-10", targetMuscle: "Shoulders", lastFormScore: 91 },
  "Cable Flyes": { sets: 3, reps: "12-15", targetMuscle: "Chest" },
  "Tricep Pushdowns": { sets: 3, reps: "12-15", targetMuscle: "Triceps" },
  "Lateral Raises": { sets: 3, reps: "15-20", targetMuscle: "Side Delts" },
  "Deadlift": { sets: 4, reps: "5", targetMuscle: "Back / Posterior Chain", lastFormScore: 87 },
  "Barbell Rows": { sets: 4, reps: "8-10", targetMuscle: "Upper Back", lastFormScore: 92 },
  "Lat Pulldowns": { sets: 3, reps: "10-12", targetMuscle: "Lats", lastFormScore: 78 },
  "Face Pulls": { sets: 3, reps: "15-20", targetMuscle: "Rear Delts", lastFormScore: 85 },
  "Barbell Curls": { sets: 3, reps: "10-12", targetMuscle: "Biceps", lastFormScore: 91 },
  "Hammer Curls": { sets: 3, reps: "12-15", targetMuscle: "Brachialis", lastFormScore: 88 },
  "Squat": { sets: 4, reps: "6-8", targetMuscle: "Quads / Glutes", lastFormScore: 86 },
  "Romanian Deadlift": { sets: 4, reps: "8-10", targetMuscle: "Hamstrings", lastFormScore: 82 },
  "Leg Press": { sets: 3, reps: "10-12", targetMuscle: "Quads" },
};

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  targetMuscle: string;
  lastFormScore?: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<HomeState>("first-day");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleStartWorkout = () => {
    navigate("/active-workout");
  };

  const handleBrowseExercises = () => {
    navigate("/exercises");
  };

  const handleViewSummary = () => {
    navigate("/workout-summary");
  };

  const handleViewProgram = () => {
    navigate("/program");
  };

  const handleViewProgress = () => {
    navigate("/analyze");
  };

  const handleExerciseClick = (exerciseName: string) => {
    const exerciseData = exerciseDatabase[exerciseName];
    if (exerciseData) {
      setSelectedExercise({
        name: exerciseName,
        ...exerciseData
      });
      setSheetOpen(true);
    }
  };

  const handleAddToWorkout = (exercise: Exercise) => {
    toast.success(`${exercise.name} added to workout`);
    setSheetOpen(false);
  };

  const handleRecordForm = (exercise: Exercise) => {
    setSheetOpen(false);
    navigate('/record');
  };

  // Program info based on current state
  const getProgramInfo = () => {
    switch (currentState) {
      case "first-day":
        return { currentWeek: 1, totalWeeks: 6, currentDay: 1, totalDays: 18, isRestDay: false };
      case "mid-program":
        return { currentWeek: 3, totalWeeks: 6, currentDay: 8, totalDays: 18, isRestDay: false };
      case "rest-day":
        return { currentWeek: 2, totalWeeks: 6, currentDay: 4, totalDays: 18, isRestDay: true };
      case "completed":
        return { currentWeek: 2, totalWeeks: 6, currentDay: 5, totalDays: 18, isRestDay: false };
      case "custom-empty":
      case "custom-active":
        return undefined; // No program for custom path
      default:
        return { currentWeek: 1, totalWeeks: 6, currentDay: 1, totalDays: 18, isRestDay: false };
    }
  };

  const renderHomeState = () => {
    switch (currentState) {
      case "first-day":
        return (
          <HomeFirstDay 
            onStartWorkout={handleStartWorkout}
            onExerciseClick={handleExerciseClick}
            onViewProgram={handleViewProgram}
          />
        );
      case "mid-program":
        return (
          <HomeMidProgram 
            onStartWorkout={handleStartWorkout}
            onExerciseClick={handleExerciseClick}
            onViewProgress={handleViewProgress}
            onViewProgram={handleViewProgram}
          />
        );
      case "rest-day":
        return (
          <HomeRestDay 
            onViewNextWorkout={handleViewProgram}
            onExerciseClick={handleExerciseClick}
            onViewProgram={handleViewProgram}
          />
        );
      case "completed":
        return (
          <HomeCompleted 
            onViewSummary={handleViewSummary}
          />
        );
      case "custom-empty":
        return (
          <HomeCustomEmpty 
            onStartWorkout={handleStartWorkout} 
            onBrowseExercises={handleBrowseExercises}
          />
        );
      case "custom-active":
        return (
          <HomeCustomActive 
            onStartWorkout={handleStartWorkout} 
            onBrowseExercises={handleBrowseExercises}
            onViewProgress={handleViewProgress}
          />
        );
      default:
        return (
          <HomeFirstDay 
            onStartWorkout={handleStartWorkout}
            onExerciseClick={handleExerciseClick}
            onViewProgram={handleViewProgram}
          />
        );
    }
  };

  const programInfo = getProgramInfo();
  const isCustomPath = currentState === "custom-empty" || currentState === "custom-active";

  return (
    <AppLayout 
      hideProgress={isCustomPath}
      programInfo={programInfo}
    >
      {/* State selector for demo purposes */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="px-4 py-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Demo: Home Screen States</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {(Object.keys(stateLabels) as HomeState[]).map((state) => (
              <button
                key={state}
                onClick={() => setCurrentState(state)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                  currentState === state
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                )}
              >
                {stateLabels[state]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current home state */}
      {renderHomeState()}

      {/* Exercise Detail Sheet */}
      <ExerciseDetailSheet
        exercise={selectedExercise}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onAddToWorkout={handleAddToWorkout}
        onRecordForm={handleRecordForm}
      />
    </AppLayout>
  );
};

export default Index;
