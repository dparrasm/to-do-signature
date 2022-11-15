import { ENVELOPE_UPLOAD } from "./types";

export const uploadEnvelope =
  ({ documents, recipients, email }) =>
  async (dispatch) => {
    const envelope = {
      documents,
      recipients,
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
