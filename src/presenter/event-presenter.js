import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {remove, render, replace} from '../framework/render';
import {Mode} from '../const';

export default class EventPresenter {
  #eventsList = null;
  #event = null;
  #eventComponent = null;
  #editEventComponent = null;
  #mode = Mode.DEFAULT;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventsList, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  closeEditEvent = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeEditEventHandler();
    }
  };

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
    this.#mode = Mode.EDITING;
  }

  #closeEditEventHandler() {
    this.#replaceFormToCard();
    this.#mode = Mode.DEFAULT;
  }
}
