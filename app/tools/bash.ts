import { $ } from "bun";
import type { ChatCompletionTool } from "openai/resources";

export const bashTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "bashToolFunc",
    description: "Execute a shell command",
    parameters: {
      type: "object",
      properties: {
        command: {
          type: "string",
          description: "The command to execute",
        },
      },
      required: ["command"],
    },
  },
};

export const bashToolFunc = async ({ command }: { command: string }) => {
  const result = await $`bash -c ${command}`.quiet().nothrow();
  if (result.exitCode === 0) {
    return `${result.stdout}`;
  }
  return `${result.stderr}`;
};
