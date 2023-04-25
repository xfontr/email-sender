import getFile from "../utils/getFile";
import { setDebug } from "../utils/debug";
import Session from "./SessionStore";

const debug = setDebug("parseFile");

const { end } = Session();

const templateRoute = "../data/template.html";
const clientsRoute = "../data/clients.json";
const defaultFlagsRoute = "../data/master.json";

export const parseFile =
  (route: string, fileName: string, required = true) =>
  async (): Promise<false | string> => {
    const file = await getFile(route);

    if (typeof file !== "string" && !required) {
      return false;
    }

    if (typeof file !== "string") {
      debug("error", (file as Error).message);
      end("FAIL", `Could not parse the file ${fileName}`);
      return false;
    }

    return file.toString();
  };

export const parseTemplate = parseFile(templateRoute, "template.html");
export const parseClients = parseFile(clientsRoute, "clients.json");
export const parseDefaultFlags = parseFile(
  defaultFlagsRoute,
  "master.json",
  false
);
