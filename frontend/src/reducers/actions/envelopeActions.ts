import {
  ENVELOPE_UPLOAD,
  SIGN_ENVELOPE_DOCUMENTS,
  UPLOAD_ENVELOPE_BY_DOCUMENT_ID,
} from "./types";
import axios from "axios";
import { autofirma } from "../../pages/signing/signDocument/signSetup";

export const uploadEnvelope =
  ({ documents, recipients, email }) =>
  async (dispatch) => {
    const envelope = {
      documents,
      recipients,
      email,
    };
    try {
      dispatch({
        type: ENVELOPE_UPLOAD,
        payload: envelope,
      });
    } catch {
      console.log("Fallo");
    }
  };

export const uploadEnvelopeByDocumentId = (documentId) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const document = await axios.get("/api/document/" + documentId, config);
    const payload = {
      documents: [document.data],
      recipients: document.data?.recipients ? document.data?.recipients : [],
      mail: {},
    };
    dispatch({
      type: UPLOAD_ENVELOPE_BY_DOCUMENT_ID,
      payload: payload,
    });
  } catch (err: any) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      console.log("Error updating envelope by documentId");
    }
  }
};

export const signEnvelopeDocument =
  (document, index, email) => async (dispatch) => {
    try {
      const uploadedDocument = await autofirma(document, email);
      let payload = {
        document: { ...uploadedDocument, isChecked: false },
        index: index,
      };
      dispatch({
        type: SIGN_ENVELOPE_DOCUMENTS,
        payload: payload,
      });
      //We don't need to post the updated envelope here cause this will be done only
      //if the user sends the envelope.
    } catch (e: any) {
      if (e) {
        e.forEach((error) => console.log(error.msg, "error"));
      }
    }
  };
