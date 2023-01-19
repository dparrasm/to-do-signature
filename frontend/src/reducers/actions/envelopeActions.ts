import { ENVELOPE_UPLOAD, UPLOAD_ENVELOPE_BY_DOCUMENT_ID } from "./types";
import axios from "axios";

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
      recipients: document.data?.receivers ? document.data?.receivers : [],
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
