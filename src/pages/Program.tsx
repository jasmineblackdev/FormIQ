import { AppLayout } from "@/components/layout/AppLayout";
import { ProgramProgress } from "@/components/workout/ProgramProgress";
import { ChevronLeft, ChevronRight, Check, Flame } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const programSchedule = [
  { day: 1, name: "Push Day", completed: true, score: 85 },
  { day: 2, name: "Pull Day", completed: true, score: 88 },
  { day: 3, name: "Leg Day", completed: true, score: 82 },
  { day: 4, name: "Rest", completed: true, rest: true },
  { day: 5, name: "Push Day", completed: true, score: 91 },
  { day: 6, name: "Pull Day", completed: false, today: true },
  { day: 7, name: "Leg Day", completed: false },
  { day: 8, name: "Rest", completed: false, rest: true },
];

const calendarDays = [
  { date: 27, month: "prev" },
  { date: 28, month: "prev" },
  { date: 29, month: "prev" },
  { date: 30, month: "prev" },
  { date: 31, month: "prev" },
  { date: 1, workout: "Push", completed: true },
  { date: 2, rest: true },
  { date: 3, workout: "Pull", completed: true },
  { date: 4, workout: "Leg", completed: true },
  { date: 5, rest: true },
  { date: 6, workout: "Push", completed: true },
  { date: 7, workout: "Pull", today: true },
  { date: 8, workout: "Leg" },
  { date: 9, rest: true },
  { date: 10, workout: "Push" },
  { date: 11, workout: "Pull" },
  { date: 12, workout: "Leg" },
  { date: 13, rest: true },
  { date: 14, rest: true },
  { date: 15, workout: "Push" },
  { date: 16, workout: "Pull" },
  { date: 17, workout: "Leg" },
  { date: 18, rest: true },
  { date: 19, workout: "Push" },
  { date: 20, workout: "Pull" },
  { date: 21, workout: "Leg" },
  { date: 22, rest: true },
  { date: 23, rest: true },
  { date: 24, workout: "Push" },
  { date: 25, workout: "Pull" },
  { date: 26, workout: "Leg" },
  { date: 27, rest: true },
  { date: 28, workout: "Push" },
  { date: 29, month: "next" },
  { date: 30, month: "next" },
];

const Program = () => {
  const [currentMonth] = useState("February 2026");

  return (
    <AppLayout>
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Flame className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Push/Pull/Legs</h1>
            <p className="text-sm text-muted-foreground">6-Week Intermediate Program</p>
          </div>
        </div>

        {/* Progress */}
        <ProgramProgress
          currentWeek={2}
          totalWeeks={6}
          currentDay={6}
          totalDays={36}
        />

        {/* Calendar */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <span className="font-semibold text-foreground">{currentMonth}</span>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div key={i} className="text-center text-xs text-muted-foreground font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-lg text-xs relative",
                  day.month && "text-muted-foreground/40",
                  day.today && "bg-primary text-primary-foreground",
                  day.completed && !day.today && "bg-success/20",
                  day.rest && !day.month && "bg-secondary",
                  day.workout && !day.completed && !day.today && "border border-border"
                )}
              >
                <span className="font-medium">{day.date}</span>
                {day.workout && (
                  <span className={cn(
                    "text-[8px] mt-0.5",
                    day.today ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {day.workout}
                  </span>
                )}
                {day.completed && !day.today && (
                  <Check className="absolute h-2.5 w-2.5 text-success top-0.5 right-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule list */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">This Week</h3>
          <div className="space-y-2">
            {programSchedule.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border",
                  day.today && "bg-primary/10 border-primary/30",
                  day.completed && !day.today && "bg-card border-border opacity-70",
                  !day.completed && !day.today && "bg-card border-border"
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold",
                  day.completed && "bg-success text-success-foreground",
                  day.today && "bg-primary text-primary-foreground",
                  day.rest && !day.completed && "bg-secondary text-muted-foreground",
                  !day.completed && !day.today && !day.rest && "bg-muted text-muted-foreground"
                )}>
                  {day.completed ? <Check className="h-4 w-4" /> : day.day}
                </div>
                <div className="flex-1">
                  <p className={cn(
                    "font-medium",
                    day.today ? "text-primary" : "text-foreground"
                  )}>
                    {day.name}
                  </p>
                  {day.today && (
                    <p className="text-xs text-primary">Today</p>
                  )}
                </div>
                {day.score && (
                  <span className="text-sm font-bold text-foreground">{day.score}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Program;
