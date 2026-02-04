import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Play,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Video,
  Calendar,
  Archive,
  Flame,
  Target,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";

const recentAnalyses = [
  { 
    exercise: "Bench Press", 
    score: 92, 
    date: "Today, 2:30 PM",
    feedback: "Excellent bar path and control",
    improvements: ["Keep elbows at 45°"],
    videoUrl: "#"
  },
  { 
    exercise: "Squat", 
    score: 78, 
    date: "Today, 2:15 PM",
    feedback: "Good depth, watch knee tracking",
    improvements: ["Push knees out more", "Keep chest up"],
    videoUrl: "#"
  },
  { 
    exercise: "Deadlift", 
    score: 85, 
    date: "Yesterday",
    feedback: "Strong lockout position",
    improvements: ["Start with hips slightly lower"],
    videoUrl: "#"
  },
];

const archivedVideos = [
  { exercise: "Bench Press", date: "Jan 28", score: 88, duration: "0:45" },
  { exercise: "Squat", date: "Jan 26", score: 75, duration: "1:20" },
  { exercise: "Overhead Press", date: "Jan 24", score: 82, duration: "0:55" },
  { exercise: "Deadlift", date: "Jan 22", score: 90, duration: "1:05" },
  { exercise: "Barbell Row", date: "Jan 20", score: 79, duration: "0:50" },
];

const formInsights = [
  { label: "Excellent", count: 12, color: "bg-score-excellent" },
  { label: "Good", count: 8, color: "bg-score-good" },
  { label: "Fair", count: 4, color: "bg-score-fair" },
  { label: "Needs Work", count: 2, color: "bg-score-poor" },
];

const weeklyProgress = [
  { day: "M", score: 82, active: true },
  { day: "T", score: 78, active: true },
  { day: "W", score: 85, active: true },
  { day: "T", score: 0, active: false },
  { day: "F", score: 88, active: true },
  { day: "S", score: 0, active: false },
  { day: "S", score: 0, active: false },
];

const Analyze = () => {
  const overallScore = 86;
  const totalWorkouts = 18;
  const totalVolume = "24,500";
  const personalRecords = 3;

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
            <h1 className="text-2xl font-bold text-foreground">Analyze</h1>
            <p className="text-muted-foreground text-sm">Form insights & progress</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="insights" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6 mt-4">
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
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6 mt-4">
            {/* Stats overview */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xl font-bold text-foreground">{totalWorkouts}</p>
                <p className="text-xs text-muted-foreground">Workouts</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-2">
                  <Target className="h-5 w-5 text-success" />
                </div>
                <p className="text-xl font-bold text-foreground">{totalVolume}</p>
                <p className="text-xs text-muted-foreground">Total lbs</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-5 w-5 text-warning" />
                </div>
                <p className="text-xl font-bold text-foreground">{personalRecords}</p>
                <p className="text-xs text-muted-foreground">PRs</p>
              </div>
            </div>

            {/* Weekly activity */}
            <div className="p-5 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">This Week</h3>
                <span className="text-sm text-muted-foreground">4 of 5 days</span>
              </div>
              <div className="flex justify-between">
                {weeklyProgress.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className={cn(
                        "h-12 w-8 rounded-lg flex items-end justify-center pb-1",
                        day.active ? "bg-primary/20" : "bg-muted"
                      )}
                    >
                      {day.active && (
                        <div 
                          className="w-6 rounded-t bg-primary transition-all"
                          style={{ height: `${(day.score / 100) * 40}px` }}
                        />
                      )}
                    </div>
                    <span className={cn(
                      "text-xs font-medium",
                      day.active ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form score trend */}
            <div className="p-5 rounded-2xl bg-card border border-border space-y-4">
              <h3 className="font-semibold text-foreground">Form Score Trend</h3>
              <div className="flex items-end justify-between h-24 gap-2">
                {[72, 75, 78, 82, 80, 85, 86].map((score, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-primary rounded-t transition-all"
                      style={{ height: `${(score / 100) * 80}px` }}
                    />
                    <span className="text-[10px] text-muted-foreground">W{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">+14 pts improvement</span>
              </div>
            </div>
          </TabsContent>

          {/* Archive Tab */}
          <TabsContent value="archive" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Video Archive</h3>
              </div>
              <span className="text-sm text-muted-foreground">{archivedVideos.length} videos</span>
            </div>

            <div className="space-y-3">
              {archivedVideos.map((video, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-card border border-border flex items-center gap-4"
                >
                  {/* Video thumbnail placeholder */}
                  <div className="h-16 w-24 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 relative">
                    <Video className="h-6 w-6 text-muted-foreground" />
                    <span className="absolute bottom-1 right-1 text-[10px] bg-background/80 px-1 rounded">
                      {video.duration}
                    </span>
                  </div>

                  {/* Video info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{video.exercise}</p>
                    <p className="text-xs text-muted-foreground">{video.date}</p>
                  </div>

                  {/* Score */}
                  <FormScoreBadge score={video.score} size="sm" />

                  {/* Play button */}
                  <Button variant="ghost" size="icon" className="text-primary shrink-0">
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Load More Videos
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Analyze;
