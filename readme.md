# SSE-PUSH-EVENT

## **Description**

Lightweight package for SSE push events handling

## **Installation**

```bash
npm i @asaje/sse-push-event
```

or

```bash
yarn add @asaje/sse-push-event
```

## **How to use**

### Client Side

```ts
import {
  addPushEventListener,
  initPushEvent,
  joinPushEventRoom,
} from '@asaje/sse-push-event';

initPushEvent('http://localhost:3000/events');

joinPushEventRoom('test-room');

addPushEventListener('TEST', (data) => {
  console.log('Received: ', data);
});
```

### Server Side

```ts
// Example of NestJS controller
@Sse('events')
notify(): Observable<any> {
  return initPushEventSubscription();
}


// Sending event
sendPushEvent({
  event: 'TEST',
  data: { msg: 'Hello' },
  room: 'test-room',
})

```
