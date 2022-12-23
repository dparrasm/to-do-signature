import {
  DOCUMENT_FAIL,
  GET_DOCUMENTS,
  POST_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DOCUMENT,
  SEARCH_DOCUMENT,
  UPLOAD_DOCUMENT,
  UNLOAD_DOCUMENT,
} from "./actions/types";

const initialState = {
  inbox: [] as any,
  sent: [] as any,
  documentsLoaded: [] as any,
  readingDocument: {} as any,
  uploadedDocuments: [] as any,
  searchedDocuments: [] as any,
} as any;

export default function documentReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DOCUMENT: {
      return { ...state, readingDocument: payload };
    }
    case GET_DOCUMENTS: {
      return {
        ...state,
        inbox: payload.inbox,
        sent: payload.sent,
      };
    }
    case UPLOAD_DOCUMENT:
      return {
        ...state,
        uploadedDocuments: state.uploadedDocuments.concat(payload),
      };
    case UNLOAD_DOCUMENT: {
      let array = [...state.uploadedDocuments];
      array.splice(payload, 1);
      return {
        ...state,
        uploadedDocuments: array,
      };
    }
    case POST_DOCUMENT:
      return {
        ...state,
        documentsLoaded: state.documentsLoaded.concat(payload.createdDocument),
        inbox: state.inbox.concat(payload.createdDocument),
      };
    case SEARCH_DOCUMENT: {
      return {
        ...state,
        searchedDocuments: state.documentsLoaded.filter((document) =>
          document.title.includes(payload)
        ),
      };
    }
    case DELETE_DOCUMENT: {
      let array = state[payload.folder];
      array = array.filter((document) => document._id !== payload.id);
      switch (payload.folder) {
        case "inbox":
          return {
            ...state,
            inbox: array,
          };
        default:
          return {
            ...state,
            sent: array,
          };
      }
    }
    case DOCUMENT_FAIL:
      return state;
    default:
      return state;
  }
}
