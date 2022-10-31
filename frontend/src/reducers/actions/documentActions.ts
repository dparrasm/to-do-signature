import axios from "axios";
import { setAlert } from "./alertActions";
import {
  DOCUMENT_FAIL,
  GET_DOCUMENTS,
  POST_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DOCUMENT,
  SEARCH_DOCUMENT,
} from "./types";

export const loadDocuments = () => async (dispatch) => {
  console.log("Load documents");
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const documents = await axios.get("api/document", config);
    dispatch({
      type: GET_DOCUMENTS,
      payload: documents.data,
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

export const postDocuments =
  ({ author, title, fileContent, receivers, signedBy, signed }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({
      author,
      date: new Date(),
      title,
      fileContent,
      receivers,
      signedBy,
      signed,
    });
    try {
      const doc = await axios.post("api/document", body, config);
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
    const document = await axios.get("api/document/" + id, config);
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
    await axios.delete("api/document/" + id);
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
