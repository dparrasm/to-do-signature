import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { rootState } from '../reducers'

export const useNotifications = (
  initialState = {
    actionRequired: 0,
    waitingForOthers: 0,
    signedBy: 0,
    completed: 0
  }
) => {
  const user: any = useSelector((state: rootState) => state?.auth?.user)
  const documents: any = useSelector((state: rootState) => state?.document)
  const allDocuments = useMemo(
    () => [...new Set([...documents['sent'], ...documents['inbox']])],
    [documents]
  )
  const [notifications, setNotifications] = useState(initialState)

  const counters = {
    actionRequiredCont: 0,
    waitingForOthersCont: 0,
    signedByCont: 0,
    completedCont: 0
  }

  allDocuments?.map((doc) => {
    const { recipients } = doc
    const actionRequired = recipients.filter(
      (r) =>
        r?.email === user?.email &&
        ((!r?.signed && r?.needsToSign) || (!r?.viewed && r?.needsToView))
    ).length

    if (actionRequired > 0) {
      counters.actionRequiredCont += 1
    }

    const waitingForOthers = recipients.filter(
      (r) =>
        r?.email !== user?.email &&
        ((!r?.signed && r?.needsToSign) || (!r?.viewed && r?.needsToView))
    ).length

    if (waitingForOthers > 0) {
      counters.waitingForOthersCont += 1
    }

    const completed = recipients.every(
      (r) => r?.needsToSign === r?.signed && r?.needsToView === r?.viewed
    )

    if (completed) {
      counters.completedCont += 1
    }

    const signedBy = recipients.filter(
      (r) => r?.email === user?.email && r.signed
    ).length

    if (signedBy > 0) {
      counters.signedByCont += 1
    }
  })

  useEffect(() => {
    setNotifications({
      actionRequired: counters.actionRequiredCont,
      waitingForOthers: counters.waitingForOthersCont,
      signedBy: counters.signedByCont,
      completed: counters.completedCont
    })
  }, [documents])

  return notifications
}
