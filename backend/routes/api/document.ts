import express from "express";
import mongoose from "mongoose";

const router = express.Router();
const { sendEmail } = require("../../middleware/email");
const Document = require("../../models/Document");

// @route   GET api/document
// @desc    Test route
// @access  Public

router.get("/buscar/:email", (req, res, next) => {
  console.log("Pasaba por aquí");
  Document.find({ recipients: { $elemMatch: { email: req.params.email } } })
    .select("-fileContent")
    .exec()
    .then((docs) => {
      const docsNoFileContent = docs.map(({ fileContent, ...docs }) => docs);
      console.log(docsNoFileContent);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// @route   GET api/document/title
// @desc    Test route
// @access  Public

router.get("/:id", (req, res, next) => {
  Document.findById(req.params.id)
    .exec()
    .then((docs) => {
      console.log("hola");
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// @route   POST api/document
// @desc    Test route
// @access  Public

router.post("/", (req, res, next) => {
  const document = new Document({
    _id: new mongoose.Types.ObjectId(),
    lastChange: req.body.lastChange,
    title: req.body.title,
    fileContent: req.body.fileContent,
    recipients: req.body.recipients,
    signedBy: req.body.signedBy,
    signed: req.body.signed,
    viewed: req.body.viewed,
  });

  document
    .save()
    .then((result) => {
      console.log("Document: " + result.title + "loaded");
      sendEmail("dparrasmartinez@gmail.com");
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    message: "Handling POST request to /documents",
    createdDocument: document,
  });
});

// @route   DELETE api/document
// @desc    Test route
// @access  Public

router.delete("/:id", (req, res, next) => {
  Document.findByIdAndRemove(req.params.id)
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
