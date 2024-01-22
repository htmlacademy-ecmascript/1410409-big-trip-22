import AbstractView from '../framework/view/abstract-view';
import {generateFilter} from '../mock/filter';
import {capitalizeFirstLetter} from '../utils/common';
import {FilterTypes} from '../const';

function createFilterTemplate(filter, currentFilter) {
  const {type, count} = filter;
  return (`
  <div class="trip-filters__filter">
    <input
    id="filter-${type}"
    class="trip-filters__filter-input
    visually-hidden"
    type="radio"
    name="trip-filter"
    value="${type}"
    ${count === 0 ? 'disabled' : ''}
    ${type === currentFilter ? 'checked' : ''}
    >
    <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
  </div>
  `);
}

function createFiltersTemplate(events, currentFilter) {
  const filters = generateFilter(events);

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filters.map((filter) => createFilterTemplate(filter, currentFilter)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
  );
}

export default class FiltersView extends AbstractView {
  #events = [];
  #currentFilter = '';

  constructor(events, currentFilter = FilterTypes.EVERYTHING) {
    super();
    this.#events = events;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFiltersTemplate(this.#events, this.#currentFilter);
  }
}
