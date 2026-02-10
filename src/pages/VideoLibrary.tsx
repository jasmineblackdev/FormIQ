import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import {
  Video,
  Search,
  Play,
  Trash2,
  Calendar,
  Filter,
  SortDesc,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface VideoRecord {
  id: string;
  exercise: string;
  date: string;
  score: number;
  duration: string;
  reps: number;
  weight: string;
  muscle: string;
}

const allVideos: VideoRecord[] = [
  { id: "1", exercise: "Bench Press", date: "Feb 10, 2026", score: 92, duration: "0:45", reps: 8, weight: "185 lbs", muscle: "Chest" },
  { id: "2", exercise: "Squat", date: "Feb 10, 2026", score: 78, duration: "1:20", reps: 6, weight: "225 lbs", muscle: "Legs" },
  { id: "3", exercise: "Deadlift", date: "Feb 9, 2026", score: 85, duration: "1:05", reps: 5, weight: "275 lbs", muscle: "Back" },
  { id: "4", exercise: "Overhead Press", date: "Feb 9, 2026", score: 88, duration: "0:55", reps: 8, weight: "115 lbs", muscle: "Shoulders" },
  { id: "5", exercise: "Barbell Rows", date: "Feb 8, 2026", score: 82, duration: "0:50", reps: 8, weight: "155 lbs", muscle: "Back" },
  { id: "6", exercise: "Bench Press", date: "Feb 7, 2026", score: 88, duration: "0:42", reps: 10, weight: "175 lbs", muscle: "Chest" },
  { id: "7", exercise: "Squat", date: "Feb 6, 2026", score: 75, duration: "1:15", reps: 8, weight: "205 lbs", muscle: "Legs" },
  { id: "8", exercise: "Romanian Deadlift", date: "Feb 6, 2026", score: 90, duration: "0:58", reps: 10, weight: "185 lbs", muscle: "Legs" },
  { id: "9", exercise: "Incline Dumbbell Press", date: "Feb 5, 2026", score: 87, duration: "0:40", reps: 10, weight: "65 lbs", muscle: "Chest" },
  { id: "10", exercise: "Lat Pulldowns", date: "Feb 4, 2026", score: 91, duration: "0:35", reps: 12, weight: "120 lbs", muscle: "Back" },
];

const muscleFilters = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms"];

const VideoLibrary = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "score">("date");

  const filteredVideos = allVideos
    .filter((v) => {
      const matchSearch = v.exercise.toLowerCase().includes(search.toLowerCase());
      const matchMuscle = selectedMuscle === "All" || v.muscle === selectedMuscle;
      return matchSearch && matchMuscle;
    })
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      return 0; // already sorted by date
    });

  const totalVideos = allVideos.length;
  const avgScore = Math.round(allVideos.reduce((acc, v) => acc + v.score, 0) / totalVideos);

  return (
    <AppLayout hideProgress>
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Video Library</h1>
            <p className="text-muted-foreground text-sm">{totalVideos} recordings saved</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Video className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex gap-3">
          <div className="flex-1 p-3 rounded-2xl bg-card border border-border text-center">
            <p className="text-xl font-bold text-foreground">{totalVideos}</p>
            <p className="text-[10px] text-muted-foreground">Total Videos</p>
          </div>
          <div className="flex-1 p-3 rounded-2xl bg-card border border-border text-center">
            <p className="text-xl font-bold text-primary">{avgScore}</p>
            <p className="text-[10px] text-muted-foreground">Avg Score</p>
          </div>
          <div className="flex-1 p-3 rounded-2xl bg-card border border-border text-center">
            <p className="text-xl font-bold text-success">+7</p>
            <p className="text-[10px] text-muted-foreground">Score Trend</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recordings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border rounded-xl h-11"
          />
        </div>

        {/* Filters row */}
        <div className="space-y-3">
          {/* Muscle filters */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {muscleFilters.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
                  selectedMuscle === muscle
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                )}
              >
                {muscle}
              </button>
            ))}
          </div>

          {/* Sort toggle */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{filteredVideos.length} videos</p>
            <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setSortBy("date")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  sortBy === "date" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                )}
              >
                <Calendar className="h-3 w-3" />
                Recent
              </button>
              <button
                onClick={() => setSortBy("score")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  sortBy === "score" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                )}
              >
                <SortDesc className="h-3 w-3" />
                Best Score
              </button>
            </div>
          </div>
        </div>

        {/* Video list */}
        <div className="space-y-3">
          {filteredVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => navigate("/form-feedback", {
                state: { exercise: video.exercise, duration: video.duration }
              })}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all text-left active:scale-[0.98]"
            >
              {/* Thumbnail */}
              <div className="h-16 w-24 rounded-xl bg-secondary flex items-center justify-center shrink-0 relative overflow-hidden">
                <Play className="h-6 w-6 text-muted-foreground" />
                <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-background/80 px-1.5 py-0.5 rounded-md text-foreground">
                  {video.duration}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{video.exercise}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{video.reps} reps</span>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="text-xs text-muted-foreground">{video.weight}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground/60" />
                  <span className="text-[11px] text-muted-foreground/60">{video.date}</span>
                </div>
              </div>

              {/* Score */}
              <FormScoreBadge score={video.score} size="sm" />
            </button>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <Video className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground">No recordings found</p>
            <Button variant="outline" onClick={() => navigate("/record")} className="rounded-xl">
              Record Your First Set
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default VideoLibrary;
