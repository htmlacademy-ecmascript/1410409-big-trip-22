import EventsListView from '../view/events-list-view';
import TripInfoView from '../view/trip-info-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import {render, RenderPosition} from '../framework/render';
import NoEventView from '../view/no-event';
import EventPresenter from './event-presenter';

export default class TripPresenter {
  #eventsList = null;
  #headerElement = null;
  #filtersElement = null;
  #eventsBoardElement = null;
  #eventsModel = null;

  #events = [];
  #offers = [];
  #destinations = [];

  constructor({headerElement, filtersElement, eventsBoardElement, eventsModel}) {
    this.#headerElement = headerElement;
    this.#filtersElement = filtersElement;
    this.#eventsBoardElement = eventsBoardElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#offers = [...this.#eventsModel.offers];
    this.#destinations = [...this.#eventsModel.destinations];

    this.#renderApp();
  }

  #renderEvent(event, offers, destinations) {
    const eventPresenter = new EventPresenter({eventsList: this.#eventsList.element});

    eventPresenter.init(event, offers, destinations);
  }

  #renderTripInfo() {
    render(new TripInfoView(), this.#headerElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    render(new FiltersView(this.#events), this.#filtersElement);
  }

  #renderSort() {
    render(new SortView(), this.#eventsBoardElement);
  }

  #renderNoEvent() {
    render(new NoEventView(), this.#eventsBoardElement);
  }

  #renderEvents() {
    this.#eventsList = new EventsListView();
    render(this.#eventsList, this.#eventsBoardElement);

    for (const event of this.#events) {
      this.#renderEvent(event, this.#offers, this.#destinations);
    }
  }

  #renderApp() {
    this.#renderTripInfo();
    this.#renderFilters();

    if (this.#events.length === 0) {
      this.#renderNoEvent();
      return;
    }

    this.#renderSort();
    this.#renderEvents();
  }
}
