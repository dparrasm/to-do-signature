import { Document } from "../domain/document";
import { Recipient } from "../domain/recipient";
import { NeedsTo } from "../types";
import { shortenTitle } from "../utils/stringWorker";

const getDate = (date: string): string => {
  const { day, month, year } = {
    day: new Date(date).getDate().toString().padStart(2, "0"),
    month: (new Date(date).getMonth() + 1).toString().padStart(2, "0"),
    year: new Date(date).getFullYear(),
  };

  return `${day}/${month}/${year}`;
};

const getTime = (time: string): string => {
  const { hour, minute } = {
    hour: new Date(time).getHours().toString().padStart(2, "0"),
    minute: new Date(time).getMinutes().toString().padStart(2, "0"),
  };

  return `${hour}:${minute}`;
};

export const useEnvelope = (emailAddress: string, document: Document) => {
  const { title, signed, viewed, lastChange, recipients } = document;
  const truncatedTitle =
    title.length > 30 ? shortenTitle(15, 13, title.length, title) : title;
  const index = recipients.findIndex((r) => r.folder === "SENT");
  if (index !== -1) {
    recipients.splice(index, 1);
  }
  const destinataries =
    recipients?.length > 1
      ? `To: ${recipients[0]?.name} and ${recipients.length - 1} more`
      : `To: ${recipients[0]?.name}`;

  const completed = signed && viewed;
  const getLastChange = {
    date: getDate(lastChange),
    time: getTime(lastChange),
  };
  const needsToSign = recipients.find(
    (r: Recipient) => r.email === emailAddress
  )?.needsToSign;

  const detailedRecipients = recipients.map((r) => {
    return {
      completedName: r.name,
      emailAddress: r.email,
      needsTo: needsToSign ? NeedsTo.Sign : NeedsTo.View,
    };
  });

  return {
    truncatedTitle,
    destinataries,
    completed,
    getLastChange,
    needsToSign,
    detailedRecipients,
  };
};
