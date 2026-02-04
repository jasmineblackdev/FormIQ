import { cn } from "@/lib/utils";
import { Home, Dumbbell, Video, Sparkles, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Dumbbell, label: "Exercises", path: "/exercises" },
  { icon: Video, label: "Record", path: "/record", highlight: true },
  { icon: Sparkles, label: "Analyze", path: "/analyze" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ icon: Icon, label, path, highlight }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1",
                "transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {highlight ? (
                <div className={cn(
                  "h-10 w-10 -mt-4 rounded-full flex items-center justify-center transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "bg-primary/20 text-primary"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
              ) : (
                <Icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive && "scale-110"
                )} />
              )}
              <span className={cn(
                "text-[10px] font-medium",
                highlight && "-mt-1",
                isActive && "font-semibold"
              )}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
