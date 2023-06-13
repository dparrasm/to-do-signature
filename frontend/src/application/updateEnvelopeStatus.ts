import { Recipient } from '../domain/recipient'
import { EnvelopeActions } from '../types'

export function updateEnvelopeStatus(
  recipients: Recipient[],
  email: String,
  action: EnvelopeActions
): { updatedRecipients: Recipient[]; viewedByUser: boolean; viewed: boolean } {
  const { View, Sign } = EnvelopeActions
  const updatedRecipients: Recipient[] = [...recipients]

  const indices: number[] = recipients.reduce(
    (acc: number[], updatedRecipients, index: number) => {
      if (updatedRecipients.email === email) {
        acc.push(index)
      }
      return acc
    },
    []
  )

  const viewedByUser = indices
    .map((i) => updatedRecipients[i].viewed)
    .every((r) => r === true)

  let viewed = false

  switch (action) {
    case View:
      if (!viewedByUser && action === View) {
        indices.forEach((i) => {
          updatedRecipients[i] = {
            ...updatedRecipients[i],
            viewed: true,
            needsToView: true
          }
        })
        viewed = updatedRecipients.map((r) => r.viewed).every((r) => r === true)
      }
      break
    default:
      console.log('Sign document')
  }
  return { updatedRecipients, viewedByUser, viewed }
}
