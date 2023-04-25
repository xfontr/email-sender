import Email from "./Email";

type Message = {
  from: `${string} <${Email}>`;
  to: Email;
  subject: string;
  html: string;
};

export default Message;
