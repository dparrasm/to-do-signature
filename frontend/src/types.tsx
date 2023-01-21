export const Recipient = {
  name: String,
  email: String,
  needsToSign: Boolean,
  needsToView: Boolean,
  signed: Boolean,
  viewed: Boolean,
  isAuthor: Boolean,
  folder: String,
};
export const Document = {
  lastChange: Date,
  title: String,
  fileContent: String,
  recipients: [Recipient],
  signedBy: [String],
  signed: Boolean,
  viewed: Boolean,
};
