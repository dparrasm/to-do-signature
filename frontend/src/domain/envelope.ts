import { Recipient } from "./recipient";

export interface Envelope {
  documents: Array<Document>;
  recipients: Array<Recipient>;
  emailMessage: { subject: string; content: string };
}
