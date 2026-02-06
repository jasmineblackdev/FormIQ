import { cn } from "@/lib/utils";
import { Baby, TrendingUp, Trophy } from "lucide-react";

const levels = [
  { id: "beginner", icon: Baby, label: "Beginner", desc: "New to lifting or less than 6 months of consistent training" },
  { id: "intermediate", icon: TrendingUp, label: "Intermediate", desc: "6 months to 3 years of consistent training with good form fundamentals" },
  { id: "advanced", icon: Trophy, label: "Advanced", desc: "3+ years of training, compete or train like an athlete" },
];

interface ExperienceStepProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

const ExperienceStep = ({ selected, onSelect }: ExperienceStepProps) => {
  return (
    <div className="flex-1 flex flex-col animate-slide-up">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">What's your training experience?</h1>
        <p className="text-muted-foreground text-sm">We'll adjust coaching depth to match your level</p>
      </div>
      <div className="grid gap-3 flex-1">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-5 rounded-xl border transition-all",
              selected === level.id
                ? "bg-primary/10 border-primary"
                : "bg-card border-border hover:border-primary/30"
            )}
          >
            <level.icon className={cn(
              "h-6 w-6",
              selected === level.id ? "text-primary" : "text-muted-foreground"
            )} />
            <div className="text-center">
              <p className="font-semibold text-foreground">{level.label}</p>
              <p className="text-xs text-muted-foreground max-w-[220px]">{level.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExperienceStep;
