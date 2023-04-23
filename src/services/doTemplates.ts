import Client from "../types/Client";
import Template from "../types/Template";
import { objectFromText } from "../utils/objectUtils";
import { getFlags, injectHTML } from "./injectHTML";
import { parseClients, parseTemplate } from "./parseFile";

const doTemplates = async (): Promise<void | Template[]> => {
  const baseTemplate = await parseTemplate();
  const clientsDB = await parseClients();

  if (!baseTemplate || !clientsDB) return;

  const clients = objectFromText<Client[]>(clientsDB);

  // eslint-disable-next-line consistent-return
  return clients
    .map((client) => {
      if (!client?.contactData?.email) return undefined;

      return {
        template: injectHTML(baseTemplate, getFlags(client)),
        contact: client.contactData.email,
      };
    })
    .filter((client) => !!client);
};

export default doTemplates;
