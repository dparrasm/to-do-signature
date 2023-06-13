import { renderHook } from '@testing-library/react-hooks'
import { useEnvelope } from '../useEnvelope'
import { Document } from '../../domain/document'
import { EnvelopeState, Folder } from '../../types'

describe('useEnvelope', () => {
  let emailAddress: string
  let document: Document

  beforeEach(() => {
    emailAddress = 'dparrasmartinez@gmail.com'
    document = {
      id: '647c6ca1a7fd3be47f3bd22f',
      lastChange: '2023-06-04T10:51:12.993Z',
      title: 'LORE_IPSUM',
      fileContent: '',
      recipients: [
        //An user that was requested to view -> completed
        {
          _id: '647c6ca1a7fd3be47f3bd231',
          name: 'David Parras Martinez',
          email: 'dparrasmartinez@gmail.com',
          needsToSign: false,
          needsToView: true,
          signed: false,
          viewed: true,
          folder: Folder.Inbox
        },
        //An user that was requested to sign and view -> completed
        {
          _id: '647c6ca1a7fd3be47f3bd232',
          name: 'David Parras Martinez',
          email: 'david@parras.com',
          needsToSign: true,
          needsToView: true,
          signed: true,
          viewed: true,
          folder: Folder.Inbox
        }
      ],
      signed: true,
      viewed: true
    }
  })

  it('should have envelope state set to Completed', () => {
    const { result } = renderHook(() => useEnvelope(emailAddress, document))
    const { envelopeState } = result.current

    expect(envelopeState).toBe(EnvelopeState.Completed)
  })

  it('should have envelope state set to Pending', () => {
    document.recipients = [
      //Current user was requested to sign -> pending
      {
        _id: '647c6ca1a7fd3be47f3bd231',
        name: 'David Parras Martinez',
        email: 'dparrasmartinez@gmail.com',
        needsToSign: true,
        needsToView: true,
        signed: false,
        viewed: true,
        folder: Folder.Inbox
      },
      //An user that was requested to view -> completed
      {
        _id: '647c6ca1a7fd3be47f3bd232',
        name: 'David Parras Martinez',
        email: 'david@parras.com',
        needsToSign: false,
        needsToView: true,
        signed: false,
        viewed: true,
        folder: Folder.Inbox
      }
    ]

    const { result } = renderHook(() => useEnvelope(emailAddress, document))
    const { envelopeState } = result.current

    expect(envelopeState).toBe(EnvelopeState.Pending)
  })

  it('should have envelope state set to Waiting for Others', () => {
    document.recipients = [
      //Current user was requested to sign and view -> completed
      {
        _id: '647c6ca1a7fd3be47f3bd231',
        name: 'David Parras Martinez',
        email: 'dparrasmartinez@gmail.com',
        needsToSign: true,
        needsToView: true,
        signed: true,
        viewed: true,
        folder: Folder.Inbox
      },
      //An user that was requested to sign -> pending
      {
        _id: '647c6ca1a7fd3be47f3bd232',
        name: 'David Parras Martinez',
        email: 'david@parras.com',
        needsToSign: true,
        needsToView: true,
        signed: false,
        viewed: true,
        folder: Folder.Inbox
      }
    ]

    const { result } = renderHook(() => useEnvelope(emailAddress, document))
    const { envelopeState } = result.current

    expect(envelopeState).toBe(EnvelopeState.WaitingForOthers)
  })
})
