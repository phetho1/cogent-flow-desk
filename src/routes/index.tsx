import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ListChecks,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Plus,
  TrendingUp,
  Zap,
  Clock,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Nova AI" },
      { name: "description", content: "Your AI productivity command center." },
    ],
  }),
  component: Dashboard,
});

const usageData = [
  { day: "Mon", tasks: 12, chats: 8 },
  { day: "Tue", tasks: 19, chats: 14 },
  { day: "Wed", tasks: 15, chats: 22 },
  { day: "Thu", tasks: 27, chats: 18 },
  { day: "Fri", tasks: 32, chats: 29 },
  { day: "Sat", tasks: 18, chats: 12 },
  { day: "Sun", tasks: 24, chats: 20 },
];

const features = [
  {
    title: "AI Task Planner",
    to: "/planner" as const,
    desc: "Turn goals into structured, prioritized action plans in seconds.",
    icon: ListChecks,
    stat: "142 plans this month",
    usage: 72,
    accent: "from-violet-500 to-indigo-500",
  },
  {
    title: "AI Research Assistant",
    to: "/research" as const,
    desc: "Summarize sources, extract insights, and build cited briefings.",
    icon: Sparkles,
    stat: "89 briefs generated",
    usage: 54,
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    title: "AI Chatbot",
    to: "/chat" as const,
    desc: "Ask anything — brainstorm, draft, or refine with context.",
    icon: MessageSquare,
    stat: "1,204 messages",
    usage: 88,
    accent: "from-sky-500 to-indigo-500",
  },
];

const recentProjects = [
  { name: "Q3 Product Launch Plan", type: "Task Plan", updated: "2h ago" },
  { name: "Competitor SEO Research", type: "Research", updated: "5h ago" },
  { name: "Onboarding email copy", type: "Chat", updated: "Yesterday" },
  { name: "Team OKRs — Design", type: "Task Plan", updated: "2 days ago" },
];

const activity = [
  { icon: ListChecks, text: "Generated 8 subtasks for 'Website revamp'", time: "10m" },
  { icon: Sparkles, text: "Summarized 12 sources on 'AI regulation'", time: "1h" },
  { icon: MessageSquare, text: "Chat session with GPT-Pro completed", time: "3h" },
  { icon: FileText, text: "Exported research brief to PDF", time: "Yesterday" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Welcome header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <Badge className="mb-3 border-white/20 bg-white/15 text-primary-foreground hover:bg-white/20">
              <Zap className="mr-1 h-3 w-3" /> Pro plan
            </Badge>
            <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
              Good morning, Alex 👋
            </h1>
            <p className="mt-1.5 max-w-xl text-sm opacity-90 sm:text-base">
              You have 3 tasks due today and 2 new research briefs ready to review.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary" className="shadow-soft">
              <Link to="/planner">
                <Plus className="mr-1.5 h-4 w-4" /> New plan
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link to="/chat">Ask AI</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((f) => (
          <Card
            key={f.title}
            className="group relative overflow-hidden border-border/70 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${f.accent} opacity-80`}
            />
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${f.accent} text-white shadow-glow`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="truncate text-base">{f.title}</CardTitle>
                  <CardDescription className="mt-0.5 text-xs">{f.stat}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{f.desc}</p>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Monthly usage</span>
                  <span className="font-medium text-foreground">{f.usage}%</span>
                </div>
                <Progress value={f.usage} className="h-1.5" />
              </div>
              <Button asChild size="sm" className="w-full">
                <Link to={f.to}>
                  Open <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics + activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Activity overview</CardTitle>
              <CardDescription>Tasks planned & chat sessions this week</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3 text-success" /> +18%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="gTasks" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gChats" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="tasks" stroke="var(--color-chart-1)" fill="url(#gTasks)" strokeWidth={2} />
                  <Area type="monotone" dataKey="chats" stroke="var(--color-chart-2)" fill="url(#gChats)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>Latest AI actions in your workspace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug">{a.text}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {a.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent projects */}
      <Card className="shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Recent projects</CardTitle>
            <CardDescription>Jump back into your latest work</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {recentProjects.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_120px_100px]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground sm:hidden">
                    {p.type} · {p.updated}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {p.type}
              </Badge>
              <span className="hidden text-right text-xs text-muted-foreground sm:block">
                {p.updated}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
