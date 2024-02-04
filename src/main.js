import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewEventButtonView from './view/new-event-button-view';
import {render} from './framework/render';

const headerElement = document.querySelector('.trip-main');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const eventsBoardElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  headerElement,
  filtersElement,
  eventsBoardElement,
  eventsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewEventDestroy: closeNewEventHandler,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  eventsModel
});
const newEventButtonComponent = new NewEventButtonView({onClickNewEvent: clickNewEventHandle});

function clickNewEventHandle() {
  tripPresenter.addNewEvent();
  newEventButtonComponent.element.disabled = true;
}

function closeNewEventHandler() {
  newEventButtonComponent.element.disabled = false;
}

render(newEventButtonComponent, headerElement);

filterPresenter.init();
tripPresenter.init();
