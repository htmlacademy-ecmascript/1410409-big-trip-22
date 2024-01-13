import {createElement} from '../render';
import {DATE_FORMAT_INPUT_DATE, DATE_FORMAT_INPUT_TIME, EVENT_TYPES} from '../const';
import {capitalizeFirstLetter, getItemById} from '../utils';
import {DESTINATIONS} from '../mock/destinations';
import dayjs from 'dayjs';
import {OFFERS} from '../mock/offers';

function eventTypeListTemplate(availableTypes) {
  return `
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>

    ${availableTypes.map((type) => `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>`).join('')}

  </fieldset>`;
}

function offersTemplate(type, allOffers, checkedOfferIds) {
  const offersByType = allOffers.find((offer) => offer.type === type).offers;

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersByType.length > 0 ? offersByType.map((offer) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id=${offer.id} type="checkbox" name="event-offer-luggage" ${checkedOfferIds.includes(offer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for=${offer.id}>
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
      </div>`)).join('') : ''}
      </div>
    </section>
   `);
}

function destinationTemplate(destinationData) {
  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationData.description}</p>

      ${destinationData.pictures.length > 0 ? (`<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${destinationData.pictures.map((picture) => (`
                        <img class = "event__photo" src=${picture.src} alt=${picture.description}>`)).join('')}
                    </div>`) : ''}
    </section>
`);
}

function createEditEventTemplate(event) {
  const {
    dateFrom,
    dateTo,
    type,
    destination,
    basePrice,
    offers,
  } = event;

  const destinationData = getItemById(destination, DESTINATIONS);
  const {
    name: nameDest,
    description,
  } = destinationData;

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            ${eventTypeListTemplate(EVENT_TYPES)}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalizeFirstLetter(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${nameDest} list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dayjs(dateFrom).format(DATE_FORMAT_INPUT_DATE)}&nbsp;${dayjs(dateFrom).format(DATE_FORMAT_INPUT_TIME)}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
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
        ${offers.length > 0 ? offersTemplate(type, OFFERS, offers) : ''}
        ${description !== '' ? destinationTemplate(destinationData) : ''}
      </section>
    </form>`
  );
}

export default class EditEventView {
  constructor(event) {
    this.event = event;
  }

  getTemplate() {
    return createEditEventTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
