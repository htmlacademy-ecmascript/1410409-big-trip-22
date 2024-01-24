import EventsListView from '../view/events-list-view';
import EventView from '../view/event-view';
import TripInfoView from '../view/trip-info-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EditEventView from '../view/edit-event-view';
import {render, RenderPosition, replace} from '../framework/render';
import NoEventView from '../view/no-event';

export default class TripPresenter {
  #eventsList = null;
  #tripMainElement = null;
  #filtersElement = null;
  #eventsContainerElement = null;
  #eventsModel = null;

  #events = [];
  #offers = [];
  #destinations = [];

  constructor({tripMainElement, filtersElement, eventsContainerElement, eventsModel}) {
    this.#tripMainElement = tripMainElement;
    this.#filtersElement = filtersElement;
    this.#eventsContainerElement = eventsContainerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#offers = [...this.#eventsModel.offers];
    this.#destinations = [...this.#eventsModel.destinations];

    this.#renderApp();
  }

  #renderEvent(event, offers, destinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event,
      offers,
      destinations,
      onClickEdit: () => {
        replaceCardToForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    const editEventComponent = new EditEventView({
      event,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replaceCardToForm() {
      replace(editEventComponent, eventComponent);
    }

    function replaceFormToCard() {
      replace(eventComponent, editEventComponent);
    }

    render(eventComponent, this.#eventsList.element);
  }

  #renderApp() {
    this.#eventsList = new EventsListView();

    render(new TripInfoView(), this.#tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FiltersView(this.#events), this.#filtersElement);
    render(new SortView(this.#events), this.#eventsContainerElement);
    render(this.#eventsList, this.#eventsContainerElement);

    if (this.#events.length === 0) {
      render(new NoEventView(), this.#eventsList.element);
      return;
    }

    for (const event of this.#events) {
      this.#renderEvent(event, this.#offers, this.#destinations);
    }
  }
}
