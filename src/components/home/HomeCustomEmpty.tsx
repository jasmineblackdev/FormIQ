import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus, Sparkles, ListPlus } from "lucide-react";

interface HomeCustomEmptyProps {
  onStartWorkout?: () => void;
  onBrowseExercises?: () => void;
}

export function HomeCustomEmpty({ onStartWorkout, onBrowseExercises }: HomeCustomEmptyProps) {
  return (
    <div className="px-4 py-6 space-y-6 animate-slide-up">
      {/* Header greeting */}
      <div className="space-y-1">
        <p className="text-muted-foreground">Good morning 👋</p>
        <h2 className="text-xl font-semibold text-foreground">Ready to train your way?</h2>
      </div>

      {/* Empty state hero */}
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="h-24 w-24 rounded-2xl bg-secondary flex items-center justify-center">
            <Dumbbell className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <Plus className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">No Workouts Yet</h3>
        <p className="text-muted-foreground text-sm max-w-xs mb-8">
          Start your first workout to track your form and see your progress over time.
        </p>

        {/* CTA buttons */}
        <div className="w-full max-w-xs space-y-3">
          <Button 
            onClick={onStartWorkout}
            className="w-full h-14 text-lg font-semibold gap-3 gradient-primary shadow-glow"
          >
            <Sparkles className="h-5 w-5" />
            Start Workout
          </Button>
          
          <Button 
            variant="outline"
            onClick={onBrowseExercises}
            className="w-full h-12 gap-2"
          >
            <ListPlus className="h-5 w-5" />
            Browse Exercises
          </Button>
        </div>
      </div>

      {/* Tips for getting started */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">How it works</h3>
        <div className="space-y-2">
          {[
            { step: "1", title: "Choose your exercises", desc: "Pick from 100+ movements" },
            { step: "2", title: "Record your sets", desc: "Use AI to analyze your form" },
            { step: "3", title: "Track progress", desc: "Watch your form scores improve" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-primary">{item.step}</span>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
