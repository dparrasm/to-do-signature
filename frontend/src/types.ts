export enum Folder {
  Inbox = "INBOX",
  Sent = "SENT",
}

export enum NeedsTo {
  Sign = "SIGN",
  View = "VIEW",
}

export enum EnvelopeActions {
  Sign = "SIGN",
  View = "VIEW",
  Delete = "DELETE",
  Download = "DOWNLOAD",
}
export type PdfBase64 = string;

export enum EnvelopeState {
  Completed = "completed",
  WaitingForOthers = "waiting-for-others",
  Pending = "pending",
}
