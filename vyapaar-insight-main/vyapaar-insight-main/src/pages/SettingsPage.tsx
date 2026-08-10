import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Save, Send } from "lucide-react";

export default function SettingsPage() {
  const [chatId, setChatId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get("/notify/config");
        if (res?.data?.chat_id) {
          setChatId(res.data.chat_id);
        }
      } catch (e) {
        console.error("Failed to load config:", e);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    if (!chatId.trim()) {
      toast.error("Please enter a valid Chat ID");
      return;
    }
    
    setIsSaving(true);
    try {
      await api.post("/notify/setup", { chat_id: chatId.trim() });
      toast.success("Telegram Configuration Saved! 🎉");
    } catch (error) {
      toast.error("Failed to save configuration");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences and integrations.</p>
      </div>
      
      <div className="bg-card-gradient rounded-2xl border border-border card-shadow p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-500" />
            Telegram Notifications
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure your Telegram Chat ID to receive the "Close for the Day" summary report.
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2 border border-border/50">
          <h3 className="font-medium text-sm text-foreground">How to get your Chat ID:</h3>
          <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
            <li>Open Telegram and search for your bot: <strong className="text-foreground">@Vyapaarviewbot</strong></li>
            <li>Send a message like "Hello" to the bot.</li>
            <li>Forward that message to <strong className="text-foreground">@userinfobot</strong> to get your numerical Chat ID.</li>
            <li>Paste the ID below.</li>
          </ol>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Telegram Chat ID</label>
          <div className="flex gap-3">
            <input 
              type="text" 
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="e.g. 123456789"
              className="flex-1 bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Config"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
