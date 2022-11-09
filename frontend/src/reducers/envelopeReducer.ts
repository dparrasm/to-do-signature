import { ENVELOPE_UPLOAD } from "./actions/types";

const initialState = {
  documents: [] as any,
  receipts: [] as any,
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
    default:
      return state;
  }
}
