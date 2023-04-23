import Client from "../types/Client";
import Template from "../types/Template";
import { objectFromText } from "../utils/objectUtils";
import Session from "./SessionStore";
import { getFlags, injectHTML } from "./injectHTML";
import { parseClients, parseTemplate } from "./parseFile";

const { isOver, logFailedTemplate, next } = Session();

const doTemplates = async (): Promise<void | Template[]> => {
  const baseTemplate = await parseTemplate();
  if (!baseTemplate || isOver()) return;

  const clientsDB = await parseClients();
  if (!clientsDB || isOver()) return;

  next();

  const clients = objectFromText<Client[]>(clientsDB);

  // eslint-disable-next-line consistent-return
  return clients
    .map((client, index) => {
      if (!client?.contactData?.email) {
        logFailedTemplate(index, "Client's contact data not available");
        return undefined;
      }

      if (!client?.subject) {
        logFailedTemplate(index, "Client's subject not available");
        return undefined;
      }

      return {
        template: injectHTML(baseTemplate, getFlags(client)),
        contact: client.contactData.email,
        subject: client.subject,
      };
    })
    .filter((client) => !!client);
};

export default doTemplates;
