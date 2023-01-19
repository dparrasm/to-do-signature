import {
  ENVELOPE_UPLOAD,
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
    default:
      return state;
  }
}
