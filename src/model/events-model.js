import {getMockEvents} from '../mock/events';
import {getMockOffers} from '../mock/offers';
import {getMockDestinations} from '../mock/destinations';

export default class EventsModel {
  #events = getMockEvents();
  #offers = getMockOffers();
  #destinations = getMockDestinations();

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
