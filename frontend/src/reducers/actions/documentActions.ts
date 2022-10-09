import axios from "axios";
import { setAlert } from "./alertActions";
import { DOCUMENT_FAIL, GET_DOCUMENTS, POST_DOCUMENT } from "./types";

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
  ({ author, creationDate, title }) =>
  async (dispatch) => {
    console.log("TITLE" + title);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ author, creationDate, title });

    try {
      // debugger;
      const doc = await axios.post("api/document", body, config);
      console.log("POST_DOCUMENT: " + JSON.stringify(doc));
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
