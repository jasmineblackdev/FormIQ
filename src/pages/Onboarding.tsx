import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Flame,
  TrendingUp,
  Target,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Dumbbell,
} from "lucide-react";

const goals = [
  { id: "muscle", icon: Flame, label: "Build Muscle", desc: "Focus on hypertrophy and strength gains" },
  { id: "strength", icon: TrendingUp, label: "Get Stronger", desc: "Increase max lifts and power" },
  { id: "lose-fat", icon: Target, label: "Lose Fat", desc: "Burn calories and lean out" },
  { id: "maintain", icon: CheckCircle2, label: "Stay Fit", desc: "Maintain current fitness level" },
];

const experienceLevels = [
  { id: "beginner", label: "Beginner", desc: "Less than 6 months training" },
  { id: "intermediate", label: "Intermediate", desc: "6 months – 2 years" },
  { id: "advanced", label: "Advanced", desc: "2+ years of consistent training" },
];

const programRecommendations: Record<string, Record<string, { name: string; split: string; weeks: number }>> = {
  muscle: {
    beginner: { name: "Full Body", split: "3 days/week", weeks: 8 },
    intermediate: { name: "Push/Pull/Legs", split: "6 days/week", weeks: 6 },
    advanced: { name: "Arnold Split", split: "6 days/week", weeks: 8 },
  },
  strength: {
    beginner: { name: "Starting Strength", split: "3 days/week", weeks: 8 },
    intermediate: { name: "5/3/1", split: "4 days/week", weeks: 6 },
    advanced: { name: "Conjugate Method", split: "4 days/week", weeks: 8 },
  },
  "lose-fat": {
    beginner: { name: "Full Body Circuit", split: "4 days/week", weeks: 6 },
    intermediate: { name: "Upper/Lower + HIIT", split: "5 days/week", weeks: 6 },
    advanced: { name: "PPL + Cardio", split: "6 days/week", weeks: 8 },
  },
  maintain: {
    beginner: { name: "Full Body Maintenance", split: "3 days/week", weeks: 8 },
    intermediate: { name: "Upper/Lower", split: "4 days/week", weeks: 6 },
    advanced: { name: "Flexible Split", split: "4 days/week", weeks: 8 },
  },
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const program = selectedGoal && selectedLevel
    ? programRecommendations[selectedGoal]?.[selectedLevel]
    : null;

  const handleFinish = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress dots */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
        ) : (
          <div className="w-9" />
        )}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/50" : "w-4 bg-secondary"
              )}
            />
          ))}
        </div>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        {/* Step 0: Goal */}
        {step === 0 && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">What's your goal?</h1>
              <p className="text-muted-foreground">We'll build a program around it.</p>
            </div>
            <div className="grid gap-3 flex-1">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                    selectedGoal === goal.id
                      ? "bg-primary/10 border-primary"
                      : "bg-card border-border hover:border-primary/30"
                  )}
                >
                  <div className={cn(
                    "h-12 w-12 rounded-lg flex items-center justify-center",
                    selectedGoal === goal.id ? "bg-primary" : "bg-secondary"
                  )}>
                    <goal.icon className={cn(
                      "h-6 w-6",
                      selectedGoal === goal.id ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{goal.label}</p>
                    <p className="text-sm text-muted-foreground">{goal.desc}</p>
                  </div>
                  {selectedGoal === goal.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Experience */}
        {step === 1 && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Experience level?</h1>
              <p className="text-muted-foreground">This helps us pick the right intensity.</p>
            </div>
            <div className="grid gap-3 flex-1">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                    selectedLevel === level.id
                      ? "bg-primary/10 border-primary"
                      : "bg-card border-border hover:border-primary/30"
                  )}
                >
                  <div>
                    <p className="font-medium text-foreground">{level.label}</p>
                    <p className="text-sm text-muted-foreground">{level.desc}</p>
                  </div>
                  {selectedLevel === level.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Program recommendation */}
        {step === 2 && program && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Your program is ready</h1>
              <p className="text-muted-foreground">Based on your goals and experience.</p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-primary/20 shadow-glow space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center">
                  <Dumbbell className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{program.name}</p>
                  <p className="text-sm text-muted-foreground">{program.split}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{program.weeks} Weeks</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Goal</p>
                  <p className="font-semibold text-foreground">
                    {goals.find((g) => g.id === selectedGoal)?.label}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              You can change your program anytime in settings.
            </p>
          </div>
        )}

        {/* Bottom button */}
        <div className="pt-6">
          {step < 2 ? (
            <Button
              className="w-full h-12 text-base font-semibold rounded-xl gap-2"
              disabled={(step === 0 && !selectedGoal) || (step === 1 && !selectedLevel)}
              onClick={() => setStep(step + 1)}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="w-full h-12 text-base font-semibold rounded-xl gap-2"
              onClick={handleFinish}
            >
              Let's Go
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}

          {step === 0 && (
            <button
              onClick={() => navigate("/")}
              className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
