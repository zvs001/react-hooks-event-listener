
Tiny hook to support forceUpdate() behaviour.

[![npm](https://img.shields.io/npm/v/react-hooks-event-listener)](https://www.npmjs.com/package/react-hooks-event-listener)

## Install

``yarn add react-hooks-event-listener``

or 

```npm i -S react-hooks-event-listener```

## Usage


```tsx
import useEventListener from 'react-hooks-event-listener'
import { EventEmitter } from 'events'

const eventEmitter = new EventEmitter()

setInterval(() => {
    eventEmitter.emit('change')
}, 1000)


function App() {
  useEventListener(eventEmitter, 'change', () => {
    console.log('Received change event')
  })
}
```



