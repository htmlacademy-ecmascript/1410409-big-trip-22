import EventsListView from '../view/events-list';
import {render, RenderPosition} from '../render';
import EventView from '../view/event-view';
import {EVENT_COUNT} from '../const';
import TripInfoView from '../view/trip-info-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EditEventView from '../view/edit-event-view';

export default class TripPresenter {

  constructor({tripMainElement, filtersElement, eventsContainerElement}) {
    this.tripMainElement = tripMainElement;
    this.filtersElement = filtersElement;
    this.eventsContainerElement = eventsContainerElement;
  }

  init() {
    const eventsList = new EventsListView();

    render(new TripInfoView(), this.tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.filtersElement);
    render(new SortView(), this.eventsContainerElement);
    render(eventsList, this.eventsContainerElement);

    render(new EditEventView(), eventsList.getElement());

    for (let i = 0; i < EVENT_COUNT; i++) {
      render(new EventView(), eventsList.getElement());
    }
  }
}
