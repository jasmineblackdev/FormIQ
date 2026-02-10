import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import GoalStep from "@/components/onboarding/GoalStep";
import ExperienceStep from "@/components/onboarding/ExperienceStep";
import PermissionsStep from "@/components/onboarding/PermissionsStep";
import ChoosePathStep from "@/components/onboarding/ChoosePathStep";

const TOTAL_STEPS = 5;

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const showNav = step >= 1 && step <= 3;
  const dotSteps = [1, 2, 3];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar with back + progress dots */}
      {showNav && (
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <button
            onClick={() => setStep(step - 1)}
            className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            {dotSteps.map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === step
                    ? "w-8 bg-primary"
                    : i < step
                    ? "w-4 bg-primary/50"
                    : "w-4 bg-secondary"
                )}
              />
            ))}
          </div>
          <div className="w-10" />
        </div>
      )}

      {/* Step 4 (Choose Path) gets a back button too */}
      {step === 4 && (
        <div className="px-6 pt-6 pb-2">
          <button
            onClick={() => setStep(3)}
            className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-6 py-6 flex flex-col">
        {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}

        {step === 1 && (
          <>
            <GoalStep selected={selectedGoal} onSelect={setSelectedGoal} />
            <div className="pt-4">
              <Button
                className="w-full h-14 text-base font-bold rounded-2xl gap-2 gradient-primary shadow-glow"
                disabled={!selectedGoal}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <ExperienceStep selected={selectedLevel} onSelect={setSelectedLevel} />
            <div className="pt-4">
              <Button
                className="w-full h-14 text-base font-bold rounded-2xl gap-2 gradient-primary shadow-glow"
                disabled={!selectedLevel}
                onClick={() => setStep(3)}
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}

        {step === 3 && <PermissionsStep onNext={() => setStep(4)} />}

        {step === 4 && (
          <ChoosePathStep selectedGoal={selectedGoal} selectedLevel={selectedLevel} />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
