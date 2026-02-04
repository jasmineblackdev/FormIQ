import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Check, 
  X, 
  Timer,
  Video,
  Trash2,
  Pause,
  Play
} from "lucide-react";

interface SetData {
  id: string;
  weight: string;
  reps: string;
  isCompleted: boolean;
}

interface ExerciseData {
  name: string;
  targetSets: number;
  targetReps: string;
  targetMuscle: string;
  sets: SetData[];
}

const initialExercises: ExerciseData[] = [
  { 
    name: "Bench Press", 
    targetSets: 4, 
    targetReps: "8-10", 
    targetMuscle: "Chest",
    sets: [
      { id: "1", weight: "", reps: "", isCompleted: false },
      { id: "2", weight: "", reps: "", isCompleted: false },
      { id: "3", weight: "", reps: "", isCompleted: false },
      { id: "4", weight: "", reps: "", isCompleted: false },
    ]
  },
  { 
    name: "Incline Dumbbell Press", 
    targetSets: 3, 
    targetReps: "10-12", 
    targetMuscle: "Upper Chest",
    sets: [
      { id: "1", weight: "", reps: "", isCompleted: false },
      { id: "2", weight: "", reps: "", isCompleted: false },
      { id: "3", weight: "", reps: "", isCompleted: false },
    ]
  },
  { 
    name: "Overhead Press", 
    targetSets: 4, 
    targetReps: "8-10", 
    targetMuscle: "Shoulders",
    sets: [
      { id: "1", weight: "", reps: "", isCompleted: false },
      { id: "2", weight: "", reps: "", isCompleted: false },
      { id: "3", weight: "", reps: "", isCompleted: false },
      { id: "4", weight: "", reps: "", isCompleted: false },
    ]
  },
  { 
    name: "Cable Flyes", 
    targetSets: 3, 
    targetReps: "12-15", 
    targetMuscle: "Chest",
    sets: [
      { id: "1", weight: "", reps: "", isCompleted: false },
      { id: "2", weight: "", reps: "", isCompleted: false },
      { id: "3", weight: "", reps: "", isCompleted: false },
    ]
  },
  { 
    name: "Tricep Pushdowns", 
    targetSets: 3, 
    targetReps: "12-15", 
    targetMuscle: "Triceps",
    sets: [
      { id: "1", weight: "", reps: "", isCompleted: false },
      { id: "2", weight: "", reps: "", isCompleted: false },
      { id: "3", weight: "", reps: "", isCompleted: false },
    ]
  },
  { 
    name: "Lateral Raises", 
    targetSets: 3, 
    targetReps: "15-20", 
    targetMuscle: "Side Delts",
    sets: [
      { id: "1", weight: "", reps: "", isCompleted: false },
      { id: "2", weight: "", reps: "", isCompleted: false },
      { id: "3", weight: "", reps: "", isCompleted: false },
    ]
  },
];

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<ExerciseData[]>(initialExercises);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (!isTimerPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerPaused]);

  const currentExercise = exercises[currentExerciseIndex];
  const completedSets = currentExercise.sets.filter(s => s.isCompleted).length;
  const totalCompletedSets = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.isCompleted).length, 0);
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  const updateSet = (setIndex: number, field: "weight" | "reps", value: string) => {
    const newExercises = [...exercises];
    newExercises[currentExerciseIndex].sets[setIndex][field] = value;
    setExercises(newExercises);
  };

  const toggleSetComplete = (setIndex: number) => {
    const newExercises = [...exercises];
    const set = newExercises[currentExerciseIndex].sets[setIndex];
    set.isCompleted = !set.isCompleted;
    setExercises(newExercises);
  };

  const addSet = () => {
    const newExercises = [...exercises];
    const newSetId = (currentExercise.sets.length + 1).toString();
    newExercises[currentExerciseIndex].sets.push({
      id: newSetId,
      weight: "",
      reps: "",
      isCompleted: false,
    });
    setExercises(newExercises);
  };

  const removeSet = (setIndex: number) => {
    const newExercises = [...exercises];
    if (newExercises[currentExerciseIndex].sets.length > 1) {
      newExercises[currentExerciseIndex].sets.splice(setIndex, 1);
      setExercises(newExercises);
    }
  };

  const goToNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const goToPrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const finishWorkout = () => {
    // Calculate workout summary data
    const totalVolume = exercises.reduce((acc, ex) => {
      return acc + ex.sets.reduce((setAcc, set) => {
        if (set.isCompleted && set.weight && set.reps) {
          return setAcc + (parseFloat(set.weight) * parseFloat(set.reps));
        }
        return setAcc;
      }, 0);
    }, 0);

    const exerciseSummaries = exercises.map(ex => ({
      name: ex.name,
      setsCompleted: ex.sets.filter(s => s.isCompleted).length,
      totalSets: ex.sets.length,
      totalVolume: ex.sets.reduce((acc, set) => {
        if (set.isCompleted && set.weight && set.reps) {
          return acc + (parseFloat(set.weight) * parseFloat(set.reps));
        }
        return acc;
      }, 0),
      formScore: Math.floor(Math.random() * 15) + 80, // Simulated form score
    }));

    navigate("/workout-summary", {
      state: {
        duration: elapsedTime,
        totalVolume: Math.round(totalVolume),
        exercisesCompleted: exercises.filter(ex => ex.sets.some(s => s.isCompleted)).length,
        totalExercises: exercises.length,
        setsCompleted: totalCompletedSets,
        totalSets,
        personalRecords: Math.random() > 0.7 ? 1 : 0, // Simulated PR
        avgFormScore: Math.floor(Math.random() * 10) + 82,
        exercises: exerciseSummaries,
      }
    });
  };

  const toggleTimer = () => {
    setIsTimerPaused(prev => !prev);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <button 
            onClick={toggleTimer}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            {isTimerPaused ? (
              <Play className="h-4 w-4 text-success" />
            ) : (
              <Pause className="h-4 w-4 text-primary" />
            )}
            <span className={cn(
              "font-mono font-medium",
              isTimerPaused && "text-muted-foreground"
            )}>
              {formatTime(elapsedTime)}
            </span>
          </button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/record")}
            className="text-primary"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Workout Progress</span>
            <span>{totalCompletedSets}/{totalSets} sets</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(totalCompletedSets / totalSets) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Exercise Navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button
          onClick={goToPrevExercise}
          disabled={currentExerciseIndex === 0}
          className={cn(
            "p-2 rounded-lg transition-colors",
            currentExerciseIndex === 0 
              ? "text-muted-foreground/30" 
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </p>
          <h1 className="text-lg font-bold text-foreground">{currentExercise.name}</h1>
          <p className="text-xs text-muted-foreground">{currentExercise.targetMuscle}</p>
        </div>
        
        <button
          onClick={goToNextExercise}
          disabled={currentExerciseIndex === exercises.length - 1}
          className={cn(
            "p-2 rounded-lg transition-colors",
            currentExerciseIndex === exercises.length - 1
              ? "text-muted-foreground/30" 
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Target info */}
      <div className="px-4 py-3 bg-secondary/30">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Target</p>
            <p className="font-semibold text-foreground">
              {currentExercise.targetSets} × {currentExercise.targetReps}
            </p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-muted-foreground">Completed</p>
            <p className="font-semibold text-primary">
              {completedSets}/{currentExercise.sets.length} sets
            </p>
          </div>
        </div>
      </div>

      {/* Sets list */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="space-y-3">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-2 px-3 text-xs font-medium text-muted-foreground">
            <div className="col-span-2">SET</div>
            <div className="col-span-4 text-center">WEIGHT (lbs)</div>
            <div className="col-span-3 text-center">REPS</div>
            <div className="col-span-3 text-center">DONE</div>
          </div>

          {currentExercise.sets.map((set, index) => (
            <div 
              key={set.id}
              className={cn(
                "grid grid-cols-12 gap-2 items-center p-3 rounded-xl border transition-all",
                set.isCompleted 
                  ? "bg-primary/10 border-primary/30" 
                  : "bg-card border-border"
              )}
            >
              <div className="col-span-2 font-semibold text-foreground">
                {index + 1}
              </div>
              
              <div className="col-span-4">
                <Input
                  type="number"
                  placeholder="0"
                  value={set.weight}
                  onChange={(e) => updateSet(index, "weight", e.target.value)}
                  className={cn(
                    "h-10 text-center bg-secondary border-0",
                    set.isCompleted && "opacity-60"
                  )}
                />
              </div>
              
              <div className="col-span-3">
                <Input
                  type="number"
                  placeholder="0"
                  value={set.reps}
                  onChange={(e) => updateSet(index, "reps", e.target.value)}
                  className={cn(
                    "h-10 text-center bg-secondary border-0",
                    set.isCompleted && "opacity-60"
                  )}
                />
              </div>
              
              <div className="col-span-3 flex items-center justify-center gap-1">
                <button
                  onClick={() => toggleSetComplete(index)}
                  className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center transition-all",
                    set.isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={() => removeSet(index)}
                  className="h-10 w-10 rounded-lg flex items-center justify-center bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add set button */}
          <button
            onClick={addSet}
            className="w-full p-3 rounded-xl border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Add Set</span>
          </button>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-xl border-t border-border p-4 space-y-3">
        {currentExerciseIndex < exercises.length - 1 ? (
          <Button
            onClick={goToNextExercise}
            className="w-full h-12 text-base font-semibold gradient-primary"
          >
            Next Exercise
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={finishWorkout}
            className="w-full h-12 text-base font-semibold bg-success hover:bg-success/90"
          >
            Finish Workout
            <Check className="h-5 w-5 ml-1" />
          </Button>
        )}

        {/* Exercise dots */}
        <div className="flex items-center justify-center gap-1.5">
          {exercises.map((ex, index) => {
            const isComplete = ex.sets.every(s => s.isCompleted);
            const isPartial = ex.sets.some(s => s.isCompleted);
            return (
              <button
                key={index}
                onClick={() => setCurrentExerciseIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentExerciseIndex ? "w-6" : "w-2",
                  isComplete 
                    ? "bg-primary" 
                    : isPartial 
                      ? "bg-primary/50"
                      : index === currentExerciseIndex 
                        ? "bg-foreground"
                        : "bg-muted-foreground/30"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActiveWorkout;
