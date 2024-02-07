import TripPresenter from './presenter/trip-presenter';
import TripModel from './model/trip-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewEventButtonView from './view/new-event-button-view';
import {render} from './framework/render';

import 'flatpickr/dist/flatpickr.min.css';
import TripApiService from './trip-api-service';

const AUTHORIZATION = 'Basic 111144ddcsd2cvsdvscl1sa2j';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const headerElement = document.querySelector('.trip-main');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const eventsBoardElement = document.querySelector('.trip-events');
const tripModel = new TripModel({
  TripApiService: new TripApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  headerElement,
  filtersElement,
  eventsBoardElement,
  tripModel,
  filterModel,
  onNewEventDestroy: closeNewEventHandler,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  tripModel
});
const newEventButtonComponent = new NewEventButtonView({onClickNewEvent: clickNewEventHandle});

function clickNewEventHandle() {
  tripPresenter.addNewEvent();
  newEventButtonComponent.element.disabled = true;
}

function closeNewEventHandler() {
  newEventButtonComponent.element.disabled = false;
}

filterPresenter.init();
tripPresenter.init();
tripModel.init()
  .then(() => render(newEventButtonComponent, headerElement));
