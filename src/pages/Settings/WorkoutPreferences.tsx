import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Dumbbell, Volume2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const daysOfWeek = [
  { id: "mon", label: "M", full: "Monday" },
  { id: "tue", label: "T", full: "Tuesday" },
  { id: "wed", label: "W", full: "Wednesday" },
  { id: "thu", label: "T", full: "Thursday" },
  { id: "fri", label: "F", full: "Friday" },
  { id: "sat", label: "S", full: "Saturday" },
  { id: "sun", label: "S", full: "Sunday" },
];

const WorkoutPreferences = () => {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState(["mon", "tue", "wed", "fri", "sat"]);
  const [workoutDuration, setWorkoutDuration] = useState([45]);
  const [restTimer, setRestTimer] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(false);

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  return (
    <AppLayout hideProgress>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Workout Preferences</h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-8">
          {/* Training Days */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Training Days</h2>
                <p className="text-sm text-muted-foreground">{selectedDays.length} days per week</p>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-medium transition-all",
                    selectedDays.includes(day.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workout Duration */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground">Workout Duration</h2>
                <p className="text-sm text-muted-foreground">Target time per session</p>
              </div>
              <span className="text-lg font-bold text-primary">{workoutDuration[0]} min</span>
            </div>

            <div className="px-2">
              <Slider
                value={workoutDuration}
                onValueChange={setWorkoutDuration}
                min={20}
                max={90}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>20 min</span>
                <span>90 min</span>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Available Equipment</h2>
                <p className="text-sm text-muted-foreground">Select what you have access to</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Barbell", "Dumbbells", "Cables", "Machines", "Bodyweight", "Kettlebells"].map((equipment) => (
                <button
                  key={equipment}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {equipment}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Toggles */}
          <div className="space-y-4">
            <h2 className="font-semibold text-foreground">Session Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="font-medium">Rest Timer</Label>
                    <p className="text-xs text-muted-foreground">Auto-start rest countdown</p>
                  </div>
                </div>
                <Switch checked={restTimer} onCheckedChange={setRestTimer} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="font-medium">Sound Effects</Label>
                    <p className="text-xs text-muted-foreground">Audio cues during workout</p>
                  </div>
                </div>
                <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Dumbbell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="font-medium">Auto-Advance</Label>
                    <p className="text-xs text-muted-foreground">Move to next exercise automatically</p>
                  </div>
                </div>
                <Switch checked={autoAdvance} onCheckedChange={setAutoAdvance} />
              </div>
            </div>
          </div>

          <Button className="w-full">Save Preferences</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default WorkoutPreferences;
