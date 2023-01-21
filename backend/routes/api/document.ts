import express from "express";
import mongoose from "mongoose";

const router = express.Router();
const { sendEmail } = require("../../middleware/email");
const Document = require("../../models/Document");

// @route   GET api/document
// @desc    Test route
// @access  Public

router.get("/buscar/:email", (req, res, next) => {
  Document.find({ recipients: { $elemMatch: { email: req.params.email } } })
    .select("-fileContent")
    .exec()
    .then((docs) => {
      const docsNoFileContent = docs.map(({ fileContent, ...docs }) => docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
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
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// @route   POST api/document
// @desc    Test route
// @access  Public

router.post("/", (req, res, next) => {
  const documentsArray = req?.body?.documents;
  let cont = 1;
  documentsArray.map((d) => {
    let document = new Document({
      _id: new mongoose.Types.ObjectId(),
      lastChange: req.body.lastChange,
      title: d.title,
      fileContent: d.fileContent,
      recipients: req.body.recipients,
      signedBy: req.body.signedBy,
      signed: req.body.signed,
      viewed: req.body.viewed,
    });
    document.save().catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  });

  const recipients = req.body.recipients;
  recipients?.map((r) => {
    sendEmail(r.email, req?.body?.email, documentsArray);
  });

  res.status(201).json({
    message: "Handling POST request to /documents",
    addedDocuments: documentsArray,
  });
});

// @route   PUT api/document
// @desc    Test route
// @access  Public

router.put("/sign/:id", (req, res, next) => {
  console.log("actualizando tu documento");

  Document.findByIdAndUpdate(req.params.id, req.body.document)
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  res.status(201).json({
    message: "Handling PUT request to /documents",
  });
});

// @route   DELETE api/document
// @desc    Test route
// @access  Public

router.delete("/:id", (req, res, next) => {
  Document.findByIdAndRemove(req.params.id)
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
