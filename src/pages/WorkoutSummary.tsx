import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { 
  Check, 
  ChevronRight, 
  Flame, 
  Clock, 
  Dumbbell, 
  TrendingUp,
  Trophy,
  Share2,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseSummary {
  name: string;
  setsCompleted: number;
  totalSets: number;
  totalVolume: number;
  formScore?: number;
}

const WorkoutSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from ActiveWorkout or use defaults for demo
  const workoutData = location.state || {
    duration: 2847, // seconds (47:27)
    totalVolume: 12450,
    exercisesCompleted: 6,
    totalExercises: 6,
    setsCompleted: 20,
    totalSets: 20,
    personalRecords: 1,
    avgFormScore: 87,
    exercises: [
      { name: "Bench Press", setsCompleted: 4, totalSets: 4, totalVolume: 3600, formScore: 92 },
      { name: "Incline Dumbbell Press", setsCompleted: 3, totalSets: 3, totalVolume: 2160, formScore: 85 },
      { name: "Overhead Press", setsCompleted: 4, totalSets: 4, totalVolume: 2800, formScore: 88 },
      { name: "Cable Flyes", setsCompleted: 3, totalSets: 3, totalVolume: 1440, formScore: 91 },
      { name: "Tricep Pushdowns", setsCompleted: 3, totalSets: 3, totalVolume: 1350, formScore: 82 },
      { name: "Lateral Raises", setsCompleted: 3, totalSets: 3, totalVolume: 1100, formScore: 84 },
    ] as ExerciseSummary[],
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m ${secs}s`;
  };

  const formatVolume = (lbs: number) => {
    if (lbs >= 1000) {
      return `${(lbs / 1000).toFixed(1)}k`;
    }
    return lbs.toString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-primary";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const completionPercentage = Math.round(
    (workoutData.setsCompleted / workoutData.totalSets) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with celebration */}
      <div className="relative bg-gradient-to-b from-primary/20 to-background px-4 pt-12 pb-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-success/10 blur-3xl" />
        </div>

        <div className="relative text-center space-y-4">
          {/* Success icon */}
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/20 mx-auto animate-scale-in">
            <div className="h-14 w-14 rounded-full bg-success flex items-center justify-center">
              <Check className="h-8 w-8 text-success-foreground" />
            </div>
          </div>

          <div className="space-y-1 animate-slide-up">
            <h1 className="text-2xl font-bold text-foreground">Workout Complete!</h1>
            <p className="text-muted-foreground">Push Day • Week 2, Day 6</p>
          </div>

          {/* PR badge if applicable */}
          {workoutData.personalRecords > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 text-warning animate-slide-up">
              <Trophy className="h-4 w-4" />
              <span className="font-semibold text-sm">
                {workoutData.personalRecords} New PR{workoutData.personalRecords > 1 ? 's' : ''}!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats overview */}
      <div className="px-4 -mt-2 space-y-6">
        {/* Main stats cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Duration</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatDuration(workoutData.duration)}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Volume</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatVolume(workoutData.totalVolume)} lbs
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Sets Done</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {workoutData.setsCompleted}/{workoutData.totalSets}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-warning" />
              <span className="text-xs text-muted-foreground">Avg Form</span>
            </div>
            <p className={cn("text-2xl font-bold", getScoreColor(workoutData.avgFormScore))}>
              {workoutData.avgFormScore}
            </p>
          </div>
        </div>

        {/* Completion ring */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-6">
            <ProgressRing 
              progress={completionPercentage} 
              size={100} 
              strokeWidth={8}
            >
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">{completionPercentage}%</span>
              </div>
            </ProgressRing>
            
            <div className="flex-1">
              <p className="font-semibold text-foreground">Great Session!</p>
              <p className="text-sm text-muted-foreground mt-1">
                You completed all {workoutData.exercisesCompleted} exercises and hit your targets.
              </p>
              {workoutData.avgFormScore >= 85 && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-success">
                  <Check className="h-4 w-4" />
                  <span>Excellent form maintained</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Exercise breakdown */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Exercise Breakdown</h3>
          <div className="space-y-2">
            {workoutData.exercises.map((exercise: ExerciseSummary, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{exercise.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {exercise.setsCompleted} sets • {formatVolume(exercise.totalVolume)} lbs
                  </p>
                </div>
                {exercise.formScore && (
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center font-bold text-sm",
                    exercise.formScore >= 90 ? "bg-success/20 text-success" :
                    exercise.formScore >= 75 ? "bg-primary/20 text-primary" :
                    exercise.formScore >= 60 ? "bg-warning/20 text-warning" :
                    "bg-destructive/20 text-destructive"
                  )}>
                    {exercise.formScore}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next workout preview */}
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Up Next</p>
              <p className="font-semibold text-foreground">Pull Day</p>
              <p className="text-sm text-muted-foreground">Tomorrow</p>
            </div>
            <button className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-xl border-t border-border p-4 mt-6 space-y-3">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => navigate("/analyze")}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analysis
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        
        <Button
          onClick={() => navigate("/")}
          className="w-full h-12 text-base font-semibold gradient-primary"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default WorkoutSummary;
