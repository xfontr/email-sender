import { FLAG_FORMAT, META_FLAGS } from "../configs/constants";
import Flag from "../types/Flag";
import clearEmptyFields from "../utils/clearEmptyFields";
import { objectEntries } from "../utils/objectUtils";

export const getFlags = <T = Record<string, string>>(model: T): Flag[] =>
  objectEntries<string, T>(model)
    .map(([flag, content]) =>
      META_FLAGS.includes(flag) ? undefined : { flag, content }
    )
    .filter(clearEmptyFields);

export const getDefaultFlag = (
  flagName: string,
  defaultFlags: Flag[]
): string | undefined =>
  defaultFlags.find(({ flag }) => flag === flagName)?.content;

export const injectHTML = (
  text: string,
  flags: Flag[],
  defaultFlags?: Flag[]
): string =>
  flags
    .reduce(
      (initialText, { flag, content }) =>
        initialText
          .replaceAll(
            FLAG_FORMAT(flag),
            content || getDefaultFlag(flag, defaultFlags) || ""
          )
          .replaceAll("\n", ""),
      text
    )
    .replaceAll(/\{\{.*?\}\}/g, "");
