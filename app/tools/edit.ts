import type { ChatCompletionTool } from "openai/resources";

export const editTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "editToolFunc",
    description: "Edit a file",
    parameters: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "The path of the file to edit",
        },
        old_string: {
          type: "string",
          description: "The exact text to replace",
        },
        new_string: {
          type: "string",
          description: "The replacement text",
        },
      },
      required: ["file_path", "old_string", "new_string"],
    },
  },
};

export const editToolFunc = async ({
  file_path,
  old_string,
  new_string,
}: {
  file_path: string;
  old_string: string;
  new_string: string;
}) => {
  const file = Bun.file(file_path);
  const content = await file.text();

  if (!content.includes(old_string)) {
    throw new Error(`old_string was not found in ${file_path}`);
  }

  const updatedContent = content.replace(old_string, new_string);
  await Bun.write(file, updatedContent);

  return "File edited successfully";
};
