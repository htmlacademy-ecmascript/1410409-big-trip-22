import {getRandomEvent} from '../mock/events.js';
import {EVENT_COUNT} from '../const';


export default class EventsModel {
  events = Array.from({length: EVENT_COUNT}, getRandomEvent);

  getEvents() {
    return this.events;
  }
}
