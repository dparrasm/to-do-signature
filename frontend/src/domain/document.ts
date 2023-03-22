import { Recipient } from "./recipient";

export interface Document {
  id: string;
  title: string;
  fileContent: string;
  lastChange: string;
  recipients: Array<Recipient>;
  viewed: boolean;
  signed: boolean;
}
