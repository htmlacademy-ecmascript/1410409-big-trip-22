import AbstractView from '../framework/view/abstract-view';
import {FilterTypes, NoEventMessage} from '../const';

function createNoEventTemplate(filter = FilterTypes.EVERYTHING) {
  return `<p class="trip-events__msg">${NoEventMessage[filter]}</p>`;
}

export default class NoEventView extends AbstractView {
  #filter = '';

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createNoEventTemplate(this.#filter);
  }
}
