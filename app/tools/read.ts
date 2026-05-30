import type { ChatCompletionTool } from "openai/resources";

export const readTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "readToolFunction",
    description: "Read and return the contents of a file",
    parameters: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "The path to the file to read",
        },
      },
      required: ["file_path"],
    },
  },
};

export const readToolFunction = async ({
  file_path,
}: {
  file_path: string;
}) => {
  const file = Bun.file(file_path);
  const contents = await file.text();
  return contents;
};
