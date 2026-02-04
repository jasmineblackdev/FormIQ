import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Clock, Calendar, Trophy, Zap } from "lucide-react";
import { useState } from "react";

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [restDayReminders, setRestDayReminders] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);
  const [formTips, setFormTips] = useState(false);

  return (
    <AppLayout hideProgress>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Notifications</h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Main toggle */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive alerts on your device</p>
                </div>
              </div>
              <Switch checked={true} />
            </div>
          </div>

          {/* Notification types */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Notification Types</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="font-medium">Workout Reminders</Label>
                    <p className="text-xs text-muted-foreground">Daily reminder to workout</p>
                  </div>
                </div>
                <Switch checked={workoutReminders} onCheckedChange={setWorkoutReminders} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-success" />
                  <div>
                    <Label className="font-medium">Rest Day Reminders</Label>
                    <p className="text-xs text-muted-foreground">Recovery tips on rest days</p>
                  </div>
                </div>
                <Switch checked={restDayReminders} onCheckedChange={setRestDayReminders} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-warning" />
                  <div>
                    <Label className="font-medium">Streak Alerts</Label>
                    <p className="text-xs text-muted-foreground">Don't break your streak</p>
                  </div>
                </div>
                <Switch checked={streakAlerts} onCheckedChange={setStreakAlerts} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="font-medium">Progress Updates</Label>
                    <p className="text-xs text-muted-foreground">Weekly progress summaries</p>
                  </div>
                </div>
                <Switch checked={progressUpdates} onCheckedChange={setProgressUpdates} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="font-medium">Form Tips</Label>
                    <p className="text-xs text-muted-foreground">Tips based on your recordings</p>
                  </div>
                </div>
                <Switch checked={formTips} onCheckedChange={setFormTips} />
              </div>
            </div>
          </div>

          {/* Reminder time */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Reminder Time</h2>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Daily Workout Reminder</p>
                  <p className="text-sm text-muted-foreground">When should we remind you?</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-secondary text-foreground font-mono font-medium">
                  6:00 AM
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationSettings;
