import {createElement} from '../render';


function createEventListTemplate() {
  return '<div class="trip-events__list"></div>';
}

export default class EventListView{
  getTemplate() {
    return createEventListTemplate();
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
