import Session from "./SessionStore";
import { createTransporter, verifyConnection } from "./emailServices";

const { isOver } = Session();

const sendEmails = () => {
  const transporter = createTransporter();

  verifyConnection(transporter);

  if (isOver()) return;
};
