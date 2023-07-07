import { Observable, Subscriber } from 'rxjs';
import { EventPushArgs } from './push-event.typings';

export class EventPushService {
  static subscription: Observable<any> | null = null;
  private static subscriber: Subscriber<any> | undefined = undefined;
  private static instance: EventPushService | null;

  constructor() {
    if (!EventPushService.instance) {
      this.init();
      EventPushService.instance = this;
    }
    return EventPushService.instance;
  }

  private init() {
    EventPushService.subscription = new Observable((subscriber) => {
      EventPushService.subscriber = subscriber;
    });
  }

  static send<T>(data: EventPushArgs) {
    EventPushService.subscriber?.next({ data });
  }
}

new EventPushService();

export const sendPushEvent = EventPushService.send;
export const initPushEventSubscription = () => EventPushService.subscription;
