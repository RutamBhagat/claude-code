import { readTool, readToolFunc } from "./read";
import { writeTool, writeToolFunc } from "./write";

export const TOOLS = [readTool, writeTool];

export const TOOL_MAPPING = {
  readToolFunc,
  writeToolFunc,
};

export function isToolName(name: string): name is keyof typeof TOOL_MAPPING {
  return name in TOOL_MAPPING;
}
