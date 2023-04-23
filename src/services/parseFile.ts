import getFile from "../utils/getFile";
import { setDebug } from "../utils/debug";

const debug = setDebug("parseFile");

const templateRoute = "../data/template.html";
const clientsRoute = "../data/clients.json";

export const parseFile =
  (route: string) => async (): Promise<false | string> => {
    const file = await getFile(route);

    if (typeof file !== "string") {
      debug("highError", "Couldn't parse the requested file");
      debug("error", (file as Error).message);
      return false;
    }

    return file.toString();
  };

export const parseTemplate = parseFile(templateRoute);
export const parseClients = parseFile(clientsRoute);
