import "../loadEnvironment";

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
};

export default ENVIRONMENT;
