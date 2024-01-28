import EventsListView from '../view/events-list-view';
import TripInfoView from '../view/trip-info-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import {render, RenderPosition} from '../framework/render';
import NoEventView from '../view/no-event';
import EventPresenter from './event-presenter';
import {updateItems} from '../utils/common';
import {SortType} from '../const';
import {sortByPrice, sortByTime} from '../utils/event';

export default class TripPresenter {
  #eventsList = null;
  #headerElement = null;
  #filtersElement = null;
  #eventsBoardElement = null;
  #eventsModel = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #noEventComponent = new NoEventView();

  #events = [];
  #offers = [];
  #destinations = [];
  #beforeSortEvents = [];
  #eventPresenters = new Map();

  constructor({headerElement, filtersElement, eventsBoardElement, eventsModel}) {
    this.#headerElement = headerElement;
    this.#filtersElement = filtersElement;
    this.#eventsBoardElement = eventsBoardElement;
    this.#eventsModel = eventsModel;
    this.#offers = [...this.#eventsModel.offers];
    this.#destinations = [...this.#eventsModel.destinations];
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#beforeSortEvents = [...this.#eventsModel.events];

    this.#renderTripInfo();
    this.#renderFilters();

    if (this.#events.length === 0) {
      render(this.#noEventComponent, this.#eventsBoardElement);
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
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onChangeSortType: this.#changeSortTypeHandler,
    });
    render(this.#sortComponent, this.#eventsBoardElement);
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
    this.#beforeSortEvents = updateItems(updatedEvent, this.#beforeSortEvents);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #openEditEventHandler = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.closeEditEvent());
  };

  #clearEventsList() {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
  }

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#events = [...this.#beforeSortEvents];
        break;
      case SortType.TIME:
        this.#events.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#events.sort(sortByPrice);
        break;
    }

    this.#currentSortType = sortType;
  };

  #changeSortTypeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEvents();
  };
}
