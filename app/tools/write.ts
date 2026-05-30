import type { ChatCompletionTool } from "openai/resources";

export const writeTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "writeToolFunc",
    description: "Write content to a file",
    parameters: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "The path of the file to write to",
        },
        content: {
          type: "string",
          description: "The content to write to the file",
        },
      },
      required: ["file_path", "content"],
    },
  },
};

export const writeToolFunc = async ({
  file_path,
  content,
}: {
  file_path: string;
  content: string;
}) => {
  const file = Bun.file(file_path);
  await file.write(content);

  return "File written successfully";
};
