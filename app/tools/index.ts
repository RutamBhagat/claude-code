import { readTool, readToolFunction } from "./read";

export const TOOLS = [readTool];

export const TOOL_MAPPING = {
  readToolFunction,
};

export function isToolName(name: string): name is keyof typeof TOOL_MAPPING {
  return name in TOOL_MAPPING;
}
