import {
  ENVELOPE_UPLOAD,
  SIGN_ENVELOPE_DOCUMENTS,
  UPLOAD_ENVELOPE_BY_DOCUMENT_ID
} from './types'
import axios from 'axios'
import { autofirma } from '../../pages/signing/signDocument/signSetup'
import { updateEnvelopeStatus } from '../../application/updateEnvelopeStatus'
import { EnvelopeActions } from '../../types'
import { markDocumentAsViewed } from './documentActions'

export const uploadEnvelope =
  ({ documents, recipients, email }) =>
  async (dispatch) => {
    const envelope = {
      documents,
      recipients,
      email
    }
    try {
      dispatch({
        type: ENVELOPE_UPLOAD,
        payload: envelope
      })
    } catch {
      console.log('Fallo')
    }
  }

export const uploadEnvelopeByDocumentId =
  (documentId, mail) => async (dispatch) => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    try {
      const result = await axios.get('/api/document/' + documentId, config)
      const document = result.data
      let payload = {
        documents: [document],
        recipients: document.recipients ? document.recipients : [],
        mail: mail
      }
      if (!document.viewed) {
        const { updatedRecipients, viewedByUser, viewed } =
          updateEnvelopeStatus(document.recipients, mail, EnvelopeActions.View)
        if (!viewedByUser) {
          const uploadedDocument = {
            ...document,
            recipients: updatedRecipients,
            viewed
          }
          await axios.put(
            '/api/document/sign/' + documentId,
            uploadedDocument,
            config
          )
          if (!viewed) {
            dispatch(markDocumentAsViewed(uploadedDocument))
          }
        }
      }
      dispatch({
        type: UPLOAD_ENVELOPE_BY_DOCUMENT_ID,
        payload: payload
      })
    } catch (err: any) {
      const errors = err?.response?.data?.errors
      if (errors) {
        console.log('Error updating envelope by documentId')
      }
    }
  }

export const signEnvelopeDocument =
  (document, index, email) => async (dispatch) => {
    try {
      const uploadedDocument = await autofirma(document, email)
      let payload = {
        document: { ...uploadedDocument, isChecked: false },
        index: index
      }
      dispatch({
        type: SIGN_ENVELOPE_DOCUMENTS,
        payload: payload
      })
      //We don't need to post the updated envelope here cause this will be done only
      //if the user sends the envelope.
    } catch (e: any) {
      if (e) {
        e.forEach((error) => console.log(error.msg, 'error'))
      }
    }
  }
