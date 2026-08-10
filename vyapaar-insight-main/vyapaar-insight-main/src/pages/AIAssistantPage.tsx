import { useState, useRef, useEffect } from "react";
import { aiChatMessages, aiQuickChips } from "@/data/mockData";
import { Bot, Send, Mic, User, Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(aiChatMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    // Add user message
    const userMsg = { role: "user" as const, text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.post("/bot/chat", { message: text });
      setMessages((prev) => [...prev, { role: "ai" as const, text: response.data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai" as const, text: "Sorry, I am having trouble connecting to the server right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Chat History Sidebar */}
      <div className="hidden lg:block w-56 bg-muted/30 rounded-2xl border border-border p-4 space-y-2 flex-shrink-0">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Chat History</h4>
        <div className="space-y-1.5">
          {["Expense spike analysis", "Product promotion", "Cash flow forecast", "Inventory review"].map((t, i) => (
            <button key={t} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${i === 0 ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-muted/50"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col bg-card rounded-2xl border border-border card-shadow overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 animate-fade-up ${m.role === "user" ? "justify-end" : ""}`} style={{ animationDelay: `${i * 100}ms` }}>
              {m.role === "ai" && (
                <div className="w-8 h-8 rounded-full gradient-indigo flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border card-shadow text-foreground"
              }`}>
                {m.text.split("\n\n").map((p, j) => <p key={j} className={j > 0 ? "mt-2" : ""}>{p}</p>)}
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 animate-fade-up">
              <div className="w-8 h-8 rounded-full gradient-indigo flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-card border border-border card-shadow text-foreground flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Chips */}
        <div className="px-5 py-2 flex gap-2 flex-wrap">
          {aiQuickChips.map((c) => (
            <button
              key={c}
              onClick={() => handleSend(c)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-primary/10 transition disabled:opacity-50"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 bg-muted/30 rounded-xl px-4 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your business..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend(input);
                }
              }}
            />
            <button className="text-muted-foreground hover:text-foreground transition"><Mic className="w-4 h-4" /></button>
            <button
              onClick={() => handleSend(input)}
              disabled={isLoading || !input.trim()}
              className="w-8 h-8 rounded-lg gradient-indigo flex items-center justify-center text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
