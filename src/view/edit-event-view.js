import {DATE_FORMAT_INPUT_DATE, DATE_FORMAT_INPUT_TIME, EVENT_TYPES} from '../const';
import {capitalizeFirstLetter, getItemById} from '../utils/common';
import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function createEventTypeListTemplate(availableTypes) {
  return `
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>

    ${availableTypes.map((type) => `<div class="event__type-item">
      <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${capitalizeFirstLetter(type)}</label>
    </div>`).join('')}
  </fieldset>`;
}

function createTemplateDestinationInput(allDestinations, currentDestination, currentType) {
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
        <input class="event__offer-checkbox  visually-hidden" id=${offer.id} type="checkbox" name="event-offer-${offer.title}" ${checkedOfferIds.includes(offer.id) ? 'checked' : ''}>
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
    currentEventType,
    currentDestinationId,
  } = eventData;
  const currentDestination = getItemById(currentDestinationId, allDestinations);

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${currentEventType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            ${createEventTypeListTemplate(EVENT_TYPES)}
          </div>
        </div>

        ${createTemplateDestinationInput(allDestinations, currentDestination, currentEventType)}

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dayjs(dateFrom).format(DATE_FORMAT_INPUT_DATE)}&nbsp;${dayjs(dateFrom).format(DATE_FORMAT_INPUT_TIME)}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dayjs(dateTo).format(DATE_FORMAT_INPUT_DATE)}&nbsp;${dayjs(dateTo).format(DATE_FORMAT_INPUT_TIME)}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersTemplate(currentEventType, allOffers, offers)}
        ${createDestinationTemplate(currentDestination)}
      </section>
    </form>`
  );
}

export default class EditEventView extends AbstractStatefulView {
  #event = null;
  #offers = [];
  #destinations = [];
  #onFormSubmitHandler = () => {};
  #onFormCloseHandler = () => {};

  constructor({event, offers, destinations, onFormSubmit, onFormClose,}) {
    super();
    this._setState(EditEventView.parseEventToState(event));
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmitHandler = onFormSubmit;
    this.#onFormCloseHandler = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return createEditEventTemplate(this._state, this.#offers, this.#destinations);
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
  }

  #formResetHandler = () => {
    this.#onFormCloseHandler();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmitHandler(EditEventView.parseStateToEvent(this._state));
  };

  #changeEventTypeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.updateElement({currentEventType: evt.target.value});
  };

  #changeDestinationHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({currentDestinationId: selectedDestination.id});
  };

  #changeOffersHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({eventOffersChecked: checkedOffers.map((offer) => offer.id)});
  };

  static parseEventToState(event) {
    return {
      ...event,
      currentEventType: event.type,
      currentDestinationId: event.destination,
      eventOffersChecked: event.offers,
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};
    event.type = state.currentEventType;
    event.offers = state.eventOffersChecked;
    delete event.currentEventType;
    delete event.eventOffersChecked;

    return event;
  }
}
