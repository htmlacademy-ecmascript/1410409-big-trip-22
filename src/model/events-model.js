import {EVENT_COUNT} from '../const';
import {getRandomEvent} from '../utils';

export default class EventsModel {
  events = Array.from({length: EVENT_COUNT}, getRandomEvent);

  getEvents() {
    return this.events;
  }
}
