import EventListView from '../view/event-list';
import BoardView from '../view/board-view';
import {render} from '../render';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';
import {EVENT_COUNT} from '../constants';

export default class BoardPresenter {
  boardComponent = new BoardView();
  eventListComponent = new EventListView();

  constructor(boardContainer) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.eventListComponent, this.boardComponent.getElement());
    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < EVENT_COUNT; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
