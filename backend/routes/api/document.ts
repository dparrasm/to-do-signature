import express from "express";
import mongoose from "mongoose";
import { unsignedDocumentsReminder } from "../../utils/emailMessages";

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
  let savedDocuments: {
    _id: string;
    lastChange: string;
    title: string;
    fileContent: string;
    recipients: any[];
    signed: boolean;
    viewed: boolean;
  }[] = [];

  documentsArray.map((d) => {
    let document = new Document({
      _id: new mongoose.Types.ObjectId(),
      lastChange: req.body.lastChange,
      title: d.title,
      fileContent: d.fileContent,
      recipients: req.body.recipients,
      signed: req.body.signed,
      viewed: req.body.viewed,
    });

    const savedDocument = document.toObject();
    const { fileContent, ...rest } = savedDocument;
    savedDocuments.push(rest);

    document.save().catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  });

  const recipients = req.body.recipients;
  recipients?.map((r) => {
    sendEmail(r.email, req?.body?.email);
  });

  res.status(201).json({
    message: "Handling POST request to /documents",
    addedDocuments: savedDocuments,
  });
});

// @route   PUT api/document
// @desc    Test route
// @access  Public

router.put("/sign/:id", (req, res, next) => {
  Document.findByIdAndUpdate(req.params.id, req.body)
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

// @route   POST api/document
// @desc    Test route
// @access  Public
router.post("/unsignedDocumentsReminder", (req, res, next) => {
  let documentsArray = req?.body;
  const result: { email: string; titles: string[] }[] = [];

  documentsArray.forEach((document) => {
    document.recipients.forEach((recipient) => {
      if (!recipient.signed || recipient.viewed) {
        const existingUser = result.find(
          (user) => user.email === recipient.email
        );
        if (existingUser) {
          existingUser.titles.push(document.title);
        } else {
          result.push({
            email: recipient.email,
            titles: [document.title],
          });
        }
      }
    });
  });
  console.log("Result: " + JSON.stringify(result));
  result?.map((r) => {
    sendEmail(
      r.email,
      unsignedDocumentsReminder(r.titles.join("\n")),
      documentsArray
    );
  });
  res.status(201).json({
    message: "Handling POST request to /documents",
    addedDocuments: documentsArray,
  });
});
module.exports = router;
