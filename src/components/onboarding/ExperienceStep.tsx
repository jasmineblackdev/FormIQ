import { cn } from "@/lib/utils";
import { Baby, TrendingUp, Trophy, Check } from "lucide-react";

const levels = [
  {
    id: "beginner",
    icon: Baby,
    label: "Beginner",
    desc: "New to lifting or less than 6 months of consistent training",
    detail: "We'll focus on foundational form cues"
  },
  {
    id: "intermediate",
    icon: TrendingUp,
    label: "Intermediate",
    desc: "6 months – 3 years of consistent training with good fundamentals",
    detail: "We'll refine technique and add advanced cues"
  },
  {
    id: "advanced",
    icon: Trophy,
    label: "Advanced",
    desc: "3+ years of training, compete or train like an athlete",
    detail: "We'll focus on micro-corrections and optimization"
  },
];

interface ExperienceStepProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

const ExperienceStep = ({ selected, onSelect }: ExperienceStepProps) => {
  return (
    <div className="flex-1 flex flex-col animate-slide-up">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">What's your experience?</h1>
        <p className="text-muted-foreground text-sm mt-1">We'll adjust coaching depth to match your level</p>
      </div>

      <div className="space-y-3 flex-1">
        {levels.map((level) => {
          const isSelected = selected === level.id;
          return (
            <button
              key={level.id}
              onClick={() => onSelect(level.id)}
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
                <level.icon className={cn("h-6 w-6", isSelected ? "text-primary" : "text-muted-foreground")} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">{level.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{level.desc}</p>
                {isSelected && (
                  <p className="text-xs text-primary mt-1 font-medium">{level.detail}</p>
                )}
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

export default ExperienceStep;
