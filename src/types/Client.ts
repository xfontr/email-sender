import Email from "./Email";

type Client = {
  subject: string;
  contactData: {
    email: Email;
  };
};

export default Client;
