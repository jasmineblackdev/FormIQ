import { cn } from "@/lib/utils";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  className?: string;
}

export function AppLayout({ children, hideNav = false, className }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
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
