import getFile from "../utils/getFile";
import { setDebug } from "../utils/debug";

const debug = setDebug("parseHTML");

const templateRoute = "../data/template.html";

export const parseHTML = (route: string) => async () => {
  const file = await getFile(route);

  if (typeof file !== "string") {
    debug("highError", "Couldn't parse the requested file");
    debug("error", (file as Error).message);
  }

  return file.toString();
};

export const parseTemplate = parseHTML(templateRoute);
