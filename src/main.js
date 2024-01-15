import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();

const tripPresenter = new TripPresenter({
  tripMainElement,
  filtersElement,
  eventsContainerElement,
  eventsModel
});

tripPresenter.init();
