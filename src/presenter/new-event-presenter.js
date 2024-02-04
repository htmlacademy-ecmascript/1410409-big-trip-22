import EditEventView from '../view/edit-event-view';
import {remove, render, RenderPosition} from '../framework/render';
import {UpdateType, UserAction} from '../const';
import {nanoid} from 'nanoid';
import {isEscKey} from '../utils/common';


export default class NewEventPresenter {
  #offers = [];
  #destinations = [];
  #eventsList = null;
  #onDataChange = () => null;
  #onDestroy = () => null;

  #eventEditComponent = null;

  constructor({
    offers,
    destinations,
    eventsList,
    onDataChange,
    onDestroy}) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#eventsList = eventsList;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EditEventView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#formSubmitHandler,
      onFormClose: this.#formDeleteHandler,
      onDeleteClick: this.#formDeleteHandler,
    });

    render(this.#eventEditComponent, this.#eventsList, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#onDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #formSubmitHandler = (event) => {
    this.#onDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
    );
    this.destroy();
  };

  #formDeleteHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
