import { tool } from "ai";
import { applyStandardDiff } from "apply-multi-diff";
import { z } from "zod";

const editToolPrompt = {
  pach: `A valid unified diff patch for file_path.

Required format for hunk-only patches:
@@ -oldStart,oldCount +newStart,newCount @@
 unchanged context line
-line to remove
+line to add
 unchanged context line

Rules:
- Start each hunk with an @@ header using line numbers from the current file.
- Prefix unchanged context lines with a single space.
- Prefix removals with - and additions with +.
- Do not wrap the patch in markdown fences.
- Do not include explanatory text in the patch.
- Keep enough surrounding context lines for the hunk to apply reliably.`,
};

export const editTool = tool({
  description:
    "Apply a unified diff patch to a file. Use this for edits instead of rewriting the whole file. The patch must be valid unified diff format with one or more @@ hunk headers. You may provide a hunk-only patch starting with @@, or a single-file git diff with ---/+++ headers. Every hunk line must start with exactly one of: space for context, - for removed lines, or + for added lines.",
  inputSchema: z.object({
    file_path: z.string().describe("The path of the file to edit"),
    patch: z.string().describe(editToolPrompt.pach),
  }),
  execute: async ({ file_path, patch }) => {
    const file = Bun.file(file_path);
    const content = await file.text();
    const result = applyStandardDiff(content, patch);

    if (!result.success) {
      throw new Error(
        `patch could not be applied to ${file_path}: ${result.error.message}`,
      );
    }

    await Bun.write(file, result.content);

    return "File edited successfully";
  },
});
