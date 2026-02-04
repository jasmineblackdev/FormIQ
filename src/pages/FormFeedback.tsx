import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { 
  Play, 
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Share2,
  Bookmark,
  X,
  TrendingUp,
  Target,
  Zap,
  Save,
  Trash2,
  Archive
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock analysis data
const getAnalysisData = (exerciseName: string, duration: string) => ({
  exercise: exerciseName || "Bench Press",
  overallScore: 85,
  previousScore: 78,
  date: "Just now",
  duration: duration || "0:45",
  reps: 8,
  weight: "135 lbs",
  highlights: [
    { type: "success", text: "Excellent bar path control" },
    { type: "success", text: "Good tempo on eccentric" },
    { type: "warning", text: "Elbows flaring slightly at bottom" },
    { type: "warning", text: "Uneven lockout on rep 6" },
  ],
  repBreakdown: [
    { rep: 1, score: 92, note: "Perfect" },
    { rep: 2, score: 88, note: "Good" },
    { rep: 3, score: 90, note: "Great" },
    { rep: 4, score: 85, note: "Good" },
    { rep: 5, score: 82, note: "Elbow flare" },
    { rep: 6, score: 75, note: "Uneven lockout" },
    { rep: 7, score: 84, note: "Good" },
    { rep: 8, score: 88, note: "Strong finish" },
  ],
  tips: [
    {
      title: "Fix Elbow Position",
      description: "Keep elbows at a 45° angle to your torso throughout the movement. This protects your shoulders and engages your chest more effectively.",
      priority: "high"
    },
    {
      title: "Even Lockout",
      description: "Focus on pressing both arms evenly. Try a lighter weight to build symmetry before progressing.",
      priority: "medium"
    },
    {
      title: "Maintain Tempo",
      description: "Your eccentric (lowering) phase was excellent. Keep this controlled 2-3 second descent.",
      priority: "low"
    }
  ]
});

const FormFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRep, setSelectedRep] = useState<number | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [hasShownDialog, setHasShownDialog] = useState(false);
  
  // Get data from navigation state
  const exerciseName = location.state?.exercise || "Bench Press";
  const duration = location.state?.duration || "0:45";
  
  const analysisData = getAnalysisData(exerciseName, duration);
  const improvement = analysisData.overallScore - analysisData.previousScore;

  const handleClose = () => {
    if (!hasShownDialog) {
      setShowSaveDialog(true);
      setHasShownDialog(true);
    } else {
      navigate(-1);
    }
  };

  const handleSaveToArchive = () => {
    toast.success("Video saved to archive!", {
      description: `${analysisData.exercise} - Score: ${analysisData.overallScore}`,
      action: {
        label: "View",
        onClick: () => navigate('/analyze', { state: { tab: 'archive' } })
      }
    });
    setShowSaveDialog(false);
    navigate('/analyze', { state: { tab: 'archive' } });
  };

  const handleDiscardVideo = () => {
    toast.info("Video discarded");
    setShowSaveDialog(false);
    navigate(-1);
  };

  const handleRecordAnother = () => {
    if (!hasShownDialog) {
      setShowSaveDialog(true);
      setHasShownDialog(true);
    } else {
      navigate('/record');
    }
  };

  const handleRecordAnotherAfterSave = () => {
    toast.success("Video saved to archive!");
    setShowSaveDialog(false);
    navigate('/record');
  };

  return (
    <AppLayout hideProgress>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={handleClose} className="p-2 -ml-2">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Form Analysis</h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  handleSaveToArchive();
                }}
                className="p-2"
              >
                <Bookmark className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 -mr-2">
                <Share2 className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Video Player Area */}
          <div className="relative aspect-video bg-black/90 rounded-2xl overflow-hidden">
            {/* Placeholder video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </div>
                <p className="text-white/60 text-sm">{analysisData.duration}</p>
              </div>
            </div>

            {/* Video controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  )}
                </button>
                
                {/* Progress bar */}
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
                
                <button className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Rep markers */}
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              {analysisData.repBreakdown.map((rep, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedRep(i)}
                  className={cn(
                    "h-6 w-6 rounded-full text-xs font-bold flex items-center justify-center transition-all",
                    selectedRep === i 
                      ? "bg-primary text-primary-foreground scale-110" 
                      : rep.score >= 85 
                        ? "bg-success/80 text-white" 
                        : rep.score >= 75 
                          ? "bg-warning/80 text-white"
                          : "bg-destructive/80 text-white"
                  )}
                >
                  {rep.rep}
                </button>
              ))}
            </div>
          </div>

          {/* Score Summary Card */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-5">
              <ProgressRing progress={analysisData.overallScore} size={90} strokeWidth={7}>
                <div className="text-center">
                  <span className="text-xl font-bold text-foreground">{analysisData.overallScore}</span>
                </div>
              </ProgressRing>
              
              <div className="flex-1 space-y-2">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{analysisData.exercise}</h2>
                  <p className="text-sm text-muted-foreground">
                    {analysisData.reps} reps @ {analysisData.weight}
                  </p>
                </div>
                
                {improvement > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10">
                    <TrendingUp className="h-3.5 w-3.5 text-success" />
                    <span className="text-xs font-medium text-success">
                      +{improvement} pts from last time
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Key Highlights</h3>
            <div className="space-y-2">
              {analysisData.highlights.map((highlight, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl",
                    highlight.type === "success" ? "bg-success/10" : "bg-warning/10"
                  )}
                >
                  {highlight.type === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  )}
                  <span className={cn(
                    "text-sm",
                    highlight.type === "success" ? "text-success" : "text-warning"
                  )}>
                    {highlight.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rep-by-Rep Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Rep Breakdown</h3>
              <span className="text-xs text-muted-foreground">Tap to view</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {analysisData.repBreakdown.map((rep, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedRep(i)}
                  className={cn(
                    "flex-shrink-0 p-3 rounded-xl border transition-all text-center min-w-[70px]",
                    selectedRep === i 
                      ? "bg-primary/10 border-primary" 
                      : "bg-card border-border"
                  )}
                >
                  <FormScoreBadge score={rep.score} size="sm" />
                  <p className="text-xs text-muted-foreground mt-2">Rep {rep.rep}</p>
                  <p className="text-[10px] text-muted-foreground/70">{rep.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Improvement Tips */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">How to Improve</h3>
            </div>
            <div className="space-y-3">
              {analysisData.tips.map((tip, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-xl bg-card border border-border space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Target className={cn(
                        "h-4 w-4",
                        tip.priority === "high" ? "text-destructive" :
                        tip.priority === "medium" ? "text-warning" : "text-success"
                      )} />
                      <h4 className="font-medium text-foreground">{tip.title}</h4>
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full",
                      tip.priority === "high" ? "bg-destructive/10 text-destructive" :
                      tip.priority === "medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                    )}>
                      {tip.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button 
              className="w-full gap-2 gradient-primary"
              onClick={() => handleSaveToArchive()}
            >
              <Archive className="h-4 w-4" />
              Save to Archive
            </Button>
            <Button 
              className="w-full gap-2"
              variant="outline"
              onClick={handleRecordAnother}
            >
              <RotateCcw className="h-4 w-4" />
              Record Another Set
            </Button>
            <Button 
              variant="ghost" 
              className="w-full gap-2"
              onClick={() => navigate('/active-workout')}
            >
              Back to Workout
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Save Video Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Save className="h-5 w-5 text-primary" />
              Save Recording?
            </DialogTitle>
            <DialogDescription>
              Would you like to save this recording to your archive for future reference?
            </DialogDescription>
          </DialogHeader>
          
          {/* Preview */}
          <div className="p-4 rounded-xl bg-secondary/50 flex items-center gap-4">
            <div className="h-16 w-20 rounded-lg bg-black/80 flex items-center justify-center">
              <Play className="h-6 w-6 text-white/60" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{analysisData.exercise}</p>
              <p className="text-sm text-muted-foreground">{analysisData.duration} • {analysisData.reps} reps</p>
            </div>
            <FormScoreBadge score={analysisData.overallScore} size="sm" />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button 
              className="w-full gap-2 gradient-primary" 
              onClick={handleSaveToArchive}
            >
              <Archive className="h-4 w-4" />
              Save to Archive
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={handleRecordAnotherAfterSave}
            >
              <Save className="h-4 w-4" />
              Save & Record Another
            </Button>
            <Button 
              variant="ghost" 
              className="w-full gap-2 text-destructive hover:text-destructive"
              onClick={handleDiscardVideo}
            >
              <Trash2 className="h-4 w-4" />
              Discard Video
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default FormFeedback;
