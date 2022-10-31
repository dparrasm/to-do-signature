import {
  DOCUMENT_FAIL,
  GET_DOCUMENTS,
  POST_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DOCUMENT,
  SEARCH_DOCUMENT,
} from "./actions/types";

const initialState = {
  documentsLoaded: [] as any,
  readingDocument: {} as any,
} as any;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DOCUMENT: {
      return { ...state, readingDocument: payload };
    }
    case GET_DOCUMENTS:
      return { ...state, documentsLoaded: payload };

    case POST_DOCUMENT:
      return {
        ...state,
        documentsLoaded: state.documentsLoaded.concat(payload.createdDocument),
      };
    case SEARCH_DOCUMENT: {
      return {
        ...state,
        documentsLoaded: state.documentsLoaded.filter((document) =>
          document.title.includes(payload)
        ),
      };
    }
    case DELETE_DOCUMENT:
      return {
        ...state,
        documentsLoaded: state.documentsLoaded.filter(
          (document) => document._id !== payload
        ),
      };
    case DOCUMENT_FAIL:
      return state;
    default:
      return state;
  }
}
