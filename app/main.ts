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
    {
      role: "system",
      content:
        "You are a helpful assistant. who has access to multiple tools to help you with your tasks. you can use these tools to help you with your tasks. you should recursively use these tools to help you with your tasks.",
    },
    { role: "user", content: prompt },
  ];

  while (true) {
    const result = await client.chat.completions.create({
      model: "anthropic/claude-haiku-4.5",
      // model: "gpt-5.5",
      messages: messages,
      tools: TOOLS,
    });

    const { message } = result.choices[0];

    messages.push(message);

    if (!message.tool_calls) {
      break;
    }

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
