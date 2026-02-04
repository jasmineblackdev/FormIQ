import { Button } from "@/components/ui/button";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  Dumbbell, 
  Plus, 
  Play, 
  TrendingUp, 
  Target,
  Clock,
  CheckCircle2,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  targetMuscle: string;
  lastFormScore?: number;
  description?: string;
  tips?: string[];
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
}

interface ExerciseDetailSheetProps {
  exercise: Exercise | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToWorkout?: (exercise: Exercise) => void;
  onRecordForm?: (exercise: Exercise) => void;
}

const exerciseDetails: Record<string, Partial<Exercise>> = {
  "Bench Press": {
    description: "A compound pushing movement that primarily targets the chest, shoulders, and triceps. The barbell bench press is a foundational strength exercise.",
    tips: [
      "Keep shoulder blades pinched together",
      "Maintain a slight arch in your lower back",
      "Lower the bar to mid-chest level",
      "Drive feet into the floor for stability"
    ],
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Front Deltoids", "Serratus Anterior"]
  },
  "Squat": {
    description: "The king of lower body exercises. Squats target your quads, hamstrings, and glutes while also engaging your core for stability.",
    tips: [
      "Keep chest up and back straight",
      "Push knees out over toes",
      "Descend until thighs are parallel",
      "Drive through your heels"
    ],
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Core", "Lower Back"]
  },
  "Deadlift": {
    description: "A full-body pulling movement that builds overall strength. The deadlift works your entire posterior chain.",
    tips: [
      "Keep bar close to your body",
      "Hinge at the hips first",
      "Maintain neutral spine throughout",
      "Lock out with glutes, not back"
    ],
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    secondaryMuscles: ["Traps", "Forearms", "Core"]
  }
};

const historyData = [
  { date: "Feb 2", score: 92, weight: "135 lbs", reps: 8 },
  { date: "Jan 30", score: 88, weight: "130 lbs", reps: 10 },
  { date: "Jan 27", score: 85, weight: "125 lbs", reps: 10 },
];

export function ExerciseDetailSheet({ 
  exercise, 
  open, 
  onOpenChange,
  onAddToWorkout,
  onRecordForm
}: ExerciseDetailSheetProps) {
  if (!exercise) return null;

  const details = exerciseDetails[exercise.name] || {
    description: "A targeted movement to build strength and muscle.",
    tips: ["Focus on form over weight", "Control the movement", "Breathe steadily"],
    primaryMuscles: [exercise.targetMuscle],
    secondaryMuscles: []
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="text-left pb-4">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Dumbbell className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <SheetTitle className="text-xl">{exercise.name}</SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {exercise.sets} sets × {exercise.reps} reps
              </p>
            </div>
            {exercise.lastFormScore && (
              <FormScoreBadge score={exercise.lastFormScore} />
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6 overflow-y-auto max-h-[calc(85vh-180px)] pb-4">
          {/* Description */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{details.description}</p>
          </div>

          {/* Muscles worked */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Muscles Worked
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.primaryMuscles?.map((muscle, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {muscle}
                </span>
              ))}
              {details.secondaryMuscles?.map((muscle, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Form tips */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Form Tips
            </h4>
            <div className="space-y-2">
              {details.tips?.map((tip, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                >
                  <span className="text-xs text-primary font-bold mt-0.5">{i + 1}</span>
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent history */}
          {exercise.lastFormScore && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Recent History
              </h4>
              <div className="space-y-2">
                {historyData.map((session, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <FormScoreBadge score={session.score} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {session.weight} × {session.reps}
                        </p>
                        <p className="text-xs text-muted-foreground">{session.date}</p>
                      </div>
                    </div>
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border space-y-2">
          <Button 
            className="w-full gap-2"
            onClick={() => onAddToWorkout?.(exercise)}
          >
            <Plus className="h-4 w-4" />
            Add to Workout
          </Button>
          <Button 
            variant="outline"
            className="w-full gap-2"
            onClick={() => onRecordForm?.(exercise)}
          >
            <Play className="h-4 w-4" />
            Record Form
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
