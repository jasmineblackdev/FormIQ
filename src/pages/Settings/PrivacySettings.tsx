import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Shield, 
  Download, 
  Trash2, 
  Eye, 
  Cloud,
  Lock,
  Share2
} from "lucide-react";
import { useState } from "react";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [videoStorage, setVideoStorage] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [shareProgress, setShareProgress] = useState(false);

  return (
    <AppLayout hideProgress>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Privacy & Data</h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Data storage info */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Cloud className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Cloud Storage</p>
                <p className="text-xs text-muted-foreground">2.4 GB of 5 GB used</p>
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[48%] bg-primary rounded-full" />
            </div>
          </div>

          {/* Privacy settings */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Privacy Settings</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="font-medium">Store Workout Videos</Label>
                    <p className="text-xs text-muted-foreground">Keep recordings for review</p>
                  </div>
                </div>
                <Switch checked={videoStorage} onCheckedChange={setVideoStorage} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-success" />
                  <div>
                    <Label className="font-medium">Usage Analytics</Label>
                    <p className="text-xs text-muted-foreground">Help improve the app</p>
                  </div>
                </div>
                <Switch checked={analytics} onCheckedChange={setAnalytics} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="font-medium">Share Progress</Label>
                    <p className="text-xs text-muted-foreground">Allow friends to see progress</p>
                  </div>
                </div>
                <Switch checked={shareProgress} onCheckedChange={setShareProgress} />
              </div>
            </div>
          </div>

          {/* Data actions */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Your Data</h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border text-left hover:bg-accent transition-colors">
                <Download className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Export Data</p>
                  <p className="text-xs text-muted-foreground">Download all your workout data</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border text-left hover:bg-accent transition-colors">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Privacy Policy</p>
                  <p className="text-xs text-muted-foreground">View our privacy practices</p>
                </div>
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="space-y-3">
            <h2 className="font-semibold text-destructive">Danger Zone</h2>
            
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 space-y-4">
              <div className="flex items-start gap-3">
                <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Delete All Data</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete all your workouts, videos, and progress data. This action cannot be undone.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
                Delete All Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PrivacySettings;
