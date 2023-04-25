import ENVIRONMENT from "../configs/environment";
import Email from "../types/Email";
import Message from "../types/Message";
import Template from "../types/Template";

const { emailAddress, userName } = ENVIRONMENT;

export const baseCreateMessage =
  (sender: Email) =>
  (template: Template): Message => ({
    from: `${userName} <${sender}>`,
    to: template.contact,
    html: template.template,
    subject: template.subject,
  });

export const createMessage = baseCreateMessage(emailAddress);
