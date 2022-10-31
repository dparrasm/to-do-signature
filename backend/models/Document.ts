import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  author: String,
  date: Date,
  title: String,
  fileContent: String,
  receivers: [String],
  signedBy: [String],
  signed: Boolean,
});

module.exports = mongoose.model("Document", DocumentSchema);
