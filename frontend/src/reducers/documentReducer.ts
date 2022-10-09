import { DOCUMENT_FAIL, GET_DOCUMENTS, POST_DOCUMENT } from "./actions/types";
const initialState = [] as any;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DOCUMENTS: {
      return payload;
    }
    case POST_DOCUMENT:
      return [...state, ...payload];
    case DOCUMENT_FAIL:
      return state;
    default:
      return state;
  }
}
