import { cn } from "@/lib/utils";

interface FormScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const getScoreLevel = (score: number) => {
  if (score >= 90) return { label: "Excellent", color: "bg-score-excellent", textColor: "text-score-excellent" };
  if (score >= 75) return { label: "Good", color: "bg-score-good", textColor: "text-score-good" };
  if (score >= 60) return { label: "Fair", color: "bg-score-fair", textColor: "text-score-fair" };
  return { label: "Needs Work", color: "bg-score-poor", textColor: "text-score-poor" };
};

export function FormScoreBadge({ score, size = "md", showLabel = false, className }: FormScoreBadgeProps) {
  const { label, color, textColor } = getScoreLevel(score);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
  };

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold",
          sizeClasses[size],
          color,
          "text-background"
        )}
      >
        {score}
      </div>
      {showLabel && (
        <span className={cn("text-xs font-medium", textColor)}>{label}</span>
      )}
    </div>
  );
}
