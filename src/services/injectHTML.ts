import { META_FLAGS } from "../configs/constants";
import Flag from "../types/Flag";
import { objectEntries, objectFromText } from "../utils/objectUtils";

export const getFlags = (model: string): Flag[] => {
  const readableModel = objectFromText(model);

  return objectEntries<string>(readableModel)
    .map(([flag, content]) =>
      META_FLAGS.includes(flag) ? undefined : { [flag]: content }
    )
    .filter((flag) => !!flag);
};

export const injectHTML = (text: string, flags: Flag[]) => {
  flags.forEach(({ flag, content }) => text.replaceAll(flag, content));
};
