import axios from "axios";
import { setAlert } from "./alertActions";
import { autofirma } from "../../pages/signing/signDocument/signSetup";
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
} from "./types";

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
        doc.recipients.filter((r) => r.folder == "INBOX" && r.email === userId)
          ?.length > 0
      ) {
        folders.inbox.push(doc);
      } else if (
        doc.recipients.filter((r) => r.folder == "SENT" && r.email === userId)
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

export const unloadDocument = (index) => async (dispatch) => {
  try {
    dispatch({
      type: UNLOAD_DOCUMENT,
      payload: index,
    });
  } catch {
    console.log("Fallo");
  }
};

export const postDocuments =
  ({ documents, signedBy, signed, viewed, recipients, lastChange, email }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({
      documents,
      signedBy,
      signed,
      viewed,
      recipients,
      lastChange,
      email,
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
export const signDocument = (id, email) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const documentToDownload = await axios.get("/api/document/" + id, config);
    //HAY QUE ACTUALIZAR EL FILE CONTENT
    //autofirma(documentToDownload.data.fileContent);
    let uploadedDocument = documentToDownload.data;
    const recipients = uploadedDocument.recipients;
    const user = recipients.filter((r) => r.email === email);
    console.log(JSON.stringify(user));
    user.map((u) => {
      let index = recipients.indexOf(u);
      recipients[index].signed = true;
      recipients[index].viewed = true;
    });
    const signed =
      recipients.filter((r) => r.signed === true).length === recipients.length
        ? true
        : false;
    const viewed =
      recipients.filter((r) => r.viewed === true).length === recipients.length
        ? true
        : false;
    uploadedDocument = {
      ...uploadedDocument,
      recipients: recipients,
      signed: signed,
      viewed: viewed,
    };
    dispatch({
      type: SIGN_DOCUMENT,
      payload: uploadedDocument,
    });
    //await axios.put("/api/document/" + id, config);
  } catch (err: any) {
    console.log("Casi pero no");
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
