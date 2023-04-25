// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from "papaparse";
import getFile from "../utils/getFile";
import { setDebug } from "../utils/debug";
import Session from "./SessionStore";
import { PREFERRED_DB_EXTENSION } from "../configs/constants";

const debug = setDebug("parseFile");

const { end } = Session();

const templateRoute = "../data/template.html";
const clientsRoute = `../data/clients.${PREFERRED_DB_EXTENSION}`;
const defaultFlagsRoute = "../data/master.json";

export const parseFile =
  (route: string, fileName: string, required = true) =>
  async (): Promise<false | string | string[][]> => {
    const file = await getFile(route);

    if (typeof file !== "string" && !required) {
      return false;
    }

    if (typeof file !== "string") {
      debug("error", (file as Error).message);
      end("FAIL", `Could not parse the file ${fileName}`);
      return false;
    }

    if (
      PREFERRED_DB_EXTENSION === fileName.split(".")[1] &&
      PREFERRED_DB_EXTENSION === "csv"
    ) {
      const parsedCSV = parse<string[]>(file)?.data;
      return parsedCSV;
    }

    return file.toString();
  };

export const parseTemplate = parseFile(templateRoute, "template.html");
export const parseClients = parseFile(
  clientsRoute,
  `clients.${PREFERRED_DB_EXTENSION}`
);
export const parseDefaultFlags = parseFile(
  defaultFlagsRoute,
  "master.json",
  false
);
