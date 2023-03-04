import { useEffect } from 'react'
import utils from './utils'

type EventListenerLike = Record<string, any>

export interface UseEventListenerOptions {
  addListenerKey?: string
  removeListenerKey?: string
}

function useEventListener(
  listener: EventListenerLike,
  event: string,
  fn: (...args: any) => any,
  options?: UseEventListenerOptions,
) {
  let { addListenerKey, removeListenerKey } = options || {}

  useEffect(() => {
    function cb(...args) {
      fn(...args)
    }

    let listenInstance: () => any | undefined | Record<string, any>
    if (!addListenerKey) addListenerKey = utils.findAvailableKey(listener, ['on', 'addEventListener', 'addListener'])

    if (addListenerKey) {
      listenInstance = listener[addListenerKey](event, cb)
    } else {
      console.error('useEventListener():', "Couldn't find addListener function. Try to set key manually.")
    }

    return () => {
      // instance type unsubscribe
      if (listenInstance) {
        if (typeof listenInstance === 'function') {
          return listenInstance()
        }

        if ('remove' in listenInstance) {
          listener.remove()
          return null
        }
      }

      // standard way unsubscribe
      if (!removeListenerKey) {
        removeListenerKey = utils.findAvailableKey(listener, ['off', 'removeEventListener', 'removeListener'])
      }

      if (removeListenerKey) {
        listener[removeListenerKey](event, cb)
      } else {
        console.error('useEventListener():', "Couldn't find removeListener function. Try to set key manually.")
      }
    }
  }, [])
}

export default useEventListener
