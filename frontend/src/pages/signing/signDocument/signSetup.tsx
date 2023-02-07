export const autofirma = async (dataB64, setSignedDocument) => {
  let signedDocument = { signatureB64: "", certificateB64: "" };
  AutoScript.checkTime(AutoScript.CHECKTIME_RECOMMENDED, 300000);
  AutoScript.cargarAppAfirma();
  AutoScript.setServlets(
    "https://gobierno.es/afirma-signature-storage/StorageService",
    "https://gobierno.es/afirma-signature-retriever/RetrieveService"
  );
  try {
    AutoScript.sign(
      dataB64.replace("data:application/pdf;base64,", ""),
      "SHA512withRSA",
      "PAdES",
      null,
      sendSignatureCallback,
      firmaErrorCallback
    );
  } catch (e) {
    firmaErrorCallback(AutoScript.getErrorType(), AutoScript.getErrorMessage());
  }
  function firmaErrorCallback(type, message) {
    console.log("error type: " + type);
    console.log("message: " + message);
  }

  // Función que se ejecutará cuando la firma termine correctamente.
  // Almacenara la firma, el certificado y el nombre del fichero firmado en
  // campos de un formulario y lo enviará a servidor
  function sendSignatureCallback(signatureB64, certificateB64, extraData) {
    // Documento firmado
    signedDocument.signatureB64 = signatureB64;
    // Este es el certificado usado.
    signedDocument.certificateB64 = certificateB64;
    setSignedDocument(signedDocument).then(() =>
      console.log("Signing document")
    );
  }
};
