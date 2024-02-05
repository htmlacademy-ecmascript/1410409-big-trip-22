import {getMockEvents} from '../mock/events';
import Observable from '../framework/observable';

export default class EventsModel extends Observable {
  #events = getMockEvents();

  get events() {
    return this.#events;
  }

  set events(updatedEvents) {
    this.#events = {...updatedEvents};
  }

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = this.#events.map((event) => event.id === update.id ? update : event);

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [update, ...this.#events];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = this.#events.filter((event) => event.id !== update.id);

    this._notify(updateType, update);
  }
}
