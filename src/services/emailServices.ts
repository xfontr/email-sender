// eslint-disable-next-line import/no-extraneous-dependencies
import flatten from "flat";
import nodemailer, { Transporter, TransportOptions } from "nodemailer";
import ENVIRONMENT from "../configs/environment";
import EMAIL_OPTIONS from "../configs/emailOptions";
import Session from "./SessionStore";
import hasEmptyValues from "../utils/validateRequest";
import { setDebug } from "../utils/debug";
import { createMessage } from "../utils/createMessage";
import tryCatch from "../utils/tryCatch";
import Template from "../types/Template";

const { end, isOver } = Session();
const debug = setDebug("emailServices");

const { email, emailAddress, userName } = ENVIRONMENT;

const transporterOptions = {
  ...email,
  ...EMAIL_OPTIONS,
} as TransportOptions;

export const createTransporter = ():
  | nodemailer.Transporter<unknown>
  | undefined => {
  const emptyValues = hasEmptyValues(
    flatten<object, object>({
      ...transporterOptions,
      emailAddress,
      userName,
    })
  );

  if (!emptyValues.length)
    return nodemailer.createTransport(transporterOptions);

  emptyValues.forEach((value) => {
    debug("information", `The email log in field "${value}" must not be empty`);
  });

  end("FAIL", "Invalid log in data");
};

export const verifyConnection = (transporter: Transporter) => {
  transporter.verify((error) => {
    if (!error) return;

    end("FAIL", "Could not verify the server connection");
  });
};

export const prepareEmails = (templates: Template[]): Promise<unknown>[] => {
  const transporter = createTransporter();

  if (isOver()) return;

  verifyConnection(transporter);

  if (isOver()) return;

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
