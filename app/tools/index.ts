import { readTool, readToolFunc } from "./read";
import { writeTool, writeToolFunc } from "./write";
import { editTool, editToolFunc } from "./edit";

export const TOOLS = [readTool, writeTool, editTool];

export const TOOL_MAPPING = {
  readToolFunc,
  writeToolFunc,
  editToolFunc,
};

export function isToolName(name: string): name is keyof typeof TOOL_MAPPING {
  return name in TOOL_MAPPING;
}
