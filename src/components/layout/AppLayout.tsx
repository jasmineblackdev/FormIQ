import { cn } from "@/lib/utils";
import { BottomNav } from "./BottomNav";
import { ProgramProgressBar } from "./ProgramProgressBar";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  hideProgress?: boolean;
  programInfo?: {
    programName?: string;
    currentWeek?: number;
    totalWeeks?: number;
    currentDay?: number;
    totalDays?: number;
    isRestDay?: boolean;
  };
  className?: string;
}

export function AppLayout({ 
  children, 
  hideNav = false, 
  hideProgress = false,
  programInfo,
  className 
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky program progress header */}
      {!hideProgress && (
        <div className="sticky top-0 z-40">
          <ProgramProgressBar {...programInfo} />
        </div>
      )}
      
      <main className={cn(
        "pb-20", // Space for bottom nav
        className
      )}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
