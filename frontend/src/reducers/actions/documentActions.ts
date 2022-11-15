import axios from "axios";
import { stringify } from "uuid";
import { setAlert } from "./alertActions";
import {
  DOCUMENT_FAIL,
  GET_DOCUMENTS,
  POST_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DOCUMENT,
  SEARCH_DOCUMENT,
  UPLOAD_DOCUMENT,
} from "./types";

export const loadDocuments = (userId) => async (dispatch) => {
  console.log("hola");
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const documents = await axios.get("/api/document/buscar/" + userId, config);
    const folders = {
      inbox: [],
      sent: [],
      draft: [],
      deleted: [],
    };

    documents.data.map((doc) => {
      if (
        doc.recipients.filter((r) => r.folder == "INBOX" && r.email === userId)
          ?.length > 0
      ) {
        folders.inbox.push(doc);
      } else if (
        doc.recipients.filter((r) => r.folder == "SENT" && r.email === userId)
          ?.length > 0
      ) {
        folders.sent.push(doc);
      } else if (
        doc.recipients.filter((r) => r.folder == "DRAFT" && r.email === userId)
          ?.length > 0
      ) {
        folders.draft.push(doc);
      } else if (
        doc.recipients.filter(
          (r) => r.folder == "DELETED" && r.email === userId
        )?.length > 0
      ) {
        folders.deleted.push(doc);
      }
    });

    dispatch({
      type: GET_DOCUMENTS,
      payload: folders,
    });
  } catch (e: any) {
    const errors = e?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: DOCUMENT_FAIL,
    });
  }
};
export const uploadDocument =
  ({ author, title, fileContent, receivers, signedBy, signed }) =>
  async (dispatch) => {
    const document = {
      author: author,
      title: title,
      fileContent: fileContent,
      receivers: receivers,
      signedBy: signedBy,
      signed: signed,
    };

    try {
      dispatch({
        type: UPLOAD_DOCUMENT,
        payload: document,
      });
    } catch {
      console.log("Fallo");
    }
  };

export const postDocuments =
  ({ title, fileContent, signedBy, signed, viewed, recipients, lastChange }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log("lastChange: " + lastChange);
    const body = JSON.stringify({
      title,
      fileContent,
      signedBy,
      signed,
      viewed,
      recipients,
      lastChange,
    });
    try {
      const doc = await axios.post("/api/document", body, config);
      dispatch({
        type: POST_DOCUMENT,
        payload: doc.data,
      });
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
      }
      dispatch({
        type: DOCUMENT_FAIL,
      });
    }
  };

export const getDocument = (id) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const document = await axios.get("/api/document/" + id, config);
    console.log(document);
    dispatch({
      type: GET_DOCUMENT,
      payload: document.data,
    });
  } catch (err: any) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: DOCUMENT_FAIL,
    });
  }
};
export const searchDocument = (title) => async (dispatch) => {
  console.log("Title:" + title);
  try {
    dispatch({
      type: SEARCH_DOCUMENT,
      payload: title,
    });
  } catch {
    console.log("Fallo");
  }
};

export const deleteDocument = (id) => async (dispatch) => {
  try {
    await axios.delete("/api/document/" + id);
    dispatch({
      type: DELETE_DOCUMENT,
      payload: id,
    });
  } catch (err: any) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: DOCUMENT_FAIL,
    });
  }
};
