import { Camera, HardDrive, Bell, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PermissionsStepProps {
  onNext: () => void;
}

const permissions = [
  {
    icon: Camera,
    title: "Camera",
    desc: "Record your lifts for AI form analysis",
    required: true,
  },
  {
    icon: HardDrive,
    title: "Storage",
    desc: "Save workout videos and form analyses locally",
    required: true,
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Workout reminders and progress updates",
    required: false,
  },
];

const PermissionsStep = ({ onNext }: PermissionsStepProps) => {
  const [granted, setGranted] = useState<Record<string, boolean>>({});

  const handleGrant = (title: string) => {
    setGranted(prev => ({ ...prev, [title]: true }));
  };

  const allRequiredGranted = permissions
    .filter(p => p.required)
    .every(p => granted[p.title]);

  return (
    <div className="flex-1 flex flex-col animate-slide-up">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Quick permissions</h1>
        <p className="text-muted-foreground text-sm mt-1">FormIQ needs these to analyze your form</p>
      </div>

      <div className="space-y-3 flex-1">
        {permissions.map((perm) => {
          const isGranted = granted[perm.title];
          return (
            <div
              key={perm.title}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                isGranted ? "bg-success/5 border-success/30" : "bg-card border-border"
              )}
            >
              <div className={cn(
                "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                isGranted ? "bg-success/20" : "bg-secondary"
              )}>
                {isGranted ? (
                  <Check className="h-6 w-6 text-success" />
                ) : (
                  <perm.icon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-foreground">{perm.title}</p>
                  {perm.required && !isGranted && (
                    <span className="text-[10px] font-semibold text-warning bg-warning/10 px-1.5 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{perm.desc}</p>
              </div>
              {!isGranted && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl text-xs h-9 px-4 shrink-0 border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => handleGrant(perm.title)}
                >
                  Allow
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Privacy note + actions */}
      <div className="pt-6 space-y-3">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card/60 border border-border/50">
          <Shield className="h-4 w-4 text-primary shrink-0" />
          <span className="text-[11px] text-muted-foreground">
            Your videos are stored locally and never shared without permission
          </span>
        </div>
        <Button
          className="w-full h-14 text-base font-bold rounded-2xl gradient-primary shadow-glow"
          onClick={onNext}
          disabled={!allRequiredGranted}
        >
          {allRequiredGranted ? "Continue" : "Allow required permissions"}
        </Button>
        <button
          onClick={onNext}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          I'll do this later
        </button>
      </div>
    </div>
  );
};

export default PermissionsStep;
