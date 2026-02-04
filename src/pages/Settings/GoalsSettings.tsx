import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Target, 
  Flame, 
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const goals = [
  { 
    id: "muscle", 
    icon: Flame, 
    label: "Build Muscle", 
    desc: "Focus on hypertrophy and strength gains"
  },
  { 
    id: "strength", 
    icon: TrendingUp, 
    label: "Get Stronger", 
    desc: "Increase max lifts and power"
  },
  { 
    id: "lose-fat", 
    icon: Target, 
    label: "Lose Fat", 
    desc: "Burn calories and lean out"
  },
  { 
    id: "maintain", 
    icon: CheckCircle2, 
    label: "Stay Fit", 
    desc: "Maintain current fitness level"
  },
];

const experienceLevels = [
  { id: "beginner", label: "Beginner", desc: "Less than 6 months" },
  { id: "intermediate", label: "Intermediate", desc: "6 months - 2 years" },
  { id: "advanced", label: "Advanced", desc: "2+ years" },
];

const GoalsSettings = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState("muscle");
  const [selectedLevel, setSelectedLevel] = useState("intermediate");

  return (
    <AppLayout hideProgress>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Goals & Program</h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-8">
          {/* Primary Goal */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Primary Goal</h2>
              <p className="text-sm text-muted-foreground">What are you training for?</p>
            </div>

            <div className="grid gap-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                    selectedGoal === goal.id 
                      ? "bg-primary/10 border-primary" 
                      : "bg-card border-border hover:border-primary/30"
                  )}
                >
                  <div className={cn(
                    "h-12 w-12 rounded-lg flex items-center justify-center",
                    selectedGoal === goal.id ? "bg-primary" : "bg-secondary"
                  )}>
                    <goal.icon className={cn(
                      "h-6 w-6",
                      selectedGoal === goal.id ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{goal.label}</p>
                    <p className="text-sm text-muted-foreground">{goal.desc}</p>
                  </div>
                  {selectedGoal === goal.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Experience Level</h2>
              <p className="text-sm text-muted-foreground">How long have you been training?</p>
            </div>

            <div className="grid gap-3">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all",
                    selectedLevel === level.id 
                      ? "bg-primary/10 border-primary" 
                      : "bg-card border-border hover:border-primary/30"
                  )}
                >
                  <div>
                    <p className="font-medium text-foreground">{level.label}</p>
                    <p className="text-sm text-muted-foreground">{level.desc}</p>
                  </div>
                  {selectedLevel === level.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Current Program */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Current Program</h2>
              <p className="text-sm text-muted-foreground">Based on your goals</p>
            </div>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <Flame className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Push/Pull/Legs</p>
                  <p className="text-xs text-muted-foreground">6-Week Intermediate Program</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                A balanced 6-day split optimized for muscle building. 
                You're currently on Week 2, Day 6.
              </p>
            </div>

            <Button variant="outline" className="w-full">
              Change Program
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GoalsSettings;
