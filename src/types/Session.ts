import Extensions from "./Extensions";

export type Session = {
  status:
    | "INIT"
    | "DATABASE"
    | "TEMPLATES"
    | "CONNECTING"
    | "SENDING"
    | "FAIL"
    | "SUCCESS";
  state: string;
  templateGeneration: {
    failedAttempts: number;
    failedTemplates: { index: number; reason: string }[];
  };
  startTime: Date;
  endTime?: Date;
  preferredDBExtension?: Extensions;
};
