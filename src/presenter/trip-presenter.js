import EventsListView from '../view/events-list-view';
import TripInfoView from '../view/trip-info-view';
import SortView from '../view/sort-view';
import {remove, render, RenderPosition} from '../framework/render';
import NoEventView from '../view/no-event';
import EventPresenter from './event-presenter';
import {DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE, SortType, UpdateType, UserAction} from '../const';
import {sortByDay, sortByPrice, sortByTime} from '../utils/event';
import {filter} from '../utils/filter';
import NewEventPresenter from './new-event-presenter';

export default class TripPresenter {
  #eventsList = new EventsListView();
  #headerElement = null;
  #filterElement = null;
  #eventsBoardElement = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;
  #filterType = DEFAULT_FILTER_TYPE;
  #noEventComponent = new NoEventView();
  #eventPresenters = new Map();
  #newEventPresenter = null;

  constructor({
    headerElement,
    filtersElement,
    eventsBoardElement,
    eventsModel,
    offersModel,
    destinationsModel,
    filterModel,
    onNewEventDestroy,
  }) {
    this.#headerElement = headerElement;
    this.#filterElement = filtersElement;
    this.#eventsBoardElement = eventsBoardElement;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      eventsList: this.#eventsList.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#viewActionHandler,
      onDestroy: onNewEventDestroy,
    });

    this.#eventsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const filteredEvents = filter[this.#filterType](this.#eventsModel.events);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort(sortByDay);
      case SortType.TIME:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
    }

    return filteredEvents;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderTripInfo();

    if (this.events.length === 0) {
      render(this.#noEventComponent, this.#eventsBoardElement);
      return;
    }

    this.#renderSort();
    this.#renderEvents();
  }

  addNewEvent() {
    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#newEventPresenter.init();
  }

  #viewActionHandler = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #modelEventHandler = (updateType, event) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(event.id).init(event);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard(true);
        this.#renderBoard();
        break;
    }
  };

  #renderTripInfo() {
    render(new TripInfoView(), this.#headerElement, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onChangeSortType: this.#changeSortTypeHandler,
    });
    render(this.#sortComponent, this.#eventsBoardElement);
  }

  #renderEvents() {
    render(this.#eventsList, this.#eventsBoardElement);

    for (const event of this.events) {
      const eventPresenter = new EventPresenter({
        eventsList: this.#eventsList.element,
        offers: this.offers,
        destinations: this.destinations,
        onClickEdit: this.#openEditEventHandler,
        onDataChange: this.#viewActionHandler,
      });

      this.#eventPresenters.set(event.id, eventPresenter);
      eventPresenter.init(event);
    }
  }

  #renderNoEvents() {
    this.#noEventComponent = new NoEventView({filterType: this.#filterType});
  }

  #openEditEventHandler = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.closeEditEvent());
  };

  #renderBoard() {
    if (this.events.length === 0) {
      this.#renderNoEvents();
    }

    this.#renderSort();
    this.#renderEvents();
  }

  #clearBoard(resetSortType = false) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#noEventComponent);
    remove(this.#eventsList);

    if (resetSortType) {
      this.#currentSortType = DEFAULT_SORT_TYPE;
    }
  }

  #changeSortTypeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderEvents();
  };
}
