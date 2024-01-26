import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {remove, render, replace} from '../framework/render';

export default class EventPresenter {
  #eventsList = null;
  #event = null;
  #eventComponent = null;
  #editEventComponent = null;
  #offers = [];
  #destinations = [];
  #onClickFavorite = () => {};

  constructor({eventsList, offers, destinations, onClickFavorite}) {
    this.#eventsList = eventsList;
    this.#onClickFavorite = onClickFavorite;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onClickEdit: () => {
        this.#replaceCardToForm();
      },
      onClickFavorite: () => {
        this.#onClickFavorite({...this.#event, isFavorite: !this.#event.isFavorite});
      },
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: () => {
        this.#replaceFormToCard();
      },
    });

    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this.#eventComponent, this.#eventsList);
      return;
    }

    if (this.#eventsList.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventsList.contains(prevEditEventComponent.element)) {
      replace(this.#eventsList, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm() {
    replace(this.#editEventComponent, this.#eventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
