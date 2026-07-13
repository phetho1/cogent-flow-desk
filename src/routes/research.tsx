import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FileDown, Link2, BookOpen, Wand2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Nova AI" },
      { name: "description", content: "Summarize sources and build cited research briefs." },
    ],
  }),
  component: Research,
});

const templates = [
  "Give me a market overview",
  "Compare top competitors",
  "Summarize recent news",
  "Explain like I'm new to the topic",
];

const initialSummary = `**Overview.** The AI productivity space is expanding rapidly, driven by improvements in reasoning models and workflow-native integrations. Adoption is highest in knowledge work — engineering, marketing, and operations.

**Key drivers.**
- Multimodal reasoning enabling document + image + code workflows.
- Team collaboration features (shared prompts, cited outputs, audit trails).
- Enterprise readiness: SSO, retention controls, and compliance certifications.

**Risks.** Data governance, hallucination management, and change fatigue among end users.`;

const sources = [
  { title: "State of AI at Work 2026", url: "example.com/state-of-ai", tag: "Report" },
  { title: "Generative AI Enterprise Playbook", url: "example.com/enterprise-ai", tag: "Guide" },
  { title: "AI Productivity Benchmarks — Q2", url: "example.com/benchmarks", tag: "Data" },
  { title: "Interview: CTO at Vector Labs", url: "example.com/vector-cto", tag: "Interview" },
];

function Research() {
  const [topic, setTopic] = useState("The future of AI productivity tools");
  const [summary, setSummary] = useState(initialSummary);
  const [notes, setNotes] = useState("- Highlight opportunity for verticalized workflows.\n- Ask sales for enterprise anecdotes.");
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          <Badge variant="secondary">AI Research Assistant</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Research anything, faster</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Get cited summaries, extract insights, and export polished briefs.
        </p>
      </div>

      <Card className="shadow-soft">
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="space-y-2">
              <Label htmlFor="topic">Research topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Emerging trends in vertical SaaS"
              />
            </div>
            <Button
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  toast.success("New brief generated");
                }, 800);
              }}
              disabled={loading}
            >
              <Wand2 className="mr-1.5 h-4 w-4" /> {loading ? "Researching…" : "Generate brief"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t}
                className="rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
              >
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-primary" /> Summary
              </CardTitle>
              <CardDescription>Editable — refine tone and depth</CardDescription>
            </div>
            <Button size="sm" variant="secondary" onClick={() => toast.success("Exported to PDF")}>
              <FileDown className="mr-1.5 h-3.5 w-3.5" /> Export PDF
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="min-h-[260px] resize-none text-sm leading-relaxed"
            />

            <div>
              <Label className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                <Link2 className="h-3.5 w-3.5" /> Notes
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Personal notes and takeaways…"
                className="text-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Sources</CardTitle>
            <CardDescription>{sources.length} references cited</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sources.map((s) => (
              <a
                key={s.title}
                href={`https://${s.url}`}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-lg border p-3 transition-colors hover:border-primary/40 hover:bg-accent"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium group-hover:text-accent-foreground">
                      {s.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{s.url}</p>
                  </div>
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </div>
                <Badge variant="secondary" className="mt-2 text-[10px]">
                  {s.tag}
                </Badge>
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
