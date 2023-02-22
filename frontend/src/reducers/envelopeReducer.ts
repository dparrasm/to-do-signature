import {
  ENVELOPE_UPLOAD,
  SIGN_ENVELOPE_DOCUMENTS,
  UPLOAD_ENVELOPE_BY_DOCUMENT_ID,
} from "./actions/types";

const initialState = {
  documents: [] as any,
  recipients: [] as any,
  email: {
    subject: String,
    message: String,
  },
} as any;

export default function envelopeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ENVELOPE_UPLOAD: {
      return payload;
    }
    case UPLOAD_ENVELOPE_BY_DOCUMENT_ID:
      return payload;
    case SIGN_ENVELOPE_DOCUMENTS: {
      let array = [...state.documents];
      array[payload.index] = payload.document;
      return {
        ...state,
        documents: array,
      };
    }
    default:
      return state;
  }
}
