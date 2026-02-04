import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle, 
  Book, 
  Mail,
  ExternalLink,
  ChevronRight,
  Search
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How does AI form analysis work?",
    answer: "Our AI analyzes your workout videos frame-by-frame to detect body positioning, joint angles, and movement patterns. It compares your form against ideal movement standards."
  },
  {
    question: "How accurate is the form scoring?",
    answer: "Our AI has been trained on thousands of exercise videos and achieves 90%+ accuracy on major compound movements. Scores are meant as guidance, not medical advice."
  },
  {
    question: "Can I use Form IQ without internet?",
    answer: "You need internet to upload and analyze videos, but you can view your history and past analyses offline."
  },
  {
    question: "How do I change my workout program?",
    answer: "Go to Profile > Goals & Program to switch between recommended programs or create a custom workout plan."
  },
  {
    question: "Are my videos stored privately?",
    answer: "Yes, your videos are encrypted and stored securely. You can delete them anytime from Privacy & Data settings."
  },
];

const HelpSupport = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout hideProgress>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Help & Support</h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <MessageCircle className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Chat Support</p>
              <p className="text-xs text-muted-foreground">Avg. reply: 2 min</p>
            </button>
            <button className="p-4 rounded-xl bg-card border border-border text-center">
              <Mail className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Email Us</p>
              <p className="text-xs text-muted-foreground">support@formiq.app</p>
            </button>
          </div>

          {/* FAQs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-2">
              {filteredFaqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 rounded-xl bg-card border border-border text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-foreground">{faq.question}</p>
                    <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedFaq === index && (
                    <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                      {faq.answer}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Resources</h2>
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📖</span>
                  <span className="font-medium text-foreground">User Guide</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎥</span>
                  <span className="font-medium text-foreground">Video Tutorials</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💬</span>
                  <span className="font-medium text-foreground">Community Forum</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* App info */}
          <div className="text-center py-6 space-y-1">
            <p className="text-sm text-muted-foreground">Form IQ v1.0.0</p>
            <p className="text-xs text-muted-foreground">Made with 💙 for fitness enthusiasts</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HelpSupport;
