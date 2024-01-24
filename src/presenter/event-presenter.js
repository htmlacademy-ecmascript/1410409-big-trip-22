import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {render, replace} from '../framework/render';

export default class EventPresenter {
  #eventsList = null;
  #event = null;
  #eventComponent = null;
  #editEventComponent = null;
  #offers = [];
  #destinations = [];

  constructor({eventsList}) {
    this.#eventsList = eventsList;
  }

  init(event, offers, destinations) {
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onClickEdit: () => {
        this.#replaceCardToForm();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: () => {
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
    });

    render(this.#eventComponent, this.#eventsList);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#editEventComponent, this.#eventComponent);
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#editEventComponent);
  }
}
