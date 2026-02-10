import { useNavigate } from "react-router-dom";
import { CheckCircle2, Sparkles, LayoutGrid, User, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChoosePathStepProps {
  selectedGoal: string | null;
  selectedLevel: string | null;
}

const goalLabels: Record<string, string> = {
  muscle: "Build Muscle",
  strength: "Get Stronger",
  general: "General Fitness",
  sport: "Sport Performance",
};

const levelLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const ChoosePathStep = ({ selectedGoal, selectedLevel }: ChoosePathStepProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col animate-slide-up">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 rounded-full bg-success/30 blur-xl scale-150" />
          <div className="relative h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">You're all set!</h1>
        <p className="text-muted-foreground text-sm mt-1">Choose how you'd like to start</p>
      </div>

      {/* Profile summary chip */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border mb-6">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Your Profile</p>
          <p className="text-xs text-muted-foreground">
            {goalLabels[selectedGoal || ""] || "—"} • {levelLabels[selectedLevel || ""] || "—"}
          </p>
        </div>
      </div>

      {/* Path options */}
      <div className="space-y-3 flex-1">
        {/* Recommended */}
        <button
          onClick={() => navigate("/")}
          className="w-full p-5 rounded-2xl bg-card border-2 border-primary/40 text-left relative overflow-hidden group active:scale-[0.98] transition-all"
        >
          <div className="absolute top-0 right-0 bg-primary/10 px-3 py-1 rounded-bl-xl">
            <span className="text-[10px] font-bold text-primary">RECOMMENDED</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 mt-1">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-lg">Start Recommended</p>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Exercises personalized for your goals, ready to go.
              </p>
              <div className="space-y-1.5">
                {[
                  `Tailored for ${goalLabels[selectedGoal || ""] || "your goal"}`,
                  `${levelLabels[selectedLevel || ""] || "Matched"}-level coaching`,
                  "Start training immediately",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success shrink-0" />
                    <span className="text-xs text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        {/* Custom */}
        <button
          onClick={() => navigate("/exercises")}
          className="w-full p-5 rounded-2xl bg-card border border-border text-left group active:scale-[0.98] transition-all hover:border-primary/30"
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 mt-1">
              <LayoutGrid className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-lg">Browse & Build My Own</p>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Explore the full library and create your perfect workout.
              </p>
              <div className="space-y-1.5">
                {[
                  "Full exercise library access",
                  "Complete customization",
                  "Build any workout you want",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-success shrink-0" />
                    <span className="text-xs text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1 opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChoosePathStep;
