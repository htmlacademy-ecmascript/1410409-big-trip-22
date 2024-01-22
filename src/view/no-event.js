import AbstractView from '../framework/view/abstract-view';
import {NoEventMessage} from '../const';

function createNoEventTemplate(filter = 'EVERYTHING') {
  return `<p class="trip-events__msg">${NoEventMessage[filter.toUpperCase()]}</p>`;
}

export default class NoEventView extends AbstractView {
  get template() {
    return createNoEventTemplate();
  }
}
