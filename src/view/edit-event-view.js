import {DATE_FORMAT_INPUT_DATE, DATE_FORMAT_INPUT_TIME, EVENT_TYPES} from '../const';
import {capitalizeFirstLetter, getItemById, isInput} from '../utils/common';
import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
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

function createDateInputTemplate(eventId, dateFrom, dateTo) {
  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${eventId}">From</label>

      <input
      class="event__input  event__input--time"
      id="event-start-time-${eventId}"
      type="text"
      name="event-start-time"
      value=${getFormattedDate(dateFrom)}
      >

      &mdash;
      <label class="visually-hidden" for="event-end-time-${eventId}">To</label>

      <input
      class="event__input  event__input--time"
      id="event-end-time--${eventId}"
      type="text"
      name="event-end-time"
      value=${getFormattedDate(dateTo)}
      >
    </div>`);
}

function createDestinationInputTemplate(allDestinations, currentDestination, currentType) {
  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${currentDestination.id}">
        ${capitalizeFirstLetter(currentType)}
      </label>
      <input
      class="event__input event__input--destination"
      id="event-destination-${currentDestination.id}"
      type="text"
      name="event-destination"
      value="${currentDestination.name}" list="destination-list-${currentDestination.id}"
      >
      <datalist id="destination-list-${currentDestination.id}">
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

function createDestinationTemplate(destinationData) {
  if (destinationData.description === '') {
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
  } = eventData;
  const destinationData = getItemById(destination, allDestinations);

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post">
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
          >
          <div class="event__type-list">
            ${createEventTypeListTemplate(EVENT_TYPES)}
          </div>
        </div>

        ${createDestinationInputTemplate(allDestinations, destinationData, type)}

        ${createDateInputTemplate(id, dateFrom, dateTo)}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value=${basePrice}
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersTemplate(type, allOffers, offers)}
        ${createDestinationTemplate(destinationData)}
      </section>
    </form>`
  );
}

export default class EditEventView extends AbstractStatefulView {
  #event = null;
  #eventFromTimepicker = null;
  #eventToTimepicker = null;
  #offers = [];
  #destinations = [];
  #onFormSubmitHandler = () => null;
  #onFormCloseHandler = () => null;

  constructor({event, offers, destinations, onFormSubmit, onFormClose,}) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmitHandler = onFormSubmit;
    this.#onFormCloseHandler = onFormClose;

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
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formResetHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changeEventTypeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#changeOffersHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);

    this.#setTimepickers();
  }

  #formResetHandler = () => {
    this.#onFormCloseHandler();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmitHandler(EditEventView.parseStateToEvent(this._state));
  };

  #changeEventTypeHandler = (evt) => {
    if (isInput(evt)) {
      return;
    }

    this.updateElement({type: evt.target.value});
  };

  #changeDestinationHandler = (evt) => {
    if (isInput(evt)) {
      return;
    }

    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    this.updateElement({destination: selectedDestination.id});
  };

  #changeOffersHandler = (evt) => {
    if (isInput(evt)) {
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
    return {...event, offers: new Set(event.offers)};
  }

  static parseStateToEvent(state) {
    return {...state, offers: Array.from(state.offers)};
  }
}
