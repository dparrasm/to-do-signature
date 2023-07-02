import React from 'react'
import { cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { useNotifications } from '../useNotifications'
import mockReduxStore from '../../mockReduxStore'
import { renderHook } from '@testing-library/react-hooks'

describe('useNotifications', () => {
  afterEach(cleanup)

  it('should retrieve the correct number of notifications', () => {
    const { result } = renderHook(() => useNotifications(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider store={mockReduxStore}>{children}</Provider>
      )
    })

    // Access the notifications from the result object
    const { signedBy, actionRequired, waitingForOthers, completed } =
      result.current
    console.log(JSON.stringify(result))
    expect(signedBy).toBe(2)
    expect(actionRequired).toBe(2)
    expect(completed).toBe(2)
    //expect(waitingForOthers).toBe(1)
  })
})
