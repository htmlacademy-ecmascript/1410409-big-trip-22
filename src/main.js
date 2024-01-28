import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';

const headerElement = document.querySelector('.trip-main');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const eventsBoardElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();

const tripPresenter = new TripPresenter({
  headerElement,
  filtersElement,
  eventsBoardElement,
  eventsModel
});

tripPresenter.init();
