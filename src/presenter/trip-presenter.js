import EventsListView from '../view/events-list';
import {render, RenderPosition} from '../render';
import EventView from '../view/event-view';
import TripInfoView from '../view/trip-info-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EditEventView from '../view/edit-event-view';

export default class TripPresenter {

  constructor({tripMainElement, filtersElement, eventsContainerElement, eventsModel}) {
    this.tripMainElement = tripMainElement;
    this.filtersElement = filtersElement;
    this.eventsContainerElement = eventsContainerElement;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.offers = [...this.eventsModel.getOffers()];
    this.destinations = [...this.eventsModel.getDestinations()];

    const eventsList = new EventsListView();

    render(new TripInfoView(), this.tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.filtersElement);
    render(new SortView(), this.eventsContainerElement);
    render(eventsList, this.eventsContainerElement);

    render(new EditEventView(this.events[0], this.offers, this.destinations), eventsList.getElement());

    for (let i = 1; i < this.events.length; i++) {
      render(new EventView({events: this.events[i], offers: this.offers, destinations: this.destinations}), eventsList.getElement());
    }
  }
}
