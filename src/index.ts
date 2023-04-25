import { BLOCK_SESSION } from "./configs/constants";
import Session from "./services/SessionStore";
import { doTemplates, getDatabase } from "./services/doTemplates";
import { executeEmails, prepareEmails } from "./services/transporter";

(async () => {
  const { start, next, isOver, end } = Session();

  start();

  const data = await getDatabase();

  next();

  if (BLOCK_SESSION) return;

  const templates = doTemplates(
    data?.baseTemplate,
    data?.clientsDB,
    data?.defaultFlags
  );

  next();

  if (isOver() || !templates) return;

  const emails = prepareEmails(templates);

  if (isOver()) return;

  await executeEmails(...emails);

  if (!emails) {
    end("FAIL", "Something went wrong while sending the emails");
    return;
  }

  end("SUCCESS", "All emails have been sent successfully");
})();
