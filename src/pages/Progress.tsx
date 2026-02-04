import { AppLayout } from "@/components/layout/AppLayout";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import { TrendingUp, Calendar, Flame, Trophy, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const weeklyData = [
  { day: "Mon", score: 85, completed: true },
  { day: "Tue", score: 88, completed: true },
  { day: "Wed", score: 0, completed: false, rest: true },
  { day: "Thu", score: 91, completed: true },
  { day: "Fri", score: 0, completed: false },
  { day: "Sat", score: 0, completed: false },
  { day: "Sun", score: 0, completed: false },
];

const topExercises = [
  { name: "Barbell Curls", score: 94, trend: "+3" },
  { name: "Bench Press", score: 92, trend: "+5" },
  { name: "Overhead Press", score: 91, trend: "+2" },
  { name: "Barbell Rows", score: 88, trend: "+1" },
];

const recentPRs = [
  { exercise: "Bench Press", value: "225 lbs", date: "Today" },
  { exercise: "Squat", value: "315 lbs", date: "Yesterday" },
  { exercise: "Deadlift", value: "365 lbs", date: "3 days ago" },
];

const Progress = () => {
  const averageScore = 88;
  const totalWorkouts = 24;
  const currentStreak = 5;

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
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
          <p className="text-muted-foreground text-sm">Track your form improvement over time</p>
        </div>

        {/* Main stats */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <ProgressRing progress={averageScore} size={100} strokeWidth={8}>
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">{averageScore}</span>
                <span className="text-xs text-muted-foreground block">Avg</span>
              </div>
            </ProgressRing>

            <div className="flex-1 ml-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-foreground">{totalWorkouts}</p>
                <p className="text-xs text-muted-foreground">Total Workouts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">🔥 {currentStreak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly overview */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            This Week
          </h3>
          <div className="flex justify-between gap-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
                <div 
                  className={cn(
                    "h-12 rounded-lg flex items-center justify-center text-xs font-bold",
                    day.completed && "bg-primary text-primary-foreground",
                    day.rest && "bg-secondary text-muted-foreground",
                    !day.completed && !day.rest && "bg-muted/50 text-muted-foreground"
                  )}
                >
                  {day.completed ? day.score : day.rest ? "R" : "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top exercises */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Best Form Scores
            </h3>
          </div>
          <div className="space-y-2">
            {topExercises.map((exercise, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <span className="font-medium text-foreground">{exercise.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-success font-medium">{exercise.trend}</span>
                  <FormScoreBadge score={exercise.score} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent PRs */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Trophy className="h-4 w-4 text-warning" />
            Recent PRs
          </h3>
          <div className="space-y-2">
            {recentPRs.map((pr, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border"
              >
                <div>
                  <p className="font-medium text-foreground">{pr.exercise}</p>
                  <p className="text-xs text-muted-foreground">{pr.date}</p>
                </div>
                <span className="text-lg font-bold text-primary">{pr.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Progress;
