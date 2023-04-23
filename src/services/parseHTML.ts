import fs from "fs/promises";
import path from "path";
import tryCatch from "../utils/tryCatch";
import { setDebug } from "../utils/debug";

const debug = setDebug("parseHTML");

const templateRoute = "../data/template.html";

export const getFile = async (route: string) => {
  const file = await tryCatch(
    fs.readFile.bind(fs),
    path.join(__dirname, route)
  );

  return file[0] ? file[0].toString() : file[1];
};

export const parseHTML = (route: string) => async () => {
  const file = await getFile(route);

  if (typeof file !== "string") {
    debug("highError", "Couldn't parse the requested file");
    debug("error", (file as Error).message);
  }

  return file.toString();
};

export const parseTemplate = parseHTML(templateRoute);
