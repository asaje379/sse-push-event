import { Observable, Subscriber } from 'rxjs';

export type EventPushArgs = {
  room?: string;
  event: string;
  data: any;
};

export type EventWithId = {
  id: string;
  subscription: Observable<any>;
  subscriber: Subscriber<any>;
};
