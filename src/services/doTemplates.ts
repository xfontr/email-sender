/* eslint-disable consistent-return */
import { REQUIRE_SUBJECT } from "../configs/constants";
import Client from "../types/Client";
import Template from "../types/Template";
import clearEmptyFields from "../utils/clearEmptyFields";
import { objectFromText } from "../utils/objectUtils";
import Session from "./SessionStore";
import { getFlags, injectHTML } from "./injectHTML";
import { parseClients, parseDefaultFlags, parseTemplate } from "./parseFile";

const { isOver, logFailedTemplate } = Session();

export const getDatabase = async (): Promise<{
  clientsDB: string;
  baseTemplate: string;
  defaultFlags: string | false;
}> => {
  const baseTemplate = await parseTemplate();
  if (!baseTemplate || isOver()) return;

  const clientsDB = await parseClients();
  if (!clientsDB || isOver()) return;

  const defaultFlags = await parseDefaultFlags();

  return { clientsDB, baseTemplate, defaultFlags };
};

export const doTemplates = (
  baseTemplate: string,
  clientsDB: string,
  rawDefaultFlags: string | false
): void | Template[] => {
  const clients = objectFromText<Client[]>(clientsDB);
  const defaultFlags = getFlags(objectFromText(rawDefaultFlags || ""));
  const defaultSubject = defaultFlags.find(
    ({ flag }) => flag === "subject"
  )?.content;

  return clients
    .map((client, index) => {
      if (!client.contactData?.email) {
        logFailedTemplate(index, "Unavailable contact data");
        return undefined;
      }

      if (!client.subject && !defaultSubject && REQUIRE_SUBJECT) {
        logFailedTemplate(index, "Subject unavailable");
        return undefined;
      }

      return {
        template: injectHTML(baseTemplate, getFlags(client), defaultFlags),
        contact: client.contactData.email,
        subject: client.subject || defaultSubject || "",
      };
    })
    .filter(clearEmptyFields);
};
