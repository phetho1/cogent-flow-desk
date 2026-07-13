import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Plus, MoreHorizontal, Download } from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [{ title: "Documents — Nova AI" }, { name: "description", content: "Saved AI documents." }],
  }),
  component: Documents,
});

const docs = [
  { name: "Q3 Product Launch Plan", type: "Task Plan", size: "12 KB", updated: "2h ago" },
  { name: "Competitor SEO Research", type: "Research", size: "48 KB", updated: "5h ago" },
  { name: "Onboarding email copy", type: "Chat export", size: "6 KB", updated: "Yesterday" },
  { name: "Team OKRs — Design", type: "Task Plan", size: "9 KB", updated: "2 days ago" },
  { name: "AI ethics briefing", type: "Research", size: "22 KB", updated: "1 week ago" },
  { name: "Investor update — draft", type: "Chat export", size: "14 KB", updated: "1 week ago" },
];

function Documents() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">All your AI-generated files in one place.</p>
        </div>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" /> New document
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search documents…" className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="divide-y">
          {docs.map((d) => (
            <div
              key={d.name}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_120px_80px_120px_auto]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{d.name}</p>
                  <p className="truncate text-xs text-muted-foreground sm:hidden">
                    {d.type} · {d.size} · {d.updated}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">{d.type}</Badge>
              <span className="hidden text-xs text-muted-foreground sm:block">{d.size}</span>
              <span className="hidden text-xs text-muted-foreground sm:block">{d.updated}</span>
              <div className="hidden gap-1 sm:flex">
                <Button variant="ghost" size="icon" aria-label="Download">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="More">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
