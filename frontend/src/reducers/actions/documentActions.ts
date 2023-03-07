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
      }
      if (
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
  ({ author, title, fileContent, recipients, signedBy, signed }) =>
  async (dispatch) => {
    const document = {
      author: author,
      title: title,
      fileContent: fileContent,
      recipients: recipients,
      signedBy: signedBy,
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
    // console.log(err);
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

      console.log(JSON.stringify(doc.data));
      const filteredData = doc.data.addedDocuments.map((obj) => {
        const { fileContent, ...rest } = obj;
        return rest;
      });
      console.log(JSON.stringify(filteredData));
      dispatch({
        type: POST_DOCUMENT,
        payload: filteredData,
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
          await axios
            .post("/api/users", userSchema, config)
            .then(() => console.log("hola"));
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
    let signatureB64: string = "";
    const setSignedDocument = async (signedDocument) => {
      try {
        if (signedDocument.certificateB64 !== undefined) {
          await axios.put(
            "/api/document/sign/" + id,
            {
              ...uploadedDocument,
              fileContent:
                "data:application/pdf;base64," + signedDocument?.signatureB64,
            },
            config
          );
          dispatch({
            type: SIGN_DOCUMENT,
            payload: uploadedDocument,
          });
        }
      } catch (e: any) {
        if (e) {
          e.forEach((error) => console.log(error.msg, "error"));
        }
      }

      console.log("añade el application:data/pdf " + signatureB64);
    };
    let originalDocument = await axios.get("/api/document/" + id, config);
    let uploadedDocument = originalDocument.data;
    await autofirma(uploadedDocument.fileContent, setSignedDocument)
      .then(() => {
        const recipients = uploadedDocument.recipients;
        const user = recipients.filter((r) => r.email === email);
        console.log(JSON.stringify(user));
        user.map((u) => {
          let index = recipients.indexOf(u);
          console.log(index);
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
          fileContent: uploadedDocument,
          recipients: recipients,
          signed: signed,
          viewed: viewed,
          isChecked: false,
        };
      })
      .catch(() => console.log("lo intentaste"));

    //await axios.put("/api/document/" + id, config);
  } catch (err: any) {
    console.log("Error sign document");
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
