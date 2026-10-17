import type { ContactInput } from '@portfolio/contracts';

interface Mail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}

export type SendMail = (mail: Mail) => Promise<void>;

/** Header values on one line: a name cannot inject extra mail headers. */
const singleLine = (value: string): string => value.replace(/[\r\n]+/g, ' ');

/** Plain-text mail to the site owner; replying answers the visitor directly. */
export function contactMail(input: ContactInput, to: string): Mail {
  return {
    to,
    replyTo: input.email,
    subject: `Portfolio : message de ${singleLine(input.name)}`,
    text: `${singleLine(input.name)} <${input.email}>\n\n${input.message}`,
  };
}
