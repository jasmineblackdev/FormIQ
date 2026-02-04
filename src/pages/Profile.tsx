import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { 
  User, 
  Settings, 
  Target, 
  Dumbbell, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Target, label: "Goals & Program", desc: "Build Muscle • Intermediate" },
  { icon: Dumbbell, label: "Workout Preferences", desc: "6 days/week • 45-60 min" },
  { icon: Bell, label: "Notifications", desc: "Reminders enabled" },
  { icon: Shield, label: "Privacy & Data", desc: "Manage your data" },
  { icon: HelpCircle, label: "Help & Support", desc: "FAQ & Contact" },
];

const Profile = () => {
  return (
    <AppLayout
      programInfo={{
        programName: "Push/Pull/Legs",
        currentWeek: 2,
        totalWeeks: 6,
        currentDay: 6,
        totalDays: 18,
        isRestDay: false,
      }}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Alex Johnson</h1>
            <p className="text-sm text-muted-foreground">Member since Jan 2026</p>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Stats overview */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Your Stats</h3>
            <span className="text-xs text-muted-foreground">All time</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Workouts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">86</p>
              <p className="text-xs text-muted-foreground">Avg Form</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">PRs Set</p>
            </div>
          </div>
        </div>

        {/* Current program */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Push/Pull/Legs</p>
              <p className="text-xs text-muted-foreground">Week 2 of 6 • 33% complete</p>
            </div>
            <ChevronRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Menu items */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-accent transition-colors text-left"
            >
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Profile;
