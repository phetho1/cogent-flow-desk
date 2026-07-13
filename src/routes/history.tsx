import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Sparkles, MessageSquare, FileDown, Clock } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [{ title: "History — Nova AI" }, { name: "description", content: "Your recent AI activity." }],
  }),
  component: History,
});

const groups = [
  {
    label: "Today",
    items: [
      { icon: ListChecks, title: "Generated task plan: Website revamp", time: "10:24 AM", type: "Plan" },
      { icon: MessageSquare, title: "Chat session — Launch announcement", time: "9:02 AM", type: "Chat" },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { icon: Sparkles, title: "Research brief: AI in healthcare", time: "4:12 PM", type: "Research" },
      { icon: FileDown, title: "Exported: Q3 OKRs to PDF", time: "11:40 AM", type: "Export" },
    ],
  },
  {
    label: "Earlier this week",
    items: [
      { icon: ListChecks, title: "Generated task plan: Onboarding revamp", time: "Mon", type: "Plan" },
      { icon: MessageSquare, title: "Chat session — Cold email drafts", time: "Mon", type: "Chat" },
      { icon: Sparkles, title: "Research brief: Competitor pricing", time: "Sun", type: "Research" },
    ],
  },
];

function History() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Activity history</h1>
        <p className="mt-1 text-sm text-muted-foreground">A timeline of everything you've done with Nova AI.</p>
      </div>

      {groups.map((g) => (
        <div key={g.label} className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g.label}</h2>
          <Card className="shadow-soft">
            <CardContent className="divide-y p-0">
              {g.items.map((it, i) => (
                <div key={i} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <it.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{it.title}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {it.time}
                    </p>
                  </div>
                  <Badge variant="secondary">{it.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
