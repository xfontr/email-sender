/* eslint-disable no-param-reassign */
import { ABORT_ON_TEMPLATE_ERROR } from "../configs/constants";
import { Session as ISession } from "../types/Session";
import { setDebug } from "../utils/debug";

const debug = setDebug("session");

const sessionStore = new WeakMap<ISession, ISession>();

let key: ISession;

const Session = () => {
  const current = () => sessionStore.get(key);

  const setStatus = (status: ISession["status"], state?: string) => {
    const session = current();

    session.status = status;
    session.state = state || session.state;

    if (session.status !== "FAIL" && session.status !== "SUCCESS") {
      debug("misc", `${status}: ${session.state}`);
    }

    sessionStore.set(key, session);
  };

  const end = (status: "FAIL" | "SUCCESS", endReason: string) => {
    setStatus(status, endReason);

    if (status === "FAIL") {
      debug("highError", "Session aborted");
      debug("information", endReason);
      return;
    }

    debug("highSuccess", "Session completed successfully");
    debug("information", endReason);
  };

  const isOver = () =>
    current().status === "FAIL" || current().status === "SUCCESS";

  const logFailedTemplate = (index: number, reason: string = "unknown") => {
    const session = current();

    session.templateGeneration.failedAttempts += 1;
    session.templateGeneration.failedTemplates.push({
      index,
      reason,
    });

    sessionStore.set(key, session);
  };

  const logFailedTemplates = () => {
    const session = current();

    if (session.templateGeneration.failedAttempts === 0) return;

    session.templateGeneration.failedTemplates.forEach(({ index, reason }) => {
      debug("information", `Index: ${index} || Reason: ${reason || "Unknown"}`);
    });
  };

  const next = () => {
    const session = current();

    if (isOver()) return;

    if (session.status === "INIT") {
      setStatus("DATABASE", "Accessing data");
      return;
    }

    if (session.status === "DATABASE") {
      setStatus("TEMPLATES", "Generating templates");
      return;
    }

    if (
      session.status === "TEMPLATES" &&
      ABORT_ON_TEMPLATE_ERROR &&
      session.templateGeneration.failedAttempts > 0
    ) {
      debug("error", "Failed templates: ");

      logFailedTemplates();

      end(
        "FAIL",
        `Couldn't send emails, as ${session.templateGeneration.failedAttempts} templates failed`
      );

      return;
    }

    if (
      session.status === "TEMPLATES" &&
      (!ABORT_ON_TEMPLATE_ERROR ||
        session.templateGeneration.failedAttempts === 0)
    ) {
      logFailedTemplates();

      setStatus(
        "CONNECTING",
        "Templates prepared successfully. Connecting to the account and preparing to send emails"
      );

      return;
    }

    if (session.status === "CONNECTING") {
      setStatus("SENDING", "Sending emails");
    }
  };

  const start = () => {
    debug("success", "Starting a new session...");

    const sessionKey: ISession = {
      status: "INIT",
      state: "Reading the database",
      templateGeneration: {
        failedAttempts: 0,
        failedTemplates: [],
      },
      startTime: new Date(),
    };

    sessionStore.set(sessionKey, sessionKey);
    key = sessionKey;

    next();
  };

  return {
    start,
    end,
    isOver,
    next,
    setStatus,
    logFailedTemplate,
  };
};

export default Session;
