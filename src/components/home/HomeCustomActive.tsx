import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import { Plus, Sparkles, ListPlus, Calendar, TrendingUp, ChevronRight } from "lucide-react";

interface HomeCustomActiveProps {
  onStartWorkout?: () => void;
  onBrowseExercises?: () => void;
  onViewProgress?: () => void;
}

const recentWorkouts = [
  { 
    name: "Upper Body", 
    date: "Today", 
    exercises: 6, 
    avgFormScore: 85,
    duration: 52,
  },
  { 
    name: "Leg Day", 
    date: "Yesterday", 
    exercises: 5, 
    avgFormScore: 82,
    duration: 48,
  },
  { 
    name: "Push Day", 
    date: "2 days ago", 
    exercises: 6, 
    avgFormScore: 88,
    duration: 55,
  },
];

export function HomeCustomActive({ onStartWorkout, onBrowseExercises, onViewProgress }: HomeCustomActiveProps) {
  return (
    <div className="px-4 py-6 space-y-6 animate-slide-up">
      {/* Header greeting */}
      <div className="space-y-1">
        <p className="text-muted-foreground">Good afternoon 💪</p>
        <h2 className="text-xl font-semibold text-foreground">Keep the momentum going!</h2>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground">This Week</p>
        </div>
        <div className="p-3 rounded-xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-foreground">85</p>
          <p className="text-xs text-muted-foreground">Avg Form</p>
        </div>
        <div className="p-3 rounded-xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-primary">🔥 5</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={onStartWorkout}
          className="h-14 text-base font-semibold gap-2 gradient-primary shadow-glow"
        >
          <Sparkles className="h-5 w-5" />
          Start Workout
        </Button>
        
        <Button 
          variant="outline"
          onClick={onBrowseExercises}
          className="h-14 gap-2"
        >
          <ListPlus className="h-5 w-5" />
          Exercises
        </Button>
      </div>

      {/* Recent activity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Recent Activity
          </h3>
          <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={onViewProgress}>
            View all <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {recentWorkouts.map((workout, index) => (
            <button
              key={index}
              onClick={onViewProgress}
              className="w-full p-4 rounded-xl bg-card border border-border flex items-center gap-4 text-left hover:bg-accent transition-colors"
            >
              <FormScoreBadge score={workout.avgFormScore} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{workout.name}</p>
                <p className="text-xs text-muted-foreground">
                  {workout.exercises} exercises • {workout.duration}m
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{workout.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress hint */}
      <button 
        onClick={onViewProgress}
        className="w-full p-4 rounded-xl bg-primary/10 border border-primary/20 text-left hover:bg-primary/15 transition-colors"
      >
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Your form is improving!</p>
            <p className="text-xs text-muted-foreground">Average score up 8% this week</p>
          </div>
          <ChevronRight className="h-4 w-4 text-primary ml-auto" />
        </div>
      </button>
    </div>
  );
}
