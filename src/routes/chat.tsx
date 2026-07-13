import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Paperclip,
  Send,
  RefreshCw,
  Sparkles,
  User,
  Pencil,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { chatCompletion } from "@/lib/chat.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — Nova AI" },
      { name: "description", content: "Conversational AI to brainstorm, draft, and refine." },
    ],
  }),
  component: Chat,
});

type Msg = { id: string; role: "user" | "ai"; text: string };

const suggestions = [
  "Draft an outreach email to a design agency",
  "Explain vector databases in simple terms",
  "Summarize the pros and cons of remote work",
  "Give me a weekly content plan for LinkedIn",
];

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "1", role: "user", text: "Can you help me plan a launch announcement for our new AI feature?" },
    {
      id: "2",
      role: "ai",
      text:
        "Absolutely. Here's a lightweight structure:\n\n1. Hook — one-sentence promise\n2. Problem — what users struggle with today\n3. Reveal — the feature and how it works\n4. Proof — a short demo or metric\n5. CTA — how to try it\n\nWant me to draft copy for each section?",
    },
  ]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const runChat = useServerFn(chatCompletion);

  const callAi = async (history: Msg[]) => {
    setLoading(true);
    try {
      const { text } = await runChat({
        data: {
          messages: history.map((m) => ({
            role: m.role === "ai" ? ("assistant" as const) : ("user" as const),
            content: m.text,
          })),
        },
      });
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "ai", text }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (msg.includes("429")) toast.error("Rate limit reached. Try again shortly.");
      else if (msg.includes("402")) toast.error("AI credits exhausted. Please add credits.");
      else toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t || loading) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: t };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    void callAi(next);
  };

  const regenerate = (id: string) => {
    const idx = messages.findIndex((m) => m.id === id);
    if (idx <= 0) return;
    const history = messages.slice(0, idx);
    setMessages(history);
    void callAi(history);
  };


  const startEdit = (m: Msg) => {
    setEditingId(m.id);
    setEditingText(m.text);
  };
  const saveEdit = () => {
    setMessages((m) => m.map((msg) => (msg.id === editingId ? { ...msg, text: editingText } : msg)));
    setEditingId(null);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-5xl flex-col p-4 sm:p-6 lg:p-8">
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <MessageSquare className="h-4 w-4" />
          </div>
          <Badge variant="secondary">AI Chatbot</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Chat with Nova</h1>
      </div>

      <Card className="flex min-h-0 flex-1 flex-col overflow-hidden shadow-soft">
        <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback
                  className={
                    m.role === "ai"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }
                >
                  {m.role === "ai" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className={`group max-w-[80%] ${m.role === "user" ? "items-end" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border bg-card text-card-foreground"
                  }`}
                >
                  {editingId === m.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="min-h-[100px] bg-background text-foreground"
                      />
                      <Button size="sm" onClick={saveEdit}>
                        <Check className="mr-1 h-3.5 w-3.5" /> Save
                      </Button>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  )}
                </div>
                {m.role === "ai" && editingId !== m.id && (
                  <div className="mt-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="sm" onClick={() => regenerate(m.id)}>
                      <RefreshCw className="mr-1 h-3 w-3" /> Regenerate
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => startEdit(m)}>
                      <Pencil className="mr-1 h-3 w-3" /> Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t bg-muted/30 p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground shadow-soft transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-soft focus-within:border-ring">
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && toast.success(`Attached: ${e.target.files[0].name}`)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => fileRef.current?.click()}
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask Nova anything… (Shift+Enter for newline)"
              rows={1}
              className="min-h-[40px] resize-none border-0 bg-transparent p-2 shadow-none focus-visible:ring-0"
            />
            <Button onClick={() => send()} size="icon" className="shrink-0" aria-label="Send" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
