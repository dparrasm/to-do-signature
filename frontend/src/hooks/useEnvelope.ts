import { Document } from '../domain/document'
import { Recipient } from '../domain/recipient'
import { EnvelopeState, Folder, NeedsTo } from '../types'
import { shortenTitle } from '../utils/stringWorker'

const getDate = (date: string): string => {
  const { day, month, year } = {
    day: new Date(date).getDate().toString().padStart(2, '0'),
    month: (new Date(date).getMonth() + 1).toString().padStart(2, '0'),
    year: new Date(date).getFullYear()
  }

  return `${day}/${month}/${year}`
}

const getTime = (time: string): string => {
  const { hour, minute } = {
    hour: new Date(time).getHours().toString().padStart(2, '0'),
    minute: new Date(time).getMinutes().toString().padStart(2, '0')
  }

  return `${hour}:${minute}`
}

export const useEnvelope = (emailAddress: string, document: Document) => {
  const { title, lastChange, recipients } = document
  const truncatedTitle =
    title.length > 30 ? shortenTitle(15, 13, title.length, title) : title
  const index = recipients.findIndex((r) => r.folder === Folder.Sent)
  if (index !== -1) {
    recipients.splice(index, 1)
  }
  const destinataries =
    recipients?.length > 1
      ? `To: ${recipients[0]?.name} and ${recipients.length - 1} more`
      : `To: ${recipients[0]?.name}`

  const getLastChange = {
    date: getDate(lastChange),
    time: getTime(lastChange)
  }

  const user = recipients.find((r: Recipient) => r.email === emailAddress)

  const userNeedsToSign = user?.needsToSign
  const userHasSigned = user?.signed
  const userNeedsToView = user?.needsToView
  const userHasViewed = user?.viewed

  const userHasViewedOrSignedDocument =
    userNeedsToSign === userHasSigned && userNeedsToView === userHasViewed

  const detailedRecipients = recipients.map((r) => {
    return {
      completedName: r.name,
      emailAddress: r.email,
      needsTo: r.needsToSign ? NeedsTo.Sign : NeedsTo.View,
      isDone: r.signed === r.needsToSign && r.viewed === r.needsToView
    }
  })

  const isDone = detailedRecipients.every((r) => r.isDone === true)

  let envelopeState: EnvelopeState

  if (!isDone && !userHasViewedOrSignedDocument) {
    envelopeState = EnvelopeState.Pending
  } else if (isDone && userHasViewedOrSignedDocument) {
    envelopeState = EnvelopeState.Completed
  } else {
    envelopeState = EnvelopeState.WaitingForOthers
  }
  return {
    truncatedTitle,
    destinataries,
    userHasViewedOrSignedDocument,
    getLastChange,
    userNeedsToSign,
    userHasSigned,
    detailedRecipients,
    envelopeState
  }
}
