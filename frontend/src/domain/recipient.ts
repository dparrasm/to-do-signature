import { Folder } from "../types";

export interface Recipient {
  _id: string;
  name: string;
  email: string;
  needsToSign: boolean;
  needsToView: boolean;
  signed: boolean;
  viewed: boolean;
  folder: Folder;
}
