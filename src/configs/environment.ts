import "../loadEnvironment";
import Email from "../types/Email";

const { env } = process;

const ENVIRONMENT = {
  debug: env.DEBUG ?? "*",
  email: {
    host: env.EMAIL_HOST ?? "",
    port: env.EMAIL_PORT ?? "",
    auth: {
      user: env.EMAIL_USERNAME ?? "",
      pass: env.EMAIL_PASSWORD ?? "",
    },
  },
  emailAddress: env.EMAIL_ADDRESS as Email,
  userName: env.USER_NAME ?? "",
};

export default ENVIRONMENT;
