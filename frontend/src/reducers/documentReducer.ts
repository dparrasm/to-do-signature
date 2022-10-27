import {
  DOCUMENT_FAIL,
  GET_DOCUMENTS,
  POST_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DOCUMENT,
} from "./actions/types";
const initialState = [] as any;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DOCUMENT: {
      return { ...state, readingDocument: payload };
    }
    case GET_DOCUMENTS:
      return { ...state, payload };
    case POST_DOCUMENT:
      return state.concat(payload.createdDocument);
    case DELETE_DOCUMENT:
      return state.filter((document) => document._id !== payload);
    case DOCUMENT_FAIL:
      return state;
    default:
      return state;
  }
}
