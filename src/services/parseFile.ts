// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from "papaparse";
import path from "path";
import getFile, { getFileWithoutExtension } from "../utils/getFile";
import { setDebug } from "../utils/debug";
import Session from "./SessionStore";
import { CLIENTS, DEFAULT_FLAGS, TEMPLATE } from "../configs/constants";

const debug = setDebug("parseFile");

const { end } = Session();

export const parseFile =
  (route: string, fileName: string, required = true) =>
  async ({ skipCsv = true, knownExtension = true } = {}): Promise<
    false | string | string[][]
  > => {
    const file = knownExtension
      ? await getFile(route)
      : await getFileWithoutExtension(route, fileName);

    if (typeof file !== "string" && !required) {
      return false;
    }

    if (typeof file !== "string") {
      debug("error", (file as Error).message);
      end("FAIL", `Could not parse the file ${fileName}`);
      return false;
    }

    if (!skipCsv && path.extname(fileName) === "csv") {
      const parsedCSV = parse<string[]>(file)?.data;
      return parsedCSV;
    }

    return file.toString();
  };

export const parseTemplate = parseFile(TEMPLATE.route, TEMPLATE.name);
export const parseClients = parseFile(CLIENTS.route, CLIENTS.name);
export const parseDefaultFlags = parseFile(
  DEFAULT_FLAGS.route,
  CLIENTS.name,
  false
);
