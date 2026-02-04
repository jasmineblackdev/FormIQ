import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Video, 
  Camera,
  RotateCcw,
  Pause,
  Square,
  Zap,
  Timer,
  Target,
  Search,
  X,
  ChevronDown
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const allExercises = [
  { name: "Bench Press", lastScore: 92 },
  { name: "Squat", lastScore: 86 },
  { name: "Deadlift", lastScore: 78 },
  { name: "Overhead Press", lastScore: 91 },
  { name: "Barbell Rows", lastScore: 88 },
  { name: "Lat Pulldowns", lastScore: 82 },
  { name: "Leg Press", lastScore: 85 },
  { name: "Romanian Deadlift", lastScore: 80 },
  { name: "Incline Dumbbell Press", lastScore: 87 },
  { name: "Barbell Curls", lastScore: 94 },
  { name: "Tricep Pushdowns", lastScore: 89 },
  { name: "Lateral Raises", lastScore: 83 },
];

const Record = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const recentExercises = allExercises.slice(0, 4);

  const filteredExercises = allExercises.filter(ex =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    if (selectedExercise) {
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
    }
  };

  const handlePauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    // Pass recording data to feedback page
    navigate('/form-feedback', { 
      state: { 
        exercise: selectedExercise,
        duration: formatTime(recordingTime),
        recordingTime
      } 
    });
    setRecordingTime(0);
  };

  const handleSelectExercise = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setShowExerciseSearch(false);
    setSearchQuery("");
  };

  const handleResetCamera = () => {
    // Reset camera position (placeholder)
    console.log("Camera reset");
  };

  return (
    <AppLayout hideProgress>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Camera viewfinder area */}
        <div className="relative flex-1 bg-black/90 flex items-center justify-center overflow-hidden">
          {/* Placeholder camera view */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          
          {/* Grid overlay for form guidance */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>
          </div>

          {/* Center target indicator */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className={cn(
              "h-32 w-32 rounded-full border-4 flex items-center justify-center transition-all",
              isRecording 
                ? "border-destructive animate-pulse" 
                : "border-primary/50"
            )}>
              <Target className={cn(
                "h-12 w-12",
                isRecording ? "text-destructive" : "text-primary/70"
              )} />
            </div>
            {!selectedExercise && !isRecording && (
              <p className="text-white/70 text-sm">Select an exercise to begin</p>
            )}
            {selectedExercise && !isRecording && (
              <button
                onClick={() => setShowExerciseSearch(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur"
              >
                <span className="text-white text-sm font-medium">{selectedExercise}</span>
                <ChevronDown className="h-4 w-4 text-white/70" />
              </button>
            )}
            {isRecording && (
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-3 w-3 rounded-full",
                  isPaused ? "bg-warning" : "bg-destructive animate-pulse"
                )} />
                <span className="font-mono text-xl text-white font-bold">
                  {formatTime(recordingTime)}
                </span>
              </div>
            )}
          </div>

          {/* Top controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button 
              onClick={handleResetCamera}
              className="h-10 w-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
            >
              <RotateCcw className="h-5 w-5 text-white" />
            </button>
            <div className={cn(
              "px-3 py-1.5 rounded-full backdrop-blur flex items-center gap-2",
              isRecording ? "bg-destructive/80" : "bg-black/50"
            )}>
              <Zap className={cn("h-4 w-4", isRecording ? "text-white" : "text-primary")} />
              <span className="text-white text-xs font-medium">
                {isRecording ? "Recording..." : "AI Active"}
              </span>
            </div>
            <button 
              onClick={() => console.log("Timer settings")}
              className="h-10 w-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
            >
              <Timer className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Recording indicator bar */}
          {isRecording && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-destructive rounded-full transition-all"
                  style={{ width: `${Math.min((recordingTime / 60) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom controls panel */}
        <div className="bg-background border-t border-border p-4 space-y-4">
          {/* Exercise quick select */}
          {!isRecording && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {recentExercises.map((exercise) => (
                <button
                  key={exercise.name}
                  onClick={() => setSelectedExercise(exercise.name)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2",
                    selectedExercise === exercise.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {exercise.name}
                  <span className={cn(
                    "text-xs",
                    selectedExercise === exercise.name 
                      ? "text-primary-foreground/70" 
                      : "text-muted-foreground"
                  )}>
                    {exercise.lastScore}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setShowExerciseSearch(true)}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-secondary text-secondary-foreground flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                More
              </button>
            </div>
          )}

          {/* Record button */}
          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={() => navigate(-1)}
              className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <button
              onClick={() => {
                if (isRecording) {
                  handleStopRecording();
                } else {
                  handleStartRecording();
                }
              }}
              disabled={!selectedExercise}
              className={cn(
                "h-20 w-20 rounded-full flex items-center justify-center transition-all",
                !selectedExercise 
                  ? "bg-muted cursor-not-allowed" 
                  : isRecording 
                    ? "bg-destructive" 
                    : "bg-primary shadow-glow"
              )}
            >
              {isRecording ? (
                <Square className="h-8 w-8 text-white fill-white" />
              ) : (
                <Video className={cn(
                  "h-8 w-8",
                  selectedExercise ? "text-primary-foreground" : "text-muted-foreground"
                )} />
              )}
            </button>

            <button 
              onClick={handlePauseRecording}
              disabled={!isRecording}
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center",
                isRecording ? "bg-secondary" : "bg-muted"
              )}
            >
              <Pause className={cn(
                "h-5 w-5",
                isRecording ? "text-foreground" : "text-muted-foreground"
              )} />
            </button>
          </div>

          {/* Helper text */}
          <p className="text-center text-xs text-muted-foreground">
            {!selectedExercise 
              ? "Select an exercise above to start recording"
              : isRecording 
                ? isPaused
                  ? "Recording paused - tap pause to resume or stop to analyze"
                  : "Tap to stop recording and analyze your form" 
                : "Position your full body in frame for best results"
            }
          </p>
        </div>
      </div>

      {/* Exercise search sheet */}
      <Sheet open={showExerciseSearch} onOpenChange={setShowExerciseSearch}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle>Select Exercise</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>

            <div className="space-y-1 max-h-[50vh] overflow-y-auto">
              {filteredExercises.map((exercise) => (
                <button
                  key={exercise.name}
                  onClick={() => handleSelectExercise(exercise.name)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl transition-colors text-left",
                    selectedExercise === exercise.name 
                      ? "bg-primary/10 border border-primary"
                      : "hover:bg-accent"
                  )}
                >
                  <span className="font-medium text-foreground">{exercise.name}</span>
                  <span className="text-sm text-muted-foreground">Score: {exercise.lastScore}</span>
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default Record;
