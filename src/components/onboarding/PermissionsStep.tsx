import { Camera, HardDrive, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PermissionsStepProps {
  onNext: () => void;
}

const permissions = [
  {
    icon: Camera,
    title: "Camera Access Required",
    desc: "FormIQ needs camera access to analyze your form and provide feedback.",
    action: "Allow Camera Access",
  },
  {
    icon: HardDrive,
    title: "Storage Access Required",
    desc: "FormIQ needs storage to save your workout videos and form analyses.",
    action: "Allow Storage Access",
  },
  {
    icon: Bell,
    title: "Notification Permission",
    desc: "Get notified about workout reminders, form feedback, and progress updates.",
    action: "Enable Notifications",
  },
];

const PermissionsStep = ({ onNext }: PermissionsStepProps) => {
  return (
    <div className="flex-1 flex flex-col animate-slide-up">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-foreground mb-1">Just a few permissions</h1>
        <p className="text-muted-foreground text-sm">FormIQ needs these to analyze your form and help you improve</p>
      </div>

      <div className="space-y-5 flex-1">
        {permissions.map((perm) => (
          <div key={perm.title} className="flex flex-col items-center text-center gap-2">
            <div className="h-12 w-12 rounded-xl bg-card border border-border flex items-center justify-center">
              <perm.icon className="h-6 w-6 text-primary" />
            </div>
            <p className="font-semibold text-foreground text-sm">{perm.title}</p>
            <p className="text-xs text-muted-foreground max-w-[260px]">{perm.desc}</p>
            <Button size="sm" className="rounded-lg text-xs h-8 px-4">
              {perm.action}
            </Button>
            <button className="text-xs text-primary hover:underline">Learn More</button>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          <span>Your videos are stored locally and never shared without your permission</span>
        </div>
        <Button className="w-full h-12 text-base font-semibold rounded-xl" onClick={onNext}>
          Allow Permissions
        </Button>
        <button
          onClick={onNext}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          I'll do this later
        </button>
      </div>
    </div>
  );
};

export default PermissionsStep;
