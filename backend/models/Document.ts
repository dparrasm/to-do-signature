import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: String,
  email: String,
  needsToSign: Boolean,
  needsToView: Boolean,
  signed: Boolean,
  viewed: Boolean,
  isAuthor: Boolean,
  folder: String,
});

const DocumentSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  lastChange: Date,
  title: String,
  fileContent: String,
  recipients: [recipientSchema],
  signed: Boolean,
  viewed: Boolean,
});

module.exports = mongoose.model("Document", DocumentSchema);
