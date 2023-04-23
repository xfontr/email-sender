import Template from "../types/Template";
import { createMessage } from "../utils/createMessage";
import Session from "./SessionStore";
import { createTransporter, verifyConnection } from "./emailServices";

const { isOver } = Session();

const sendEmails = (templates: Template[]) => {
  const transporter = createTransporter();

  verifyConnection(transporter);

  if (isOver()) return;

  templates.forEach((template) => {
    transporter.sendMail(createMessage(template));
  });
};

export default sendEmails;
