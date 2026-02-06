import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

  const showDots = step >= 1 && step <= 3;
  const dotSteps = [1, 2, 3]; // goal, experience, permissions

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar with back + dots */}
      {showDots && (
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <button onClick={() => setStep(step - 1)} className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex gap-2">
            {dotSteps.map((i) => (
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
      )}

      {/* Content */}
      <div className="flex-1 px-6 py-6 flex flex-col">
        {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}

        {step === 1 && (
          <>
            <GoalStep selected={selectedGoal} onSelect={setSelectedGoal} />
            <div className="pt-4">
              <Button
                className="w-full h-12 text-base font-semibold rounded-xl gap-2"
                disabled={!selectedGoal}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <ExperienceStep selected={selectedLevel} onSelect={setSelectedLevel} />
            <div className="pt-4 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 text-base font-semibold rounded-xl"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-12 text-base font-semibold rounded-xl gap-2"
                disabled={!selectedLevel}
                onClick={() => setStep(3)}
              >
                Continue <ArrowRight className="h-4 w-4" />
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
