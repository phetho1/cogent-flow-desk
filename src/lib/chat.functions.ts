import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1),
});

export const chatCompletion = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("openai/gpt-5.5");

    const { text } = await generateText({
      model,
      maxOutputTokens: 4096,
      messages: [
        {
          role: "system",
          content:
            "You are Nova, a helpful AI productivity assistant. Provide complete, thorough answers. Use markdown formatting when helpful. Never truncate instructions or steps — always finish your thought.",
        },
        ...data.messages,
      ],
    });

    return { text };
  });
