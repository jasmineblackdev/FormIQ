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
  Flame,
  Camera,
  Edit2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Target, label: "Goals & Program", desc: "Build Muscle • Intermediate", route: "/settings/goals" },
  { icon: Dumbbell, label: "Workout Preferences", desc: "5 days/week • 45 min", route: "/settings/preferences" },
  { icon: Bell, label: "Notifications", desc: "Reminders enabled", route: "/settings/notifications" },
  { icon: Shield, label: "Privacy & Data", desc: "Manage your data", route: "/settings/privacy" },
  { icon: HelpCircle, label: "Help & Support", desc: "FAQ & Contact", route: "/settings/help" },
];

const achievements = [
  { emoji: "🔥", label: "10 Day Streak" },
  { emoji: "💪", label: "First PR" },
  { emoji: "🎯", label: "Perfect Form" },
  { emoji: "🏆", label: "Week 2 Done" },
];

const Profile = () => {
  const navigate = useNavigate();

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
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Camera className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">Alex Johnson</h1>
              <button className="p-1">
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">Member since Jan 2026</p>
          </div>
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

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Achievements</h3>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {achievements.map((achievement, i) => (
              <div 
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border min-w-[80px]"
              >
                <span className="text-2xl">{achievement.emoji}</span>
                <span className="text-[10px] text-muted-foreground text-center">{achievement.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current program */}
        <button 
          onClick={() => navigate('/program')}
          className="w-full p-4 rounded-xl bg-primary/10 border border-primary/20 text-left"
        >
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
        </button>

        {/* Menu items */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
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
