import Observable from '../framework/observable';
import {getMockOffers} from '../mock/offers';

export default class OffersModel extends Observable {
  #offers = getMockOffers();

  get offers() {
    return this.#offers;
  }
}
