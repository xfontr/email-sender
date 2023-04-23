export type DebugColors =
  | "highSuccess"
  | "success"
  | "highError"
  | "error"
  | "information"
  | "misc";

export type DebugWithColors = (colors: DebugColors, message: string) => void;
