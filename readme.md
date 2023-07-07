# SSE-PUSH-EVENT

## **Description**

Lightweight package for SSE push events handling

## **Installation**

```bash
npm i @asaje/sse-push-event-server
```

or

```bash
yarn add @asaje/sse-push-event-server
```

## **How to use**

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
