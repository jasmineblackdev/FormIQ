import { Scan, TrendingUp, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

const features = [
  { icon: Scan, label: "AI Form Analysis", desc: "Real-time posture and technique correction" },
  { icon: TrendingUp, label: "Track Progress", desc: "Monitor improvement over every session" },
  { icon: MessageSquare, label: "Smart Feedback", desc: "Coaching-style tips after every set" },
];

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between text-center animate-slide-up">
      {/* Top hero */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Glowing logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-primary/30 blur-2xl scale-150" />
          <div className="relative h-20 w-20 rounded-3xl gradient-primary flex items-center justify-center shadow-glow">
            <Scan className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">FormIQ</h1>
          <p className="text-muted-foreground text-sm mt-1">Your AI-Powered Personal Trainer</p>
        </div>

        {/* Feature list */}
        <div className="space-y-4 w-full max-w-xs">
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className="flex items-center gap-4 text-left p-3 rounded-2xl bg-card/60 border border-border/50"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="w-full pt-6 space-y-3">
        <Button
          className="w-full h-14 text-base font-bold rounded-2xl gap-2 gradient-primary shadow-glow"
          onClick={onNext}
        >
          Get Started
          <ArrowRight className="h-5 w-5" />
        </Button>
        <p className="text-[11px] text-muted-foreground/70">
          By continuing, you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
