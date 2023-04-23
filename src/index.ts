import Session from "./services/SessionStore";
import { doTemplates, getDatabase } from "./services/doTemplates";
import prepareEmails from "./services/transporter";

(async () => {
  const { start, next, isOver } = Session();

  start();

  const { baseTemplate, clientsDB } = await getDatabase();

  next();

  const templates = doTemplates(baseTemplate, clientsDB);

  next();

  if (isOver() || !templates) return;

  prepareEmails(templates);
})();
