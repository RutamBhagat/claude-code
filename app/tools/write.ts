import { tool } from "ai";
import { z } from "zod";

export const writeTool = tool({
  description: "Write content to a file",
  inputSchema: z.object({
    file_path: z.string().describe("The path of the file to write to"),
    content: z.string().describe("The content to write to the file"),
  }),
  execute: async ({ file_path, content }) => {
    const file = Bun.file(file_path);
    await Bun.write(file, content);

    return "File written successfully";
  },
});
