import EventsListView from '../view/events-list-view';
import TripInfoView from '../view/trip-info-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import {render, RenderPosition} from '../framework/render';
import NoEventView from '../view/no-event';
import EventPresenter from './event-presenter';
import {updateItems} from '../utils/common';

export default class TripPresenter {
  #eventsList = null;
  #headerElement = null;
  #filtersElement = null;
  #eventsBoardElement = null;
  #eventsModel = null;

  #events = [];
  #offers = [];
  #destinations = [];
  #eventPresenters = new Map();

  constructor({headerElement, filtersElement, eventsBoardElement, eventsModel}) {
    this.#headerElement = headerElement;
    this.#filtersElement = filtersElement;
    this.#eventsBoardElement = eventsBoardElement;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.events];
    this.#offers = [...this.#eventsModel.offers];
    this.#destinations = [...this.#eventsModel.destinations];
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();

    if (this.#events.length === 0) {
      this.#renderNoEvent();
      return;
    }

    this.#renderSort();
    this.#renderEvents();
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
      const eventPresenter = new EventPresenter({
        eventsList: this.#eventsList.element,
        offers: this.#offers,
        destinations: this.#destinations,
        onClickFavorite: this.#changeEventHandler,
        onClickEdit: this.#openEditEventHandler,
      });
      this.#eventPresenters.set(event.id, eventPresenter);
      eventPresenter.init(event);
    }
  }

  #changeEventHandler = (updatedEvent) => {
    this.#events = updateItems(updatedEvent, this.#events);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #openEditEventHandler = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.closeEditEvent())
  }
}
