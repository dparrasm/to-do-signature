import { Folder } from "../types";
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
} from "./actions/types";

const initialState = {
  inbox: [] as any,
  sent: [] as any,
  selectedDocuments: [] as any,
  documentsLoaded: [] as any,
  readingDocument: {} as any,
  uploadedDocuments: [] as any,
  searchedDocuments: [] as any,
} as any;
const folders: string[] = ["inbox", "sent"];
const unselectPreviousFolderDocuments = (folder) => {
  let array = folder;
  const checkedElements = folder.filter((s) => s.isChecked === true);
  if (checkedElements.length > 0) {
    checkedElements.map((doc) => {
      let index = array.indexOf(doc);
      array[index].isChecked = false;
    });
  }
  return array;
};
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
    case POST_DOCUMENT: {
      let filteredInbox = [...payload.documentsToPost].filter((doc) =>
        doc.recipients.some((recipient) => recipient.folder === Folder.Inbox)
      );
      filteredInbox = [...state.inbox, ...filteredInbox];
      let filteredSent = [...payload.documentsToPost].filter((doc) =>
        doc.recipients.some((recipient) => recipient.folder === Folder.Sent)
      );
      filteredSent = [...state.sent, ...filteredSent];
      return { ...state, inbox: filteredInbox, sent: filteredSent };
    }
    case SIGN_DOCUMENT: {
      const inbox = state.inbox;
      const filteredInbox = inbox.filter((doc) => doc._id === payload._id);
      const sent = state.sent;
      const filteredSent = sent.filter((doc) => doc._id === payload._id);
      if (filteredInbox?.length > 0) {
        inbox[inbox.indexOf(filteredInbox[0])] = payload;
      }
      if (filteredSent?.length > 0) {
        sent[sent.indexOf(filteredSent[0])] = payload;
      }
      return {
        ...state,
        inbox: inbox,
        sent: sent,
      };
    }
    case UNSEARCH_DOCUMENT: {
      return {
        ...state,
        searchedDocuments: [],
      };
    }
    case SEARCH_DOCUMENT: {
      let array = state[payload.page].filter((doc) =>
        doc.title.includes(payload.title)
      );
      if (payload?.title?.length > 0 && array.length == 0) {
        return {
          ...state,
          searchedDocuments: [],
        };
      } else {
        return {
          ...state,
          searchedDocuments: array,
        };
      }
    }
    case SELECT_ALL_DOCUMENTS: {
      let array = [...state[payload.folder]];
      array = array.map((doc) =>
        doc.isChecked === payload.checkAll
          ? { ...doc, isChecked: !payload.checkAll }
          : doc
      );
      switch (payload.folder) {
        case "inbox":
          return {
            ...state,
            inbox: array,
            selectedDocuments: array,
          };
        default:
          return {
            ...state,
            sent: array,
            selectedDocuments: array,
          };
      }
    }
    case SEND_UNSIGNED_DOCUMENT_REMINDER:
    case UNSELECT_DOCUMENTS: {
      let foldersToUpdate = folders.filter((f) => f === payload.folder);
      let auxObject = {};
      foldersToUpdate.map((f) => {
        auxObject[f] = unselectPreviousFolderDocuments(state[f]);
      });
      return {
        ...state,
        selectedDocuments: [],
      };
    }
    case SELECT_DOCUMENT: {
      let array = state[payload.folder];
      let documentToUpdate = array.find(
        (document) => document._id === payload.id
      );
      let index = array.indexOf(documentToUpdate);

      documentToUpdate = {
        ...documentToUpdate,
        isChecked: !documentToUpdate.isChecked,
      };
      array[index] = documentToUpdate;

      switch (payload.folder) {
        case "inbox":
          return {
            ...state,
            inbox: array,
            selectedDocuments: array.filter((doc) => doc.isChecked === true),
          };
        default:
          return {
            ...state,
            sent: array,
            selectedDocuments: array.filter((doc) => doc.isChecked === true),
          };
      }
    }
    case DELETE_DOCUMENT: {
      let array = [...state.inbox];
      const inbox = array.filter((doc) => doc._id !== payload.id);
      array = [...state.sent];
      const sent = array.filter((document) => document._id !== payload.id);
      return {
        ...state,
        inbox: inbox,
        sent: sent,
      };
    }
    case REMOVE_UPLOADED_DOCUMENTS: {
      return {
        ...state,
        uploadedDocuments: [],
      };
    }
    case RESET_DOCUMENTS_STATE:
      return {
        ...initialState,
      };
    case DOCUMENT_FAIL:
      return state;
    default:
      return state;
  }
}
