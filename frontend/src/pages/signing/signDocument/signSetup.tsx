import { Document } from '../../../domain/document'

export const autofirma = async (
  document: Document,
  email: string
): Promise<Document> => {
  const { fileContent, recipients } = document
  let documentToSign = fileContent
  try {
    documentToSign = await new Promise((resolve, reject) => {
      const handleSignedDocument = (signedDocument) => {
        resolve(signedDocument.signatureB64)
        console.log('Signing document')
      }
      autoscript(fileContent, handleSignedDocument).catch(reject)
    })

    const indices: number[] = recipients.reduce(
      (acc: number[], recipient, index: number) => {
        if (recipient.email === email) {
          acc.push(index)
        }
        return acc
      },
      []
    )

    indices.forEach((i) => {
      recipients[i] = {
        ...recipients[i],
        signed: true,
        viewed: true,
        needsToSign: true,
        needsToView: true
      }
    })

    const signed = recipients.every(
      (r) => r.signed === true && r.viewed === true
    )
    const viewed = !recipients.some(
      (r) => r.signed === false || r.viewed === false
    )

    document = {
      ...document,
      fileContent: `data:application/pdf;base64,${documentToSign}`,
      recipients: recipients,
      signed: signed,
      viewed: viewed
    }
  } catch (e) {
    console.log('Error: ', e.message)
  }
  return document
}

const autoscript = async (dataB64, setSignedDocument) => {
  AutoScript.checkTime(AutoScript.CHECKTIME_RECOMMENDED, 300000)
  AutoScript.cargarAppAfirma()
  AutoScript.setServlets(
    'https://gobierno.es/afirma-signature-storage/StorageService',
    'https://gobierno.es/afirma-signature-retriever/RetrieveService'
  )
  try {
    AutoScript.sign(
      dataB64.replace('data:application/pdf;base64,', ''),
      'SHA512withRSA',
      'PAdES',
      null,
      sendSignatureCallback,
      firmaErrorCallback
    )
  } catch (e) {
    firmaErrorCallback(AutoScript.getErrorType(), AutoScript.getErrorMessage())
  }
  function firmaErrorCallback(type, message) {
    console.log('error type: ' + type)
    console.log('message: ' + message)
  }

  // Función que se ejecutará cuando la firma termine correctamente.
  // Almacenara la firma, el certificado y el nombre del fichero firmado en
  // campos de un formulario y lo enviará a servidor
  function sendSignatureCallback(signatureB64, certificateB64, extraData) {
    setSignedDocument({
      signatureB64,
      certificateB64,
      extraData
    })
  }
}
