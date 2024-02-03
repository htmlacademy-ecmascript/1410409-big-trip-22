import EventsListView from '../view/events-list-view';
import TripInfoView from '../view/trip-info-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import {remove, render, RenderPosition} from '../framework/render';
import NoEventView from '../view/no-event';
import EventPresenter from './event-presenter';
import {SortType, UpdateType, UserAction} from '../const';
import {sortByDay, sortByPrice, sortByTime} from '../utils/event';

export default class TripPresenter {
  #eventsList = new EventsListView();
  #headerElement = null;
  #filtersElement = null;
  #eventsBoardElement = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #noEventComponent = new NoEventView();
  #eventPresenters = new Map();

  constructor({headerElement, filtersElement, eventsBoardElement, eventsModel, offersModel, destinationsModel}) {
    this.#headerElement = headerElement;
    this.#filtersElement = filtersElement;
    this.#eventsBoardElement = eventsBoardElement;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#eventsModel.addObserver(this.#modelEventHandler);
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#eventsModel.events].sort(sortByDay);
      case SortType.TIME:
        return [...this.#eventsModel.events].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortByPrice);
    }

    return this.#eventsModel.events;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();

    if (this.events.length === 0) {
      render(this.#noEventComponent, this.#eventsBoardElement);
      return;
    }

    this.#renderSort();
    this.#renderEvents();
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

  #renderFilters() {
    render(new FiltersView(this.events), this.#filtersElement);
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

  #openEditEventHandler = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.closeEditEvent());
  };

  #renderBoard() {
    this.#renderSort();
    this.#renderEvents();
  }

  #clearBoard(resetSortType = false) {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#noEventComponent);
    remove(this.#eventsList);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
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
