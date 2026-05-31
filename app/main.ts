import { createOpenAI } from "@ai-sdk/openai";
import { generateText, isLoopFinished } from "ai";
import { TOOLS } from "./tools";

async function main() {
  const [, , flag, prompt] = process.argv;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseURL =
    process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }
  if (flag !== "-p" || !prompt) {
    throw new Error("error: -p flag is required");
  }

  const openrouter = createOpenAI({
    apiKey,
    baseURL,
  });

  const result = await generateText({
    // model: openrouter.chat("anthropic/claude-haiku-4.5"),
    model: openrouter.chat("gpt-5.5"), // when running locally
    system:
      "You are a helpful assistant. who has access to multiple tools to help you with your tasks. you can use these tools to help you with your tasks. you should recursively use these tools to help you with your tasks.",
    prompt,
    tools: TOOLS,
    stopWhen: isLoopFinished(),
  });

  console.log(result.text);
}

main();
