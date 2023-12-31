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
    const eventsList = new EventsListView();
    this.tripEvents = [...this.eventsModel.getEvents()];

    render(new TripInfoView(), this.tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.filtersElement);
    render(new SortView(), this.eventsContainerElement);
    render(eventsList, this.eventsContainerElement);

    render(new EditEventView(this.tripEvents[0]), eventsList.getElement());

    for (let i = 1; i < this.tripEvents.length; i++) {
      render(new EventView({event: this.tripEvents[i]}), eventsList.getElement());
    }
  }
}
