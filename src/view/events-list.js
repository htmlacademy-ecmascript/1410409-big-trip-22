import {createElement} from '../render';

function createEventsListTemplate() {
  return '<div class="trip-events__list"></div>';
}

export default class EventsListView {
  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
