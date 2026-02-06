import { Scan, TrendingUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

const features = [
  { icon: Scan, label: "Perfect Your Form" },
  { icon: TrendingUp, label: "Track Your Progress" },
  { icon: MessageSquare, label: "AI-Powered Feedback" },
];

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center animate-slide-up px-6">
      <div className="mb-10">
        <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Scan className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-1">FormIQ</h1>
        <p className="text-muted-foreground text-sm">Your AI-Powered Personal Trainer</p>
      </div>

      <div className="space-y-6 mb-12">
        {features.map((feature) => (
          <div key={feature.label} className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">{feature.label}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-xs">
        <Button
          className="w-full h-12 text-base font-semibold rounded-xl"
          onClick={onNext}
        >
          Get Started
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
