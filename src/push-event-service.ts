import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';
import { EventPushArgs, EventWithId } from './push-event.typings';

export class EventPushService {
  static subscriptions: EventWithId[] = [];
  private id: string = randomUUID();

  init() {
    const subscription = new Observable((subscriber) => {
      EventPushService.addEvent({ id: this.id, subscription, subscriber });
    });

    return subscription;
  }

  private static addEvent(event: EventWithId) {
    const existingEvent = EventPushService.subscriptions.find(
      (sub) => sub.id === event.id,
    );

    if (!existingEvent) {
      EventPushService.subscriptions.push(event);
    }
  }

  static send(data: EventPushArgs) {
    EventPushService.subscriptions.map((ev) => ev.subscriber.next({ data }));
  }

  destroy() {
    EventPushService.subscriptions = EventPushService.subscriptions.filter(
      (sub) => sub.id === this.id,
    );
  }
}

export function sendPushEvent(event: EventPushArgs) {
  EventPushService.send(event);
}

export function initPushEventSubscription() {
  const eventPush = new EventPushService();
  const subscription = eventPush.init();

  return { eventPush, subscription };
}
