import { SET_ALERT, REMOVE_ALERT } from "./actions/types";
const initialState = [] as any;

export default function alertReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => (alert.id as any) !== payload);
    default:
      return state;
  }
}
