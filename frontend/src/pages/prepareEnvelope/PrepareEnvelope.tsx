import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "./PrepareEnvelope.scss";
import { Button } from "@material-ui/core";
import Card from "../../components/card/Card";
import RecipientCard from "../../components/recipientCard/RecipientCard";
import DragAndDrop from "../../components/dragAndDrop/DragAndDrop";
import { icons } from "../../utils/icons";
import { rootState } from "../../reducers";
import { useSelector } from "react-redux";
import { uploadEnvelope } from "../../reducers/actions/envelopeActions";
import {
  removeUploadedDocuments,
  unloadDocument,
} from "../../reducers/actions/documentActions";
import Filepicker from "../../components/filepicker/Filepicker";

export default function PrepareEnvelope(props) {
  const dispatch = useDispatch();
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const [recipientId, setRecipientId] = useState(1);
  const [recipients, setRecipient] = useState([
    {
      id: 0,
      name: "",
      email: "",
      needsToSign: true,
      needsToView: true,
      needsTo: "SIGN",
      signed: false,
      viewed: false,
      folder: "INBOX",
    },
  ]);

  const addRecipient = () => {
    setRecipient([
      ...recipients,
      {
        id: recipientId,
        name: "",
        email: "",
        needsToSign: true,
        needsToView: true,
        needsTo: "SIGN",
        signed: false,
        viewed: false,
        folder: "INBOX",
      },
    ]);
    setRecipientId(recipientId + 1);
  };
  const addRecipientsFromList = (recipientsList) => {
    const array: {
      id: number;
      name: string;
      email: string;
      needsToSign: boolean;
      needsToView: boolean;
      needsTo: string;
      signed: boolean;
      viewed: boolean;
      folder: string;
    }[] = [];

    recipientsList.map((r) => {
      array.push({
        id: recipientId + array.length,
        name: r.name,
        email: r.email,
        needsToView: true,
        needsToSign: false,
        needsTo: r.needsTo,
        signed: true,
        viewed: false,
        folder: "INBOX",
      });
    });
    setRecipientId(recipientId + array.length);
    setRecipient(recipients.concat(array));
  };
  const uploadedFiles = useSelector(
    (state: rootState) => state?.document?.uploadedDocuments
  );

  const deleteDocument = (index) => {
    dispatch(unloadDocument(index));
  };

  const updateRecipient = (e) => {
    const id: number = e.target.id.split("#")[1];
    const keyword: String = e.target.id.split("#")[0];
    setRecipient((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id == id) {
          switch (keyword) {
            case "name":
              return { ...obj, name: e.target.value };
            case "email":
              return { ...obj, email: e.target.value };
            default:
              return { ...obj, needsTo: e.target.value };
          }
        } else {
          return obj;
        }
      });
      return newState;
    });
  };
  const removeReceipt = (id) => {
    setRecipient(
      recipients.filter((r) => {
        return r.id !== id;
      })
    );
  };

  const prepareEnvelope = () => {
    let updatedRecipients = recipients.map((r) => {
      if (r.needsTo === "SIGN") {
        return {
          ...r,
          needsToSign: true,
          needsToView: true,
          viewed: false,
          signed: false,
        };
      } else {
        return {
          ...r,
          needsToSign: false,
          needsToView: true,
          viewed: false,
          signed: true,
        };
      }
    });
    const envelope = {
      documents: uploadedFiles,
      recipients: updatedRecipients,
      email: {
        subject: subjectRef?.current
          ? subjectRef?.current["value"]
          : "Empty subject",
        message: messageRef?.current
          ? messageRef?.current["value"]
          : "Empty message",
      },
    };
    dispatch(uploadEnvelope(envelope));
  };
  const handleOnClick = () => {
    dispatch(removeUploadedDocuments());
  };
  return (
    <div className="scroll">
      <div className="close-bar">
        <Link className="cross-button" to="/manage">
          <button onClick={handleOnClick}>X</button>
        </Link>
      </div>
      <div className="container-wrap">
        <div className="add-documents-container">
          <div className="prepare-envelope-titles">
            <h1>Add documents</h1>
          </div>
          {uploadedFiles?.length === 0 ? (
            <div className="document-container">
              <DragAndDrop title="Upload" />
            </div>
          ) : (
            <div className="add-documents-content">
              <div className="document-container">
                <DragAndDrop title="Upload" />
              </div>
              {uploadedFiles.map((doc, index) => (
                <Card
                  key={index}
                  index={index}
                  title={doc?.title}
                  fileContent={doc?.fileContent}
                  deleteDocument={deleteDocument}
                />
              ))}
            </div>
          )}
        </div>
        <div className="add-documents-container">
          <div className="prepare-envelope-titles">
            <h1>Add recipients</h1>
          </div>
          <div className="recipients-container">
            <div className="only-signer">
              <input type="checkbox" id="vehicle1" name="vehicle1" />
              <span>I'm the only signer</span>
            </div>
            {recipients.map((recipient, index) => (
              <RecipientCard
                key={index}
                recipient={recipient}
                removeReceipt={removeReceipt}
                updateRecipient={updateRecipient}
                id={recipient?.id}
                name={recipient?.name}
                email={recipient?.email}
                needsTo={recipient?.needsTo}
              />
            ))}
            <div className="add-recipients-buttons">
              <div className="recipient-button" onClick={addRecipient}>
                <i className={icons.user} />
                <h1>ADD RECIPIENT</h1>
              </div>
              <Filepicker
                title="ADD FROM LIST"
                accept=".xlsx"
                multiple={false}
                addRecipientsFromList={addRecipientsFromList}
              />
            </div>
          </div>
        </div>
        <div className="add-documents-message-container">
          <div className="prepare-envelope-titles">
            <h1>Add message</h1>
          </div>
          <div className="recipients-container">
            <div className="email-subject-container">
              <div className="email-subject">
                <span>Email Subject</span>
                <span className="star">*</span>
              </div>
              <input type="text" ref={subjectRef} />
            </div>
            <div>
              <div>
                <span>Email Message</span>
              </div>
              <textarea
                className="prepare-envelope-email-message"
                ref={messageRef}
              />
            </div>
          </div>
        </div>
        <div className="prepare-envelope-options"></div>
      </div>
      <div className="prepare-envelope-button-actions">
        <Link className="cross-button" onClick={prepareEnvelope} to="/sign">
          <Button className="button-next" variant="contained" color="primary">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}
