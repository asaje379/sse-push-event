import { EventPushArgs } from './push-event.typings';
export type PushEventCallback = (data: any) => void | Promise<void>;

class PushEvent {
  static rooms: string[] = [];
  static eventSource: EventSource | undefined = undefined;
  static events: Record<string, PushEventCallback> = {};

  static joinRoom(room: string) {
    if (!PushEvent.rooms.includes(room)) {
      PushEvent.rooms.push(room);
    }
  }

  static init(url: string) {
    if (!PushEvent.eventSource) {
      PushEvent.eventSource = new EventSource(url);

      PushEvent.eventSource?.addEventListener(
        'message',
        ({ data }: MessageEvent) => {
          const {
            data: result,
            event,
            room,
          } = JSON.parse(data) as EventPushArgs;

          if (!(event in PushEvent.events)) return;

          const cb = PushEvent.events[event];

          if (!room) {
            return cb(result);
          }

          if (PushEvent.rooms.includes(room)) return cb(result);
        },
      );
    }
  }

  static addListener(event: string, cb: PushEventCallback) {
    PushEvent.events[event] = cb;
  }

  static addMultipleListeners(events: string[], cb: PushEventCallback) {
    for (const event of events) {
      PushEvent.addListener(event, cb);
    }
  }

  static removeListener(event: string) {
    delete PushEvent.events[event];
  }

  static removeMultipleListeners(events: string[]) {
    for (const event of events) {
      delete PushEvent.events[event];
    }
  }
}

export const initPushEvent = PushEvent.init;
export const joinPushEventRoom = PushEvent.joinRoom;
export const addPushEventListener = PushEvent.addListener;
export const removePushEventListener = PushEvent.removeListener;
export const addMultiplePushEventListener = PushEvent.addMultipleListeners;
