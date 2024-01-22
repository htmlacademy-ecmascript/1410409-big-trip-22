import {DATE_FORMAT_INPUT_DATE, DATE_FORMAT_INPUT_TIME, EVENT_TYPES} from '../const';
import {capitalizeFirstLetter, getItemById} from '../utils/common';
import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';

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

function createSelectorOfferTemplate(offersByType, checkedOfferIds) {
  if (offersByType.length === 0) {
    return '';
  }
  return offersByType.map((offer) => (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id=${offer.id} type="checkbox" name="event-offer-luggage" ${checkedOfferIds.includes(offer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for=${offer.id}>
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
      </div>`)).join('');
}

function createOffersTemplate(type, allOffers, checkedOfferIds) {
  if (checkedOfferIds.length === 0) {
    return '';
  }
  const offersByType = allOffers.find((offer) => offer.type === type).offers;
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

function createEditEventTemplate(event, allOffers, allDestinations) {
  const {
    id,
    dateFrom,
    dateTo,
    type,
    destination,
    basePrice,
    offers,
  } = event;
  const destinationData = getItemById(destination, allDestinations);

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            ${createEventTypeListTemplate(EVENT_TYPES)}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${destinationData.id}">
            ${capitalizeFirstLetter(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${destinationData.id}" type="text" name="event-destination" value=${destinationData.name} list="destination-list-1">
          <datalist id="destination-list-${destinationData.id}">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

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
        ${createOffersTemplate(type, allOffers, offers)}
        ${createDestinationTemplate(destinationData)}
      </section>
    </form>`
  );
}

export default class EditEventView extends AbstractView {
  #event = null;
  #offers = [];
  #destinations = [];
  #onFormSubmit = () => {};

  constructor({event, offers, destinations, onFormSubmit}) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createEditEventTemplate(this.#event, this.#offers, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit();
  };
}
