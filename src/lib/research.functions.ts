import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const Input = z.object({ topic: z.string().min(1).max(500) });

export const generateResearchBrief = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    const { text } = await generateText({
      model: gateway("openai/gpt-5.5"),
      system:
        "You are a research assistant. Produce a concise, well-structured markdown brief with an **Overview**, **Key drivers** (bulleted), and **Risks** (bulleted). Keep it under 250 words.",
      prompt: `Research topic: ${data.topic}`,
    });
    return { summary: text };
  });
