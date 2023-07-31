import { Subject } from 'rxjs';

export type EventPushArgs = {
  room?: string;
  event: string;
  data: any;
};

export type WithId<T> = T & { id: string };
export type SubjectDefinition = {
  value: Subject<unknown>;
};
