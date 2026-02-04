import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Exercises from "./pages/Exercises";
import Program from "./pages/Program";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Record from "./pages/Record";
import Analyze from "./pages/Analyze";
import ActiveWorkout from "./pages/ActiveWorkout";
import FormFeedback from "./pages/FormFeedback";
import WorkoutSummary from "./pages/WorkoutSummary";
import GoalsSettings from "./pages/Settings/GoalsSettings";
import WorkoutPreferences from "./pages/Settings/WorkoutPreferences";
import NotificationSettings from "./pages/Settings/NotificationSettings";
import PrivacySettings from "./pages/Settings/PrivacySettings";
import HelpSupport from "./pages/Settings/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/program" element={<Program />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/record" element={<Record />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/active-workout" element={<ActiveWorkout />} />
          <Route path="/form-feedback" element={<FormFeedback />} />
          <Route path="/workout-summary" element={<WorkoutSummary />} />
          <Route path="/settings/goals" element={<GoalsSettings />} />
          <Route path="/settings/preferences" element={<WorkoutPreferences />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/settings/privacy" element={<PrivacySettings />} />
          <Route path="/settings/help" element={<HelpSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
