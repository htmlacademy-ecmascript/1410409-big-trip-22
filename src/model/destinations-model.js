import Observable from '../framework/observable';
import {getMockDestinations} from '../mock/destinations';

export default class DestinationsModel extends Observable {
  #destinations = getMockDestinations();

  get destinations() {
    return this.#destinations;
  }
}
