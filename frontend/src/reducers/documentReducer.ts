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
      const currentDocuments = [
        state.documentsLoaded,
        ...payload.addedDocuments,
      ];
      const currentInboxDocuments = [state.inbox, ...payload.addedDocuments];
      return {
        ...state,
        documentsLoaded: currentDocuments,
        inbox: currentInboxDocuments,
      };
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
      console.log(JSON.stringify(payload));
      return {
        ...state,
        inbox: inbox,
        sent: sent,
      };
    }
    case SEARCH_DOCUMENT: {
      let array = state.documentsLoaded.filter((document) =>
        document.title.includes(payload)
      );
      return {
        ...state,
        searchedDocuments: array,
      };
    }
    case SELECT_ALL_DOCUMENTS: {
      let array = state[payload.folder];
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
          };
        default:
          return {
            ...state,
            sent: array,
          };
      }
    }
    case UNSELECT_DOCUMENTS: {
      console.log("qué pasó");
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
