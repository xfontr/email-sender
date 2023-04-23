import { FLAG_FORMAT, META_FLAGS } from "../configs/constants";
import Flag from "../types/Flag";
import { objectEntries } from "../utils/objectUtils";

export const getFlags = <T = Record<string, string>>(model: T): Flag[] =>
  objectEntries<string, T>(model)
    .map(([flag, content]) =>
      META_FLAGS.includes(flag) ? undefined : { flag, content }
    )
    .filter((flag) => !!flag);

export const injectHTML = (text: string, flags: Flag[]): string =>
  flags.reduce(
    (initialText, { flag, content }) =>
      initialText.replaceAll(FLAG_FORMAT(flag), content).replaceAll("\n", ""),
    text
  );
