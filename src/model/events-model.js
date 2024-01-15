import {getMockEvents} from '../mock/events';
import {getMockOffers} from '../mock/offers';
import {getMockDestinations} from '../mock/destinations';

export default class EventsModel {
  events = getMockEvents();
  offers = getMockOffers();
  destinations = getMockDestinations();

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
