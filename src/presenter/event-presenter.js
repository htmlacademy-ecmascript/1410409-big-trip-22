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

  #onClickFavorite = () => null;
  #onClickFormEdit = () => null;
  #onClickSubmit = () => null;

  constructor({eventsList, offers, destinations, onClickFavorite, onClickEdit, onDataChange,}) {
    this.#eventsList = eventsList;
    this.#onClickFavorite = onClickFavorite;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onClickFormEdit = onClickEdit;
    this.#onClickSubmit = onDataChange;
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
      onFormSubmit: this.#submitFormHandler,
      onFormClose: () => {
        this.closeEditEvent();
      }
    });

    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this.#eventComponent, this.#eventsList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  closeEditEvent = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editEventComponent.reset(this.#event);
      this.#closeEditEventHandler();
    }
  };

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.closeEditEvent();
    }
  };

  #replaceCardToForm() {
    replace(this.#editEventComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #openEditEventHandler() {
    this.#onClickFormEdit();
    this.#replaceCardToForm();
    this.#mode = Mode.EDITING;
  }

  #closeEditEventHandler() {
    this.#replaceFormToCard();
    this.#mode = Mode.DEFAULT;
  }

  #submitFormHandler = (event) => {
    this.#onClickSubmit(event);
    this.#replaceFormToCard();
    this.#mode = Mode.DEFAULT;
  };
}
