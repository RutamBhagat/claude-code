import { $ } from "bun";
import { tool } from "ai";
import { z } from "zod";

export const bashTool = tool({
  description: "Execute a shell command",
  inputSchema: z.object({
    command: z.string().describe("The command to execute"),
  }),
  execute: async ({ command }) => {
    const result = await $`bash -c ${command}`.quiet().nothrow();
    if (result.exitCode === 0) {
      return `${result.stdout}`;
    }
    return `${result.stderr}`;
  },
});
