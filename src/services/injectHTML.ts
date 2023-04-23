import { objectEntries } from "../utils/objectUtils";

export const getFlags = (model: string) => {
  const readableModel = JSON.parse(model);
  return objectEntries(readableModel).map(([flag]) => flag);
};

export const injectHTML = (
  text: string,
  flags: { flag: string; content: string }[]
) => {
  flags.forEach(({ flag, content }) => text.replaceAll(flag, content));
};
