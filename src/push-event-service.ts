import { Subject } from 'rxjs';
import { randomUUID } from 'crypto';
import { EventPushArgs, SubjectDefinition, WithId } from './push-event.typings';

export class EventPushService {
  static subjects: WithId<SubjectDefinition>[] = [];

  init() {
    const subject = new Subject();
    const id = randomUUID();
    EventPushService.subjects.push({ id, value: subject });
    return {
      value: subject.asObservable(),
      destroy: () => this.removeSubject(id),
    };
  }

  removeSubject(id: string) {
    const subjectIndex = EventPushService.subjects.findIndex(
      (sub) => sub.id === id,
    );
    EventPushService.subjects.splice(subjectIndex, 1);
    console.log(`Subject ${id} destroyed`);
  }

  static send(data: EventPushArgs) {
    const ids: string[] = [];
    for (const sub of EventPushService.subjects) {
      sub.value.next(data);
      ids.push(sub.id);
    }
    console.log(`Subject sent to : ${ids.join(' ; ')}`);
  }
}

export function sendPushEvent(event: EventPushArgs) {
  EventPushService.send(event);
}

export function initPushEventSubscription() {
  const eventPush = new EventPushService();
  return eventPush.init();
}
