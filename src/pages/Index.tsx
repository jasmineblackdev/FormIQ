import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomeFirstDay } from "@/components/home/HomeFirstDay";
import { HomeMidProgram } from "@/components/home/HomeMidProgram";
import { HomeRestDay } from "@/components/home/HomeRestDay";
import { HomeCompleted } from "@/components/home/HomeCompleted";
import { HomeCustomEmpty } from "@/components/home/HomeCustomEmpty";
import { HomeCustomActive } from "@/components/home/HomeCustomActive";
import { cn } from "@/lib/utils";

type HomeState = "first-day" | "mid-program" | "rest-day" | "completed" | "custom-empty" | "custom-active";

const stateLabels: Record<HomeState, string> = {
  "first-day": "First Day",
  "mid-program": "Mid-Program",
  "rest-day": "Rest Day",
  "completed": "Completed",
  "custom-empty": "Custom Empty",
  "custom-active": "Custom Active",
};

const Index = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<HomeState>("first-day");

  const handleStartWorkout = () => {
    navigate("/active-workout");
  };

  // Program info based on current state
  const getProgramInfo = () => {
    switch (currentState) {
      case "first-day":
        return { currentWeek: 1, totalWeeks: 6, currentDay: 1, totalDays: 18, isRestDay: false };
      case "mid-program":
        return { currentWeek: 3, totalWeeks: 6, currentDay: 8, totalDays: 18, isRestDay: false };
      case "rest-day":
        return { currentWeek: 2, totalWeeks: 6, currentDay: 4, totalDays: 18, isRestDay: true };
      case "completed":
        return { currentWeek: 2, totalWeeks: 6, currentDay: 5, totalDays: 18, isRestDay: false };
      case "custom-empty":
      case "custom-active":
        return undefined; // No program for custom path
      default:
        return { currentWeek: 1, totalWeeks: 6, currentDay: 1, totalDays: 18, isRestDay: false };
    }
  };

  const renderHomeState = () => {
    switch (currentState) {
      case "first-day":
        return <HomeFirstDay onStartWorkout={handleStartWorkout} />;
      case "mid-program":
        return <HomeMidProgram onStartWorkout={handleStartWorkout} />;
      case "rest-day":
        return <HomeRestDay onViewNextWorkout={() => console.log("View next workout")} />;
      case "completed":
        return <HomeCompleted onViewSummary={() => console.log("View summary")} />;
      case "custom-empty":
        return (
          <HomeCustomEmpty 
            onStartWorkout={handleStartWorkout} 
            onBrowseExercises={() => navigate("/exercises")}
          />
        );
      case "custom-active":
        return (
          <HomeCustomActive 
            onStartWorkout={handleStartWorkout} 
            onBrowseExercises={() => navigate("/exercises")}
          />
        );
      default:
        return <HomeFirstDay />;
    }
  };

  const programInfo = getProgramInfo();
  const isCustomPath = currentState === "custom-empty" || currentState === "custom-active";

  return (
    <AppLayout 
      hideProgress={isCustomPath}
      programInfo={programInfo}
    >
      {/* State selector for demo purposes */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="px-4 py-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Demo: Home Screen States</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {(Object.keys(stateLabels) as HomeState[]).map((state) => (
              <button
                key={state}
                onClick={() => setCurrentState(state)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                  currentState === state
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                )}
              >
                {stateLabels[state]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current home state */}
      {renderHomeState()}
    </AppLayout>
  );
};

export default Index;
