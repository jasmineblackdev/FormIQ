import { Button } from "@/components/ui/button";
import { FormScoreBadge } from "@/components/ui/FormScoreBadge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  Dumbbell, 
  Plus, 
  Play, 
  TrendingUp, 
  Target,
  CheckCircle2,
  Video,
  Volume2,
  VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  targetMuscle: string;
  lastFormScore?: number;
  description?: string;
  tips?: string[];
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
}

interface ExerciseDetailSheetProps {
  exercise: Exercise | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToWorkout?: (exercise: Exercise) => void;
  onRecordForm?: (exercise: Exercise) => void;
}

interface ExerciseData {
  description: string;
  howToPerform: string[];
  tips: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  videoUrl: string;
  videoPoster: string;
}

const exerciseDetails: Record<string, ExerciseData> = {
  "Bench Press": {
    description: "A compound pushing movement that primarily targets the chest, shoulders, and triceps. The barbell bench press is a foundational strength exercise and one of the 'big three' powerlifting movements.",
    howToPerform: [
      "Lie flat on the bench with your eyes directly under the bar",
      "Grip the bar slightly wider than shoulder-width apart",
      "Unrack the bar and position it over your chest with arms extended",
      "Lower the bar in a controlled motion to your mid-chest",
      "Press the bar back up by extending your arms, keeping elbows at 45°",
      "Lock out at the top and repeat for the desired number of reps"
    ],
    tips: [
      "Keep shoulder blades pinched together throughout",
      "Maintain a slight arch in your lower back",
      "Drive feet into the floor for stability",
      "Control the descent – don't bounce off your chest"
    ],
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Front Deltoids", "Serratus Anterior"],
    videoUrl: "https://player.vimeo.com/external/433550978.hd.mp4?s=73b53c1c72aeb0dbce12a70af0c49c25c3bf11c2&profile_id=175",
    videoPoster: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop"
  },
  "Squat": {
    description: "The king of lower body exercises. Squats target your quads, hamstrings, and glutes while also engaging your core for stability. Essential for building leg strength and overall athleticism.",
    howToPerform: [
      "Position the bar on your upper traps, feet shoulder-width apart",
      "Unrack the bar and take 2-3 steps back",
      "Brace your core and initiate the movement by pushing hips back",
      "Descend by bending knees and hips until thighs are parallel to floor",
      "Keep chest up and knees tracking over toes",
      "Drive through your heels to stand back up to starting position"
    ],
    tips: [
      "Keep chest up and back straight throughout",
      "Push knees out over toes – don't let them cave",
      "Maintain a neutral spine position",
      "Drive through your heels, not your toes"
    ],
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Core", "Lower Back"],
    videoUrl: "https://player.vimeo.com/external/422787649.hd.mp4?s=dc59b43f4f6b7a0a4f8f8f8f8f8f8f8f8f8f8f8f&profile_id=175",
    videoPoster: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=450&fit=crop"
  },
  "Deadlift": {
    description: "A full-body pulling movement that builds overall strength and power. The deadlift works your entire posterior chain and is considered one of the best exercises for functional strength.",
    howToPerform: [
      "Stand with feet hip-width apart, bar over mid-foot",
      "Bend at hips and knees to grip the bar just outside your legs",
      "Pull your chest up and flatten your back",
      "Take a deep breath and brace your core",
      "Drive through your heels and extend hips and knees together",
      "Stand tall at the top, then reverse the movement to lower the bar"
    ],
    tips: [
      "Keep the bar close to your body throughout",
      "Hinge at the hips first when lowering",
      "Maintain neutral spine – no rounding",
      "Lock out with glutes, not by leaning back"
    ],
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    secondaryMuscles: ["Traps", "Forearms", "Core"],
    videoUrl: "https://player.vimeo.com/external/434250457.hd.mp4?s=46cc3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d&profile_id=175",
    videoPoster: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=450&fit=crop"
  },
  "Overhead Press": {
    description: "A compound shoulder movement that builds pressing strength overhead. Also known as the military press, this exercise develops shoulder and upper body strength.",
    howToPerform: [
      "Stand with feet shoulder-width apart, bar racked at shoulder height",
      "Grip the bar just outside shoulder width",
      "Unrack and position bar on front deltoids",
      "Take a breath, brace core, and press bar straight overhead",
      "Move head slightly back as bar passes, then forward once cleared",
      "Lock out arms at the top, then lower with control"
    ],
    tips: [
      "Keep core tight throughout to protect lower back",
      "Don't lean back excessively – stay vertical",
      "Full lockout at the top for complete range of motion",
      "Squeeze glutes for extra stability"
    ],
    primaryMuscles: ["Shoulders", "Triceps"],
    secondaryMuscles: ["Upper Chest", "Core", "Traps"],
    videoUrl: "https://player.vimeo.com/external/435367890.hd.mp4?s=12ab34cd56ef78gh90ij12kl34mn56op78qr90st&profile_id=175",
    videoPoster: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=450&fit=crop"
  },
  "Barbell Rows": {
    description: "A compound pulling exercise that targets the entire back. Barbell rows build thickness in your lats, rhomboids, and rear deltoids while also strengthening your grip.",
    howToPerform: [
      "Stand with feet hip-width apart, hinge forward at hips",
      "Grip bar shoulder-width, arms hanging straight down",
      "Keep back flat at roughly 45-degree angle",
      "Pull the bar toward your lower chest/upper abdomen",
      "Squeeze shoulder blades together at the top",
      "Lower with control and repeat"
    ],
    tips: [
      "Keep your back flat – don't round your spine",
      "Pull with your elbows, not your hands",
      "Squeeze at the top for maximum contraction",
      "Control the negative portion of the lift"
    ],
    primaryMuscles: ["Lats", "Rhomboids"],
    secondaryMuscles: ["Rear Deltoids", "Biceps", "Lower Back"],
    videoUrl: "https://player.vimeo.com/external/436789012.hd.mp4?s=ab12cd34ef56gh78ij90kl12mn34op56qr78st90&profile_id=175",
    videoPoster: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&h=450&fit=crop"
  }
};

const defaultExerciseData: ExerciseData = {
  description: "A targeted movement to build strength, muscle, and improve your overall fitness.",
  howToPerform: [
    "Set up with proper posture and grip",
    "Initiate the movement with control",
    "Move through the full range of motion",
    "Pause briefly at the point of maximum contraction",
    "Return to starting position with control",
    "Repeat for the desired number of repetitions"
  ],
  tips: [
    "Focus on form over weight",
    "Control the movement throughout",
    "Breathe steadily – exhale on exertion",
    "Start light and progressively increase weight"
  ],
  primaryMuscles: [],
  secondaryMuscles: [],
  videoUrl: "",
  videoPoster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop"
};

const historyData = [
  { date: "Feb 2", score: 92, weight: "135 lbs", reps: 8 },
  { date: "Jan 30", score: 88, weight: "130 lbs", reps: 10 },
  { date: "Jan 27", score: 85, weight: "125 lbs", reps: 10 },
];

export function ExerciseDetailSheet({ 
  exercise, 
  open, 
  onOpenChange,
  onAddToWorkout,
  onRecordForm
}: ExerciseDetailSheetProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!exercise) return null;

  const details = exerciseDetails[exercise.name] || {
    ...defaultExerciseData,
    primaryMuscles: [exercise.targetMuscle]
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        {/* Video Section */}
        <div className="relative w-full aspect-video bg-secondary overflow-hidden">
          {isPlaying && details.videoUrl ? (
            <video
              src={details.videoUrl}
              poster={details.videoPoster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <img 
                src={details.videoPoster}
                alt={`${exercise.name} demonstration`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={handlePlayVideo}
                  className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors shadow-lg"
                >
                  <Play className="h-7 w-7 text-primary-foreground ml-1" />
                </button>
              </div>
            </>
          )}
          
          {/* Video controls */}
          {isPlaying && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white" />
              ) : (
                <Volume2 className="h-5 w-5 text-white" />
              )}
            </button>
          )}
          
          {/* Close handle */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/50" />
        </div>

        <div className="px-4 pt-4">
          <SheetHeader className="text-left pb-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-xl">{exercise.name}</SheetTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {exercise.sets} sets × {exercise.reps} reps • {exercise.targetMuscle}
                </p>
              </div>
              {exercise.lastFormScore && (
                <FormScoreBadge score={exercise.lastFormScore} />
              )}
            </div>
          </SheetHeader>

          <div className="space-y-5 overflow-y-auto max-h-[calc(90vh-380px)] pb-24">
            {/* Description */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground leading-relaxed">{details.description}</p>
            </div>

            {/* How to perform */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                How to Perform
              </h4>
              <div className="space-y-2">
                {details.howToPerform.map((step, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                  >
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-primary font-bold">{i + 1}</span>
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Muscles worked */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Muscles Worked
              </h4>
              <div className="flex flex-wrap gap-2">
                {details.primaryMuscles.map((muscle, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {muscle}
                  </span>
                ))}
                {details.secondaryMuscles.map((muscle, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Form tips */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Pro Tips
              </h4>
              <div className="grid gap-2">
                {details.tips.map((tip, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    <p className="text-sm text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent history */}
            {exercise.lastFormScore && (
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Recent History
                </h4>
                <div className="space-y-2">
                  {historyData.map((session, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <FormScoreBadge score={session.score} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {session.weight} × {session.reps}
                          </p>
                          <p className="text-xs text-muted-foreground">{session.date}</p>
                        </div>
                      </div>
                      <Video className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border space-y-2">
          <Button 
            className="w-full gap-2 gradient-primary"
            onClick={() => onRecordForm?.(exercise)}
          >
            <Play className="h-4 w-4" />
            Record Form
          </Button>
          <Button 
            variant="outline"
            className="w-full gap-2"
            onClick={() => onAddToWorkout?.(exercise)}
          >
            <Plus className="h-4 w-4" />
            Add to Workout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
