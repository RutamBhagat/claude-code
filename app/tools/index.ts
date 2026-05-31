import { readTool } from "./read";
import { writeTool } from "./write";
import { editTool } from "./edit";
import { bashTool } from "./bash";

export const TOOLS = {
  readToolFunc: readTool,
  writeToolFunc: writeTool,
  editToolFunc: editTool,
  bashToolFunc: bashTool,
};
