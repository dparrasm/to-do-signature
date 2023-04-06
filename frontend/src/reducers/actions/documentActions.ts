import axios from "axios";
import { autofirma } from "../../pages/signing/signDocument/signSetup";
import { setAlert } from "./alertActions";
import {
  DOCUMENT_FAIL,
  GET_DOCUMENTS,
  POST_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DOCUMENT,
  SEARCH_DOCUMENT,
  UPLOAD_DOCUMENT,
  UNLOAD_DOCUMENT,
  SELECT_DOCUMENT,
  SELECT_ALL_DOCUMENTS,
  UNSELECT_DOCUMENTS,
  SIGN_DOCUMENT,
  UNSEARCH_DOCUMENT,
  REMOVE_UPLOADED_DOCUMENTS,
  SEND_UNSIGNED_DOCUMENT_REMINDER,
  RESET_DOCUMENTS_STATE,
} from "./types";
import { Document } from "../../domain/document";
import { Folder } from "../../types";

export const loadDocuments = (userId) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const documents = await axios.get("/api/document/buscar/" + userId, config);
    const folders = {
      inbox: [],
      sent: [],
    };

    documents.data.map((doc) => {
      doc.isChecked = false;
      if (
        doc.recipients.filter((r) => r.folder == Folder.Inbox && r.email === userId)
          ?.length > 0
      ) {
        folders.inbox.push(doc);
      }
      if (
        doc.recipients.filter((r) => r.folder == Folder.Sent && r.email === userId)
          ?.length > 0
      ) {
        folders.sent.push(doc);
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
  ({ author, title, fileContent, recipients, signed }) =>
  async (dispatch) => {
    const document = {
      author: author,
      title: title,
      fileContent: fileContent,
      recipients: recipients,
      signed: signed,
    };

    try {
      dispatch({
        type: UPLOAD_DOCUMENT,
        payload: document,
      });
    } catch {
      console.log("Upload document error");
    }
  };

export const unloadDocument = (index) => async (dispatch) => {
  try {
    dispatch({
      type: UNLOAD_DOCUMENT,
      payload: index,
    });
  } catch {
    console.log("Unload document error");
  }
};

export const removeUploadedDocuments = () => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_UPLOADED_DOCUMENTS,
      payload: [],
    });
  } catch (err: any) {
    console.log("Error removing uploaded documents");
  }
};
export const postDocuments =
  ({ documents, signed, viewed, recipients, lastChange, email }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({
      documents,
      signed,
      viewed,
      recipients,
      lastChange,
      email,
    });

    try {
      const doc = await axios.post("/api/document", body, config);
      const filteredData = doc.data.addedDocuments.map((obj) => {
        const { fileContent, ...rest } = obj;
        return rest;
      });
      dispatch({
        type: POST_DOCUMENT,
        payload: { documentsToPost: filteredData, user: email },
      });

      const recipientSet = [...new Set(recipients.map((r) => r?.email))];
      const notRegisteredRecipients = await axios.post(
        "/api/users/notRegisteredRecipients",
        JSON.stringify(recipientSet),
        config
      );
      if (notRegisteredRecipients && notRegisteredRecipients.length > 0) {
        notRegisteredRecipients.map(async (r) => {
          let userSchema = JSON.stringify({
            name: "",
            surname: "",
            email: r.user,
            password: r.password,
          });
          await axios.post("/api/users", userSchema, config);
        });
      }
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => console.log(error));
        errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
      }
      dispatch({
        type: DOCUMENT_FAIL,
      });
    }
  };
export const signDocument = (id, email) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const originalDocument = await axios.get("/api/document/" + id, config);
    let uploadedDocument: Document = await autofirma(originalDocument.data, email);
    await axios.put("/api/document/sign/" + id, uploadedDocument, config);
    dispatch({
      type: SIGN_DOCUMENT,
      payload: { ...uploadedDocument, isChecked: false },
    });
  } catch (err: any) {
    console.log("Error signing document");
  }
};
export const downloadDocument = (id) => async () => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const documentToDownload = await axios.get("/api/document/" + id, config);
    const a = document.createElement("a");
    a.href = documentToDownload.data.fileContent;
    a.download = documentToDownload.data.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err: any) {}
};
export const getDocument = (id) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const document = await axios.get("/api/document/" + id, config);
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
export const searchDocument = (title, page) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_DOCUMENT,
      payload: { title: title, page: page },
    });
  } catch {
    console.log("Search document error");
  }
};
export const unsearchDocuments = () => async (dispatch) => {
  try {
    dispatch({
      type: UNSEARCH_DOCUMENT,
    });
  } catch {
    console.log("UnsearchDocuments error");
  }
};

export const selectAllDocuments = (folder, checkAll) => async (dispatch) => {
  console.log("folder: " + folder + " checkAll : " + checkAll);
  try {
    dispatch({
      type: SELECT_ALL_DOCUMENTS,
      payload: { folder: folder, checkAll: checkAll },
    });
  } catch (err: any) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      console.log("Documents could not be selected");
    }
  }
};

export const selectDocument = (id, folder) => async (dispatch) => {
  try {
    dispatch({
      type: SELECT_DOCUMENT,
      payload: { id: id, folder: folder },
    });
  } catch (err: any) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      console.log("Document could not be selected");
    }
  }
};

export const unselectDocuments = (folder) => async (dispatch) => {
  try {
    dispatch({
      type: UNSELECT_DOCUMENTS,
      payload: { folder: folder },
    });
  } catch (err: any) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      console.log("Document could not be unselected");
    }
  }
};
export const deleteDocument = (id, folder) => async (dispatch) => {
  try {
    await axios.delete("/api/document/" + id);
    dispatch({
      type: DELETE_DOCUMENT,
      payload: { id: id, folder: folder },
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

export const sendUnsignedDocumentsReminder =
  (selectedDocuments, folder) => async (dispatch) => {
    console.log(JSON.stringify(selectedDocuments));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(selectedDocuments);
    try {
      await axios.post("/api/document/unsignedDocumentsReminder", body, config);
      dispatch({
        type: SEND_UNSIGNED_DOCUMENT_REMINDER,
        payload: { folder: folder },
      });
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => console.log((error.msg, "error")));
      }
    }
  };

export const resetDocumentsState = async (dispatch) => {
  try {
    dispatch({
      type: RESET_DOCUMENTS_STATE,
    });
  } catch (e: any) {
    console.log("Error imposible to reset documents state");
  }
};
