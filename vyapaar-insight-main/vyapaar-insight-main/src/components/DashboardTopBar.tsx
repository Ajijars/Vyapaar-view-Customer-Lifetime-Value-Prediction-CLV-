import { Bell, Search, UploadCloud } from "lucide-react";
import { useState } from "react";
import { FileUploadModal } from "./ui/FileUpload";

export function DashboardTopBar() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <header className="h-16 bg-card/70 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
        <div>
        <h2 className="text-base font-semibold text-foreground">Good morning, Ramesh 👋</h2>
        <p className="text-xs text-muted-foreground">{today}</p>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Ask AI anything..."
            className="w-full bg-muted/50 rounded-lg pl-9 pr-4 py-2 text-sm border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all"
        >
          <UploadCloud className="w-4 h-4" />
          <span className="hidden sm:inline">Import Data</span>
        </button>
        <button className="relative p-2 rounded-lg hover:bg-muted/50 transition">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-warning rounded-full" />
        </button>
        <span className="hidden md:inline text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium font-mono-data">
          SHOP_001
        </span>
        <div className="w-8 h-8 rounded-full gradient-indigo flex items-center justify-center text-xs font-bold text-primary-foreground">
          RS
        </div>
      </div>
    </header>
    {isUploadOpen && <FileUploadModal onClose={() => setIsUploadOpen(false)} />}
    </>
  );
}
