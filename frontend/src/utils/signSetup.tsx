export const autofirma = (document) => {
  AutoScript.cargarAppAfirma();
  try {
    AutoScript.sign(
      document,
      "SHA512withRSA",
      "PAdES",
      null,
      firmaCorrectaCallback,
      firmaErrorCallback
    );
  } catch (e) {
    firmaErrorCallback(AutoScript.getErrorType(), AutoScript.getErrorMessage());
  }
  function firmaErrorCallback(type, message) {
    console.log("error type: " + type);
    console.log("message: " + message);
  }

  function firmaCorrectaCallback() {
    console.log();
  }
};
