import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { 
  Sparkles, 
  Play,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Video,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const recentAnalyses = [
  { 
    exercise: "Bench Press", 
    score: 92, 
    date: "Today, 2:30 PM",
    feedback: "Excellent bar path and control",
    improvements: ["Keep elbows at 45°"]
  },
  { 
    exercise: "Squat", 
    score: 78, 
    date: "Today, 2:15 PM",
    feedback: "Good depth, watch knee tracking",
    improvements: ["Push knees out more", "Keep chest up"]
  },
  { 
    exercise: "Deadlift", 
    score: 85, 
    date: "Yesterday",
    feedback: "Strong lockout position",
    improvements: ["Start with hips slightly lower"]
  },
];

const formInsights = [
  { label: "Excellent", count: 12, color: "bg-score-excellent" },
  { label: "Good", count: 8, color: "bg-score-good" },
  { label: "Fair", count: 4, color: "bg-score-fair" },
  { label: "Needs Work", count: 2, color: "bg-score-poor" },
];

const Analyze = () => {
  const overallScore = 86;

  return (
    <AppLayout
      programInfo={{
        programName: "Push/Pull/Legs",
        currentWeek: 2,
        totalWeeks: 6,
        currentDay: 6,
        totalDays: 18,
      }}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Form Analysis</h1>
            <p className="text-muted-foreground text-sm">AI-powered movement insights</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Overall form score */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-6">
            <ProgressRing progress={overallScore} size={100} strokeWidth={8}>
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">{overallScore}</span>
                <span className="text-xs text-muted-foreground block">Overall</span>
              </div>
            </ProgressRing>
            
            <div className="flex-1 space-y-3">
              <div>
                <p className="font-semibold text-foreground">Your Form Score</p>
                <p className="text-sm text-muted-foreground">Based on 26 analyzed sets</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">+5 pts</span>
                <span className="text-muted-foreground">from last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form distribution */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Form Distribution</h3>
          <div className="flex gap-2 h-3 rounded-full overflow-hidden">
            {formInsights.map((insight, i) => (
              <div 
                key={i}
                className={cn("transition-all", insight.color)}
                style={{ flex: insight.count }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {formInsights.map((insight, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className={cn("h-2 w-2 rounded-full", insight.color)} />
                <span>{insight.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2 border-primary/30 hover:bg-primary/10"
          >
            <Video className="h-5 w-5 text-primary" />
            <span className="text-sm">Record New</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
          >
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">View History</span>
          </Button>
        </div>

        {/* Recent analyses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Analyses</h3>
            <button className="text-sm text-primary font-medium flex items-center gap-1">
              See all <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentAnalyses.map((analysis, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-card border border-border space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{analysis.exercise}</p>
                    <p className="text-xs text-muted-foreground">{analysis.date}</p>
                  </div>
                  <FormScoreBadge score={analysis.score} size="sm" />
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{analysis.feedback}</span>
                </div>

                {analysis.improvements.length > 0 && (
                  <div className="space-y-1.5">
                    {analysis.improvements.map((improvement, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{improvement}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="ghost" size="sm" className="w-full gap-2 text-primary">
                  <Play className="h-4 w-4" />
                  Watch Analysis
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analyze;
