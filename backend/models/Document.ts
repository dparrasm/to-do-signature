import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  author: String,
  date: String,
  title: String,
});

module.exports = mongoose.model("Document", DocumentSchema);
