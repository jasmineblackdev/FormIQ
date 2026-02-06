import { cn } from "@/lib/utils";
import { Flame, Dumbbell, Heart, Zap } from "lucide-react";

const goals = [
  { id: "muscle", icon: Dumbbell, label: "Build Muscle", desc: "Hypertrophy and aesthetics" },
  { id: "strength", icon: Zap, label: "Get Stronger", desc: "Powerlifting and max strength" },
  { id: "general", icon: Heart, label: "General Fitness", desc: "Stay healthy and active" },
  { id: "sport", icon: Flame, label: "Sport Performance", desc: "Athletic training and conditioning" },
];

interface GoalStepProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

const GoalStep = ({ selected, onSelect }: GoalStepProps) => {
  return (
    <div className="flex-1 flex flex-col animate-slide-up">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">What's your primary goal?</h1>
        <p className="text-muted-foreground text-sm">This helps us personalize your experience</p>
      </div>
      <div className="grid gap-3 flex-1">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => onSelect(goal.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-5 rounded-xl border transition-all",
              selected === goal.id
                ? "bg-primary/10 border-primary"
                : "bg-card border-border hover:border-primary/30"
            )}
          >
            <goal.icon className={cn(
              "h-6 w-6",
              selected === goal.id ? "text-primary" : "text-muted-foreground"
            )} />
            <div className="text-center">
              <p className="font-semibold text-foreground">{goal.label}</p>
              <p className="text-xs text-muted-foreground">{goal.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GoalStep;
