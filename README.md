# Cogent Flow Desk

A clean, modern SaaS dashboard for an AI productivity platform — featuring an AI Task Planner, Research Assistant, and Chatbot in a single workspace.

**Live demo:** https://cogent-flow-desk.lovable.app

## Features

- **Dashboard** — welcome header, quick actions, and activity overview
- **AI Task Planner** — break goals into actionable steps
- **AI Research Assistant** — summarize topics and surface sources
- **AI Chatbot (Nova)** — full-instruction conversational assistant powered by GPT-5.5
- **Documents, History, Settings** — supporting workspace pages
- Responsive desktop-first layout with sidebar + top navigation
- Light/dark theme, rounded cards, soft shadows, minimalist UI

## Tech Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- [TanStack Router](https://tanstack.com/router) — file-based routing
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + Radix UI
- [Vercel AI SDK](https://sdk.vercel.ai/) via Lovable AI Gateway
- TypeScript, ESLint, Prettier

## Getting Started

```bash
bun install
bun dev
```

The app runs at `http://localhost:8080`.

### Scripts

| Command       | Description                    |
| ------------- | ------------------------------ |
| `bun dev`     | Start the Vite dev server      |
| `bun build`   | Production build               |
| `bun preview` | Preview the production build   |
| `bun lint`    | Run ESLint                     |
| `bun format`  | Format with Prettier           |

## Project Structure

```
src/
├── components/    # Sidebar, top bar, AI notice, theme provider
├── routes/        # File-based routes (index, planner, research, chat, ...)
├── lib/           # Server functions (chat, research) + AI gateway
├── hooks/         # Reusable hooks
└── styles.css     # Tailwind v4 theme tokens
```

## AI Configuration

AI features call the Lovable AI Gateway from server functions (`src/lib/*.functions.ts`). No API keys are needed locally when running inside Lovable.

## Deployment

This project is developed and deployed via [Lovable](https://lovable.dev). Pushes to GitHub sync back to Lovable automatically.

## License

MIT
