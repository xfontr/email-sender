import "../loadEnvironment";

const { env } = process;

const ENVIRONMENT = {
  debug: env.DEBUG ?? "*",
};

export default ENVIRONMENT;
