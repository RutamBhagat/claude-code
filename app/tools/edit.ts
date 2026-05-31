import { tool } from "ai";
import { z } from "zod";

export const editTool = tool({
  description: "Edit a file",
  inputSchema: z.object({
    file_path: z.string().describe("The path of the file to edit"),
    old_string: z.string().describe("The exact text to replace"),
    new_string: z.string().describe("The replacement text"),
  }),
  execute: async ({ file_path, old_string, new_string }) => {
    const file = Bun.file(file_path);
    const content = await file.text();

    if (!content.includes(old_string)) {
      throw new Error(`old_string was not found in ${file_path}`);
    }

    const updatedContent = content.replace(old_string, new_string);
    await Bun.write(file, updatedContent);

    return "File edited successfully";
  },
});
