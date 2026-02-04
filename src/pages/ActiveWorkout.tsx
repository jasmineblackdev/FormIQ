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
  Video,
  Trash2,
  Pause,
  Play,
  Info,
  ChevronDown,
  ChevronUp,
  Target,
  CheckCircle2,
  Volume2,
  VolumeX
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

interface ExerciseInfo {
  description: string;
  howToPerform: string[];
  tips: string[];
  videoUrl: string;
  videoPoster: string;
}

const exerciseInfoDatabase: Record<string, ExerciseInfo> = {
  "Bench Press": {
    description: "A compound pushing movement that primarily targets the chest, shoulders, and triceps.",
    howToPerform: [
      "Lie flat on the bench with your eyes directly under the bar",
      "Grip the bar slightly wider than shoulder-width apart",
      "Lower the bar in a controlled motion to your mid-chest",
      "Press the bar back up by extending your arms",
    ],
    tips: [
      "Keep shoulder blades pinched together",
      "Maintain a slight arch in your lower back",
      "Drive feet into the floor for stability"
    ],
    videoUrl: "",
    videoPoster: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop"
  },
  "Incline Dumbbell Press": {
    description: "Targets the upper portion of the chest with emphasis on the clavicular head of the pectoralis major.",
    howToPerform: [
      "Set bench to 30-45 degree incline",
      "Hold dumbbells at shoulder level with palms facing forward",
      "Press dumbbells up and together above your chest",
      "Lower with control back to starting position",
    ],
    tips: [
      "Don't let dumbbells touch at the top",
      "Keep core engaged throughout",
      "Control the eccentric (lowering) phase"
    ],
    videoUrl: "",
    videoPoster: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=800&h=450&fit=crop"
  },
  "Overhead Press": {
    description: "A compound shoulder movement that builds pressing strength overhead.",
    howToPerform: [
      "Stand with feet shoulder-width apart, bar at shoulder height",
      "Grip the bar just outside shoulder width",
      "Press bar straight overhead while keeping core tight",
      "Lock out arms at the top, then lower with control",
    ],
    tips: [
      "Keep core tight to protect lower back",
      "Don't lean back excessively",
      "Full lockout at the top"
    ],
    videoUrl: "",
    videoPoster: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=450&fit=crop"
  },
  "Cable Flyes": {
    description: "An isolation exercise that targets the chest muscles through a horizontal adduction movement.",
    howToPerform: [
      "Set cables at chest height, stand in center",
      "Step forward with slight lean, arms extended to sides",
      "Bring handles together in front of chest in arc motion",
      "Squeeze chest at peak, return slowly to start",
    ],
    tips: [
      "Maintain slight bend in elbows throughout",
      "Focus on squeezing chest at peak contraction",
      "Control the movement, don't let cables pull you back"
    ],
    videoUrl: "",
    videoPoster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop"
  },
  "Tricep Pushdowns": {
    description: "An isolation exercise targeting all three heads of the triceps using a cable machine.",
    howToPerform: [
      "Stand facing cable machine, grab bar with overhand grip",
      "Keep elbows pinned to your sides",
      "Push the bar down until arms are fully extended",
      "Slowly return to starting position",
    ],
    tips: [
      "Keep elbows stationary throughout",
      "Squeeze triceps at the bottom",
      "Don't use momentum or body swing"
    ],
    videoUrl: "",
    videoPoster: "https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=800&h=450&fit=crop"
  },
  "Lateral Raises": {
    description: "An isolation exercise that targets the lateral deltoid to build wider shoulders.",
    howToPerform: [
      "Stand with dumbbells at your sides, slight bend in elbows",
      "Raise arms out to the sides until parallel with floor",
      "Keep slight bend in elbows throughout",
      "Lower with control back to starting position",
    ],
    tips: [
      "Lead with your elbows, not your hands",
      "Don't swing or use momentum",
      "Keep shoulders down, don't shrug"
    ],
    videoUrl: "",
    videoPoster: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&h=450&fit=crop"
  },
};

const defaultExerciseInfo: ExerciseInfo = {
  description: "A targeted movement to build strength and muscle.",
  howToPerform: [
    "Set up with proper posture and grip",
    "Initiate the movement with control",
    "Move through the full range of motion",
    "Return to starting position with control",
  ],
  tips: [
    "Focus on form over weight",
    "Control the movement throughout",
    "Breathe steadily"
  ],
  videoUrl: "",
  videoPoster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop"
};

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
  const [showExerciseInfo, setShowExerciseInfo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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

  // Reset info panel when changing exercises
  useEffect(() => {
    setShowExerciseInfo(false);
    setIsVideoPlaying(false);
  }, [currentExerciseIndex]);

  const currentExercise = exercises[currentExerciseIndex];
  const exerciseInfo = exerciseInfoDatabase[currentExercise.name] || defaultExerciseInfo;
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
      formScore: Math.floor(Math.random() * 15) + 80,
    }));

    navigate("/workout-summary", {
      state: {
        duration: elapsedTime,
        totalVolume: Math.round(totalVolume),
        exercisesCompleted: exercises.filter(ex => ex.sets.some(s => s.isCompleted)).length,
        totalExercises: exercises.length,
        setsCompleted: totalCompletedSets,
        totalSets,
        personalRecords: Math.random() > 0.7 ? 1 : 0,
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

      {/* Exercise Info Toggle */}
      <button
        onClick={() => setShowExerciseInfo(!showExerciseInfo)}
        className="flex items-center justify-between px-4 py-3 bg-primary/5 border-b border-border hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">How to perform this exercise</span>
        </div>
        {showExerciseInfo ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Collapsible Exercise Info Panel */}
      {showExerciseInfo && (
        <div className="border-b border-border bg-card animate-in slide-in-from-top-2 duration-200">
          {/* Video Section */}
          <div className="relative aspect-video bg-black/90">
            {isVideoPlaying && exerciseInfo.videoUrl ? (
              <video
                src={exerciseInfo.videoUrl}
                poster={exerciseInfo.videoPoster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img 
                  src={exerciseInfo.videoPoster}
                  alt={`${currentExercise.name} demonstration`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors shadow-lg"
                  >
                    <Play className="h-6 w-6 text-primary-foreground ml-1" />
                  </button>
                </div>
              </>
            )}
            
            {isVideoPlaying && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-white" />
                ) : (
                  <Volume2 className="h-4 w-4 text-white" />
                )}
              </button>
            )}
          </div>

          {/* Description & Steps */}
          <div className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">{exerciseInfo.description}</p>
            
            {/* How to perform */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                How to Perform
              </h4>
              <div className="space-y-2">
                {exerciseInfo.howToPerform.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary font-bold">{i + 1}</span>
                    </span>
                    <p className="text-sm text-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Pro Tips
              </h4>
              <div className="flex flex-wrap gap-2">
                {exerciseInfo.tips.map((tip, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium"
                  >
                    {tip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
