import Template from "../types/Template";
import { createMessage } from "../utils/createMessage";
import tryCatch from "../utils/tryCatch";
import Session from "./SessionStore";
import { createTransporter, verifyConnection } from "./emailServices";

const { isOver } = Session();

export const prepareEmails = (templates: Template[]): Promise<unknown>[] => {
  const transporter = createTransporter();

  verifyConnection(transporter);

  if (isOver()) return;

  // eslint-disable-next-line consistent-return
  return templates.reduce(
    (pendingMails, template) => [
      ...pendingMails,
      transporter.sendMail(createMessage(template)),
    ],
    []
  );
};

export const executeEmails = async (
  ...emails: Promise<unknown>[]
): Promise<boolean> => {
  const status = await tryCatch(Promise.all, ...emails);
  return !!status[1];
};
