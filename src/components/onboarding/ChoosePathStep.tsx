import { useNavigate } from "react-router-dom";
import { CheckCircle2, Sparkles, LayoutGrid, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="text-center mb-6">
        <div className="h-14 w-14 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">You're All Set!</h1>
        <p className="text-muted-foreground">How would you like to start?</p>
      </div>

      {/* Profile summary */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border mb-4">
        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Your Profile</p>
          <p className="text-xs text-muted-foreground">
            {goalLabels[selectedGoal || ""] || "—"} • {levelLabels[selectedLevel || ""] || "—"}
          </p>
        </div>
      </div>

      {/* Recommended path */}
      <div className="p-4 rounded-xl bg-card border border-primary/30 mb-3 relative">
        <span className="absolute top-3 right-3 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          Recommended
        </span>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="font-bold text-foreground">Use Recommended Workout</p>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Start with exercises tailored to your goals. Perfect for getting started quickly.
        </p>
        <div className="space-y-1.5 mb-4">
          {[
            `Personalized for ${goalLabels[selectedGoal || ""] || "your goal"}`,
            `${levelLabels[selectedLevel || ""] || "Matched"}-level exercises`,
            "Ready to start immediately",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="text-xs text-foreground">{item}</span>
            </div>
          ))}
        </div>
        <Button className="w-full h-10 rounded-xl text-sm font-semibold" onClick={() => navigate("/")}>
          Start Recommended Workout
        </Button>
      </div>

      {/* Custom path */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-3 mb-2">
          <LayoutGrid className="h-5 w-5 text-muted-foreground" />
          <p className="font-bold text-foreground">Browse & Choose My Own</p>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Explore all exercises and build your perfect workout from scratch.
        </p>
        <div className="space-y-1.5 mb-4">
          {[
            "Full exercise library access",
            "Complete customization",
            "Build any workout you want",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="text-xs text-foreground">{item}</span>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full h-10 rounded-xl text-sm font-semibold"
          onClick={() => navigate("/exercises")}
        >
          Browse All Exercises
        </Button>
      </div>
    </div>
  );
};

export default ChoosePathStep;
