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

export default function PrepareEnvelope(props) {
  const dispatch = useDispatch();
  const [recipients, setRecipient] = useState([
    {
      id: 0,
      name: "",
      email: "",
      needsTo: "SIGN",
      folder: "INBOX",
    },
  ]);
  const addRecipient = () => {
    const id = recipients.length;
    setRecipient([
      ...recipients,
      {
        id: id,
        name: "",
        email: "",
        needsTo: "SIGN",
        folder: "INBOX",
      },
    ]);
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
  const uploadedFiles = useSelector(
    (state: rootState) => state?.document?.uploadedDocuments
  );
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const prepareEnvelope = () => {
    const envelope = {
      documents: uploadedFiles,
      recipients: recipients,
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

  return (
    <div className="scroll">
      <div className="close-bar">
        <Link className="cross-button" to="/manage">
          <button>X</button>
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
              {uploadedFiles.map((doc) => (
                <Card title={doc?.title} fileContent={doc?.fileContent} />
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
                index={index}
                updateRecipient={updateRecipient}
              />
            ))}
            <div className="add-recipients-buttons">
              <div className="recipient-button" onClick={addRecipient}>
                <i className={icons.user} />
                <h1>ADD RECIPIENT</h1>
              </div>
              <div className="recipient-button">
                <i className={icons.spreadsheet} />
                <h1>ADD FROM LIST</h1>
              </div>
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
