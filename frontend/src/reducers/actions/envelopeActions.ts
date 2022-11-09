import { ENVELOPE_UPLOAD } from "./types";

export const uploadEnvelope =
  ({ documents, receitps, email }) =>
  async (dispatch) => {
    const envelope = {
      documents,
      receitps,
      email,
    };
    try {
      dispatch({
        type: ENVELOPE_UPLOAD,
        payload: envelope,
      });
    } catch {
      console.log("Fallo");
    }
  };
