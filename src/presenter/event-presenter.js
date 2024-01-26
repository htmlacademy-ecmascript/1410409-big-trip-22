import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {remove, render, replace} from '../framework/render';

export default class EventPresenter {
  #eventsList = null;
  #event = null;
  #eventComponent = null;
  #editEventComponent = null;
  #isEditEventOpen = false;
  #offers = [];
  #destinations = [];
  #onClickFavorite = () => {};
  #onClickEdit = () => {};

  constructor({eventsList, offers, destinations, onClickFavorite, onClickEdit}) {
    this.#eventsList = eventsList;
    this.#onClickFavorite = onClickFavorite;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onClickEdit = onClickEdit;
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
        this.#openEditEventHandler();
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
        this.#closeEditEventHandler();
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

  closeEditEvent = () => {
    if (this.#isEditEventOpen) {
      this.#closeEditEventHandler();
    }
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

  #openEditEventHandler() {
    this.#onClickEdit();
    this.#replaceCardToForm();
    this.#isEditEventOpen = true;
  }

  #closeEditEventHandler() {
    this.#replaceFormToCard();
    this.#isEditEventOpen = false;
  }
}
