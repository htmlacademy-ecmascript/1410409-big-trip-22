import {render, RenderPosition} from './render';
import FiltersView from './view/filters-view';
import BoardPresenter from './presenter/board-presenter';
import NewEventButtonView from './view/new-event-button-view';
import TripInfoView from './view/trip-info-view';

const siteHeaderElement = document.querySelector('header');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('main');
const siteTripEventsContainerElement = siteMainElement.querySelector('.page-body__container');
const boardPresenter = new BoardPresenter(siteTripEventsContainerElement);

render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteFiltersElement);
render(new NewEventButtonView(), siteTripMainElement);
boardPresenter.init();
