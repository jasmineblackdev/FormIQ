import { cn } from "@/lib/utils";
import { Flame, Dumbbell, Heart, Zap, Check } from "lucide-react";

const goals = [
  { id: "muscle", icon: Dumbbell, label: "Build Muscle", desc: "Hypertrophy-focused training for size and aesthetics", color: "text-primary" },
  { id: "strength", icon: Zap, label: "Get Stronger", desc: "Powerlifting and max strength programming", color: "text-warning" },
  { id: "general", icon: Heart, label: "General Fitness", desc: "Stay healthy, mobile, and active", color: "text-success" },
  { id: "sport", icon: Flame, label: "Sport Performance", desc: "Athletic conditioning and explosive power", color: "text-destructive" },
];

interface GoalStepProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

const GoalStep = ({ selected, onSelect }: GoalStepProps) => {
  return (
    <div className="flex-1 flex flex-col animate-slide-up">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">What's your primary goal?</h1>
        <p className="text-muted-foreground text-sm mt-1">This helps us tailor your experience</p>
      </div>

      <div className="space-y-3 flex-1">
        {goals.map((goal) => {
          const isSelected = selected === goal.id;
          return (
            <button
              key={goal.id}
              onClick={() => onSelect(goal.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                "active:scale-[0.98]",
                isSelected
                  ? "bg-primary/10 border-primary shadow-glow"
                  : "bg-card border-border hover:border-primary/30"
              )}
            >
              <div className={cn(
                "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                isSelected ? "bg-primary/20" : "bg-secondary"
              )}>
                <goal.icon className={cn("h-6 w-6", isSelected ? goal.color : "text-muted-foreground")} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">{goal.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{goal.desc}</p>
              </div>
              {isSelected && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GoalStep;
