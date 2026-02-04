import { useState } from "react";
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
  const [currentState, setCurrentState] = useState<HomeState>("first-day");

  const renderHomeState = () => {
    switch (currentState) {
      case "first-day":
        return <HomeFirstDay onStartWorkout={() => console.log("Start workout")} />;
      case "mid-program":
        return <HomeMidProgram onStartWorkout={() => console.log("Start workout")} />;
      case "rest-day":
        return <HomeRestDay onViewNextWorkout={() => console.log("View next workout")} />;
      case "completed":
        return <HomeCompleted onViewSummary={() => console.log("View summary")} />;
      case "custom-empty":
        return (
          <HomeCustomEmpty 
            onStartWorkout={() => console.log("Start workout")} 
            onBrowseExercises={() => console.log("Browse exercises")}
          />
        );
      case "custom-active":
        return (
          <HomeCustomActive 
            onStartWorkout={() => console.log("Start workout")} 
            onBrowseExercises={() => console.log("Browse exercises")}
          />
        );
      default:
        return <HomeFirstDay />;
    }
  };

  return (
    <AppLayout>
      {/* State selector for demo purposes */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
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
