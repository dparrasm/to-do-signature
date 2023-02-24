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

export const signEnvelopeDocument =
  (document, index, email) => async (dispatch) => {
    try {
      const setSignedDocument = async (signedDocument) => {
        try {
          if (signedDocument.certificateB64 !== undefined) {
            console.log(
              "uploaded document: " + JSON.stringify(uploadedDocument)
            );
            uploadedDocument = {
              ...uploadedDocument,
              fileContent:
                "data:application/pdf;base64," + signedDocument?.signatureB64,
            };
            let payload = { document: uploadedDocument, index: index };
            dispatch({
              type: SIGN_ENVELOPE_DOCUMENTS,
              payload: payload,
            });
          }
        } catch (e: any) {
          if (e) {
            e.forEach((error) => console.log(error.msg, "error"));
          }
        }
      };
      let uploadedDocument = { ...document };
      await autofirma(uploadedDocument.fileContent, setSignedDocument)
        .then(() => {
          const recipients = uploadedDocument.recipients;
          const user = recipients.filter((r) => r.email === email);
          console.log(JSON.stringify(user));
          user.map((u) => {
            let index = recipients.indexOf(u);
            recipients[index] = {
              ...recipients[index],
              signed: true,
              viewed: true,
              needsToSign: false,
              needsToView: false,
            };
          });

          const signed = recipients.every(
            (r) => r.signed === true && r.viewed === true
          );
          const viewed = !recipients.some(
            (r) => r.signed === false || r.viewed === false
          );
          uploadedDocument = {
            ...uploadedDocument,
            recipients: recipients,
            signed: signed,
            viewed: viewed,
            isChecked: false,
          };
        })
        .catch(() => console.log("lo intentaste"));
    } catch (e: any) {
      if (e) {
        e.forEach((error) => console.log(error.msg, "error"));
      }
    }
  };
