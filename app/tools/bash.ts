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
  try {
    await $`bash -c ${command}`.quiet();
    return "Command executed successfully";
  } catch (error) {
    return `Command failed: ${error}`;
  }
};
