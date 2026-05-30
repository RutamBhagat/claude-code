import { readTool, readToolFunc } from "./read";
import { writeTool, writeToolFunc } from "./write";
import { editTool, editToolFunc } from "./edit";
import { bashTool, bashToolFunc } from "./bash";

export const TOOLS = [readTool, writeTool, editTool, bashTool];

export const TOOL_MAPPING = {
  readToolFunc,
  writeToolFunc,
  editToolFunc,
  bashToolFunc,
};

export function isToolName(name: string): name is keyof typeof TOOL_MAPPING {
  return name in TOOL_MAPPING;
}
