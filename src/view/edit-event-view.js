import {DEFAULT_EVENT, EVENT_TYPES} from '../const';
import {capitalizeFirstLetter, getItemById, isNotInput} from '../utils/common';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import he from 'he';

import {getFormattedDate} from '../utils/time';


function createEventTypeListTemplate(availableTypes) {
  return (`
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${availableTypes.map((type) => `<div class="event__type-item">
        <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${capitalizeFirstLetter(type)}</label>
      </div>`).join('')}
    </fieldset>`);
}

function createDateInputTemplate(eventId, dateFrom, dateTo, isDisabled, isEmptyDateInput) {
  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${eventId}">From</label>

      <input
      class="event__input  event__input--time"
      id="event-start-time-${eventId}"
      type="text"
      name="event-start-time"
      value=${getFormattedDate(dateFrom)}
      ${isDisabled ? 'disabled' : ''}
      >

      &mdash;
      <label class="visually-hidden" for="event-end-time-${eventId}">To</label>

      <input
      class="event__input  event__input--time"
      id="event-end-time--${eventId}"
      type="text"
      name="event-end-time"
      value=${getFormattedDate(dateTo)}
      ${isDisabled ? 'disabled' : ''}
      >

      <span class="time-input__error ${isEmptyDateInput ? 'time-input__error--active' : ''}">
       Нужно обязательно выбрать обе даты
      </span>
    </div>`);
}

function createPriceInputTemplate(eventId, basePrice, isDisabled) {
  return (`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${eventId}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input
        class="event__input  event__input--price"
        id="event-price-${eventId}"
        type="number"
        min="1"
        max="100000"
        name="event-price"
        value=${basePrice}
        ${isDisabled ? 'disabled' : ''}
        required
      >
    </div>`);
}

function createDestinationInputTemplate(eventId, allDestinations, currentDestination, currentType, isDisabled) {
  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${eventId}">
        ${capitalizeFirstLetter(currentType)}
      </label>
      <input
      class="event__input event__input--destination"
      id="event-destination-${eventId}"
      type="text"
      name="event-destination"
      value="${currentDestination?.name.length > 0 ? he.encode(currentDestination.name) : he.encode('')}" list="destination-list-${eventId}"
      ${isDisabled ? 'disabled' : ''}
      required
      >
      <datalist id="destination-list-${eventId}">
      ${allDestinations.map((destination) => (`<option value="${destination.name}"></option>`)).join('')}
      </datalist>
    </div>
  `);
}

function createSelectorOfferTemplate(offersByType, checkedOfferIds) {
  if (offersByType.length === 0) {
    return '';
  }
  return offersByType.map((offer) => (
    `<div class="event__offer-selector">
        <input
        class="event__offer-checkbox  visually-hidden"
        id=${offer.id}
        type="checkbox"
        name="event-offer-${offer.title}"
        ${checkedOfferIds.has(offer.id) ? 'checked' : ''}
        >
        <label class="event__offer-label" for=${offer.id}>
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`)).join('');
}

function createRollupButtonTemplate(id) {
  if (typeof id === 'undefined') {
    return '';
  }

  return ('<button class="event__rollup-btn" type="button"><span class="visually-hidden">Close edit event</span></button>');
}

function createOffersTemplate(type, allOffers, checkedOfferIds) {
  const offersByType = allOffers.find((offer) => offer.type === type).offers;
  if (offersByType.length === 0) {
    return '';
  }
  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createSelectorOfferTemplate(offersByType, checkedOfferIds)}
      </div>
    </section>
   `);
}

function createPictureTemplate(picture) {
  return (`<img class = "event__photo" src=${picture.src} alt=${picture.description}>`);
}

function createGalleryTemplate(pictures) {
  if (pictures.length === 0) {
    return '';
  }

  return (`<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map((picture) => createPictureTemplate(picture)).join('')}
    </div>`);
}

function createDestinationTemplate(id, destinationData) {
  if (!destinationData) {
    return '';
  }

  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationData.description}</p>

      ${createGalleryTemplate(destinationData.pictures)}

    </section>
`);
}

function createEditEventTemplate(eventData, allOffers, allDestinations) {
  const {
    id,
    dateFrom,
    dateTo,
    basePrice,
    offers,
    destination,
    type,
    isSaving,
    isDeleting,
    isDisabled,
    isEmptyDateInput,
  } = eventData;
  const destinationData = getItemById(destination, allDestinations);
  const buttonDeleteText = isDeleting ? 'Deleting...' : 'Delete';
  return (
    `<li class="trip-events__item">
      <form class="trip-events__item event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${type}.png"
                alt="Event type icon"
              >
            </label>
            <input
              class="event__type-toggle  visually-hidden"
              id="event-type-toggle-${id}"
              type="checkbox"
              ${isDisabled ? 'disabled' : ''}
            >
            <div class="event__type-list">
              ${createEventTypeListTemplate(EVENT_TYPES)}
            </div>
          </div>

        ${createDestinationInputTemplate(id, allDestinations, destinationData, type, isDisabled)}

        ${createDateInputTemplate(id, dateFrom, dateTo, isDisabled, isEmptyDateInput)}

        ${createPriceInputTemplate(id, basePrice, isDisabled)}

        <button
          class="event__save-btn  btn  btn--blue"
          type="submit"
          ${isDisabled ? 'disabled' : ''}
        >
          ${isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          class="event__reset-btn"
          type="reset" ${isDisabled ? 'disabled' : ''}
        >
          ${typeof id === 'undefined' ? 'Cancel' : buttonDeleteText}
        </button>
        ${createRollupButtonTemplate(id)}
      </header>
      <section class="event__details">
        ${createOffersTemplate(type, allOffers, offers)}
        ${createDestinationTemplate(id, destinationData)}
      </section>
    </form>
</li>`
  );
}

export default class EditEventView extends AbstractStatefulView {
  #event = null;
  #eventFromTimepicker = null;
  #eventToTimepicker = null;
  #offers = [];
  #destinations = [];

  #onFormSubmit = () => null;
  #onFormClose = () => null;
  #onDeleteClick = () => null;

  constructor({
    event = DEFAULT_EVENT,
    offers,
    destinations,
    onFormSubmit,
    onFormClose,
    onDeleteClick,
  }) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;
    this.#onFormClose = onFormClose;
    this.#onDeleteClick = onDeleteClick;

    this._setState(EditEventView.parseEventToState(event));
    this._restoreHandlers();
  }

  get template() {
    return createEditEventTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    this.#eventFromTimepicker.destroy();
    this.#eventToTimepicker.destroy();
    this.#eventFromTimepicker = null;
    this.#eventToTimepicker = null;
  }

  reset(event) {
    this.updateElement(EditEventView.parseEventToState(event));
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#formResetHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changeEventTypeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#changeOffersHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#clickDeleteHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);

    this.#setTimepickers();
  }

  #clickDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(EditEventView.parseStateToEvent(this._state));
  };

  #formResetHandler = () => {
    this.#onFormClose();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (!this._state.dateTo || !this._state.dateFrom) {
      this.updateElement({isEmptyDateInput: true});
      return;
    }
    this.#onFormSubmit(EditEventView.parseStateToEvent(this._state));
  };

  #changeEventTypeHandler = (evt) => {
    if (isNotInput(evt)) {
      return;
    }

    this.updateElement({type: evt.target.value});
    this._setState({offers: new Set()});
  };

  #changeDestinationHandler = (evt) => {
    if (isNotInput(evt)) {
      return;
    }

    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({destination: selectedDestination.id});
  };

  #changePriceHandler = (evt) => {
    if (isNotInput(evt)) {
      return;
    }

    this._setState({basePrice: evt.target.value});
  };

  #changeOffersHandler = (evt) => {
    if (isNotInput(evt)) {
      return;
    }

    const checkedOfferId = evt.target.id;

    if (this._state.offers.has(checkedOfferId)) {
      this._state.offers.delete(checkedOfferId);
    } else {
      this._state.offers.add(checkedOfferId);
    }
  };

  #changeDateFromHandler = ([dateFrom]) => {
    this._setState({dateFrom: dateFrom});
    this.#eventToTimepicker.set({minDate: dateFrom});
  };

  #changeDateToHandler = ([dateTo]) => {
    this._setState({dateTo: dateTo});
    this.#eventFromTimepicker.set({maxDate: dateTo});
  };

  #setTimepickers() {
    const eventStartDateElement = this.element.querySelector('input[name="event-start-time"]');
    const eventEndDateElement = this.element.querySelector('input[name="event-end-time"]');
    const commonOptions = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      'time_24hr': true,
      locale: {firstDayOfWeek: 1},
    };

    this.#eventFromTimepicker = flatpickr(
      eventStartDateElement,
      {
        ...commonOptions,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onClose: this.#changeDateFromHandler,
      }
    );

    this.#eventToTimepicker = flatpickr(
      eventEndDateElement,
      {
        ...commonOptions,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#changeDateToHandler,
      }
    );
  }

  static parseEventToState(event) {
    return {
      ...event,
      offers: new Set(event.offers),
      isSaving: false,
      isDeleting: false,
      isDisabled: false,
      isEmptyDateInput: false
    };
  }

  static parseStateToEvent(state) {
    const event = {...state, offers: Array.from(state.offers), basePrice: Number(state.basePrice)};

    delete event.isSaving;
    delete event.isDeleting;
    delete event.isDisabled;
    delete event.isEmptyDateInput;

    return event;
  }
}
