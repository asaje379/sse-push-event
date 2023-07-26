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
connectSse(@Res() res: Response) {
  const { eventPush, subscription } = initPushEventSubscription();
  res.on('close', () => eventPush.destroy());
  return subscription;
}


// Sending event
sendPushEvent({
  event: 'TEST',
  data: { msg: 'Hello' },
  room: 'test-room',
})

```
