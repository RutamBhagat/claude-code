import { tool } from "ai";
import { z } from "zod";

export const readTool = tool({
  description: "Read and return the contents of a file",
  inputSchema: z.object({
    file_path: z.string().describe("The path to the file to read"),
  }),
  execute: async ({ file_path }) => {
    const file = Bun.file(file_path);
    return await file.text();
  },
});
