import Template from "../types/Template";
import { createMessage } from "../utils/createMessage";
import Session from "./SessionStore";
import { createTransporter, verifyConnection } from "./emailServices";

const { isOver } = Session();

const prepareEmails = (templates: Template[]) => {
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

export default prepareEmails;
