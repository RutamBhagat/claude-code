import OpenAI from "openai";
import { TOOLS, TOOL_MAPPING, isToolName } from "./tools";
import type { ChatCompletionMessageParam } from "openai/resources";

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

  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL,
  });

  const messages: ChatCompletionMessageParam[] = [
    { role: "user", content: prompt },
  ];

  let finishReason: string | undefined;

  while (finishReason !== "stop") {
    const result = await client.chat.completions.create({
      model: "anthropic/claude-haiku-4.5",
      messages: messages,
      tools: TOOLS,
    });

    const { message, finish_reason } = result.choices[0];
    finishReason = finish_reason;

    messages.push(message);

    for (const toolCall of message.tool_calls ?? []) {
      if (toolCall.type !== "function") continue;

      const toolName = toolCall.function.name;
      const toolArgs = JSON.parse(toolCall.function.arguments);

      if (!isToolName(toolName)) {
        throw new Error(`unknown tool: ${toolName}`);
      }

      const toolResponse = await TOOL_MAPPING[toolName](toolArgs);
      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: toolResponse,
      });
    }
  }

  console.log(messages[messages.length - 1].content);
}

main();
