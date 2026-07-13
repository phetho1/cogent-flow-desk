import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ListChecks,
  Sparkles,
  Copy,
  Save,
  Download,
  Wand2,
  Flag,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Nova AI" },
      { name: "description", content: "Turn goals into structured, prioritized action plans." },
    ],
  }),
  component: Planner,
});

const templates = [
  "Break this project into weekly milestones",
  "Create a launch checklist for a product release",
  "Plan a research sprint with deliverables",
];

const initialOutput = `## Project Breakdown
1. **Kickoff & alignment** — schedule kickoff, share brief, confirm success metrics.
2. **Discovery** — interview 5 users, audit 3 competitors, synthesize insights.
3. **Design sprint** — wireframes → hi-fi → prototype review.
4. **Build phase** — sprint 1 (foundation), sprint 2 (features), sprint 3 (polish).
5. **Launch** — QA, marketing assets, soft launch, full launch.

**Owner:** You · **Est. duration:** 6 weeks`;

function Planner() {
  const [goal, setGoal] = useState("");
  const [priority, setPriority] = useState("high");
  const [deadline, setDeadline] = useState("");
  const [output, setOutput] = useState(initialOutput);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!goal.trim()) {
      toast.error("Describe your goal to generate a plan");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOutput(
        `## Plan for: ${goal}\n\n1. **Define scope & success metrics** — clarify what "done" looks like.\n2. **Research & gather inputs** — collect data, references, stakeholder input.\n3. **Draft the approach** — outline 2-3 options with tradeoffs.\n4. **Execute the top choice** — break into shippable milestones.\n5. **Review & iterate** — measure results, adjust plan.\n\n**Priority:** ${priority} · **Deadline:** ${deadline || "not set"}`
      );
      setLoading(false);
      toast.success("Plan generated");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <ListChecks className="h-4 w-4" />
            </div>
            <Badge variant="secondary">AI Task Planner</Badge>
          </div>
          <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
            Turn goals into action plans
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Describe what you want to accomplish and let AI break it down.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">New task plan</CardTitle>
            <CardDescription>Structured prompt input</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Goal / project</Label>
              <Textarea
                id="goal"
                placeholder="e.g. Launch a beta of our onboarding flow in 4 weeks…"
                rows={5}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <Flag className="h-3.5 w-3.5" /> Priority
                </Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline" className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" /> Deadline
                </Label>
                <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Prompt templates</Label>
              <div className="flex flex-wrap gap-2">
                {templates.map((t) => (
                  <button
                    key={t}
                    onClick={() => setGoal(t)}
                    className="rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={generate} disabled={loading} className="w-full">
              <Wand2 className="mr-1.5 h-4 w-4" />
              {loading ? "Generating…" : "Generate plan"}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" /> AI-generated breakdown
              </CardTitle>
              <CardDescription>Fully editable — refine as needed</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="mr-1 h-3.5 w-3.5" /> Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={() => toast.success("Saved to workspace")}>
                <Save className="mr-1 h-3.5 w-3.5" /> Save
              </Button>
              <Button variant="secondary" size="sm" onClick={() => toast.success("Exported as Markdown")}>
                <Download className="mr-1 h-3.5 w-3.5" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-[420px] resize-none font-mono text-sm leading-relaxed"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
