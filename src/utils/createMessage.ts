import ENVIRONMENT from "../configs/environment";
import Email from "../types/Email";
import Message from "../types/Message";
import Template from "../types/Template";

const { emailAddress, userName } = ENVIRONMENT;

export const baseCreateMessage =
  (sender: Email) =>
  ({ contact: to, template: html, subject }: Template): Message => ({
    from: `${userName} <${sender}>`,
    to,
    html,
    subject,
  });

export const createMessage = baseCreateMessage(emailAddress);
