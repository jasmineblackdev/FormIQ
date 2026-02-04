import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Camera,
  RotateCcw,
  Pause,
  Square,
  Zap,
  Timer,
  Target
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const recentExercises = [
  { name: "Bench Press", lastScore: 92 },
  { name: "Squat", lastScore: 86 },
  { name: "Deadlift", lastScore: 78 },
  { name: "Overhead Press", lastScore: 91 },
];

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

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
              "h-32 w-32 rounded-full border-4 flex items-center justify-center",
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
              <p className="text-white text-sm font-medium">{selectedExercise}</p>
            )}
            {isRecording && (
              <div className="flex items-center gap-2 text-destructive">
                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                <span className="font-mono text-sm">00:12</span>
              </div>
            )}
          </div>

          {/* Top controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button className="h-10 w-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
              <RotateCcw className="h-5 w-5 text-white" />
            </button>
            <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-white text-xs font-medium">AI Active</span>
            </div>
            <button className="h-10 w-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
              <Timer className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom controls panel */}
        <div className="bg-background border-t border-border p-4 space-y-4">
          {/* Exercise quick select */}
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
          </div>

          {/* Record button */}
          <div className="flex items-center justify-center gap-6">
            <button className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <Camera className="h-5 w-5 text-muted-foreground" />
            </button>

            <button
              onClick={() => setIsRecording(!isRecording)}
              className={cn(
                "h-20 w-20 rounded-full flex items-center justify-center transition-all",
                isRecording 
                  ? "bg-destructive" 
                  : "bg-primary shadow-glow"
              )}
            >
              {isRecording ? (
                <Square className="h-8 w-8 text-white fill-white" />
              ) : (
                <Video className="h-8 w-8 text-primary-foreground" />
              )}
            </button>

            <button className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <Pause className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Helper text */}
          <p className="text-center text-xs text-muted-foreground">
            {isRecording 
              ? "Tap to stop recording and analyze your form" 
              : "Position your full body in frame for best results"
            }
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Record;
