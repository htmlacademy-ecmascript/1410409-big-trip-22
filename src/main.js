import TripPresenter from './presenter/trip-presenter';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({tripMainElement, filtersElement, eventsContainerElement});

tripPresenter.init();
