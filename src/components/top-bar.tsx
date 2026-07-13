import { Bell, Search, Settings, Moon, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";
import { Link } from "@tanstack/react-router";

export function TopBar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur sm:px-6">
      <SidebarTrigger className="shrink-0" />
      <Separator orientation="vertical" className="mr-2 hidden h-6 sm:block" />

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks, docs, chats…"
          className="h-9 rounded-lg border-transparent bg-muted pl-9 focus-visible:border-ring focus-visible:bg-background"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-primary p-0 px-1 text-[10px]">
            3
          </Badge>
        </Button>
        <Button variant="ghost" size="icon" asChild aria-label="Settings">
          <Link to="/settings">
            <Settings className="h-4 w-4" />
          </Link>
        </Button>
        <Avatar className="h-9 w-9 ring-2 ring-primary/20">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
            AR
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
