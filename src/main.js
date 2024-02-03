import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

const headerElement = document.querySelector('.trip-main');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const eventsBoardElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const tripPresenter = new TripPresenter({
  headerElement,
  filtersElement,
  eventsBoardElement,
  eventsModel,
  offersModel,
  destinationsModel,
});

tripPresenter.init();
