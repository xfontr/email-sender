import Session from "./services/SessionStore";
import doTemplates from "./services/doTemplates";

(async () => {
  const { start, next, isOver } = Session();

  start();

  const templates = await doTemplates();

  next();

  if (isOver()) return;

  console.log(templates);
})();
