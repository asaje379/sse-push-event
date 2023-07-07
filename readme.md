# SSE-PUSH-EVENT

## **Description**

Lightweight package for SSE push events handling

## **Installation**

```bash
npm i @asaje/sse-push-event-client
```

or

```bash
yarn add @asaje/sse-push-event-client
```

## **How to use**

```ts
import {
  initPushEvent,
  joinPushEventRoom,
  addPushEventListener,
} from '@asaje/sse-push-event-client';

initPushEvent('http://localhost:3000/events');

joinPushEventRoom('test');

addPushEventListener('TEST', (data) => {
  console.log('Received: ', data);
});
```
