import { cn } from "@/lib/utils";
import { Home, Dumbbell, Calendar, BarChart3, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Dumbbell, label: "Exercises", path: "/exercises" },
  { icon: Calendar, label: "Program", path: "/program" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
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
              <Icon className={cn(
                "h-5 w-5 transition-transform duration-200",
                isActive && "scale-110"
              )} />
              <span className={cn(
                "text-[10px] font-medium",
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
