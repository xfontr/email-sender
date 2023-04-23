// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer, { Transporter, TransportOptions } from "nodemailer";
import ENVIRONMENT from "../configs/environment";
import EMAIL_OPTIONS from "../configs/emailOptions";
import Session from "./SessionStore";

const { end } = Session();

const { email } = ENVIRONMENT;

const transporterOptions: TransportOptions = {
  ...email,
  ...EMAIL_OPTIONS,
} as TransportOptions;

export const createTransporter = () =>
  nodemailer.createTransport(transporterOptions);

export const verifyConnection = (transporter: Transporter) => {
  transporter.verify((error) => {
    if (error) {
      end("FAIL", "Could not verify the server connection");
    }
  });
};
