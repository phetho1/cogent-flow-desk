import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [{ title: "Settings — Nova AI" }, { name: "description", content: "Manage your Nova AI account." }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile, preferences, and AI defaults.</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
          <CardDescription>How your account appears across Nova AI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-primary text-lg text-primary-foreground">AR</AvatarFallback>
            </Avatar>
            <Button variant="secondary">Change avatar</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Alex Rivera" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@nova.ai" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Switch between light and dark themes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                theme === "light" ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40"
              }`}
            >
              <Sun className="h-5 w-5" />
              <div>
                <div className="text-sm font-medium">Light</div>
                <div className="text-xs text-muted-foreground">Clean & bright</div>
              </div>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                theme === "dark" ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40"
              }`}
            >
              <Moon className="h-5 w-5" />
              <div>
                <div className="text-sm font-medium">Dark</div>
                <div className="text-xs text-muted-foreground">Easy on the eyes</div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">AI preferences</CardTitle>
          <CardDescription>Fine-tune how Nova generates content.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Cite sources by default", desc: "Include reference links in research briefs." },
            { label: "Show responsible AI notice", desc: "Display the review reminder banner." },
            { label: "Auto-save outputs", desc: "Save every generation to your workspace." },
            { label: "Product updates via email", desc: "Get notified about new features." },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <Switch defaultChecked={i !== 3} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />
      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  );
}
