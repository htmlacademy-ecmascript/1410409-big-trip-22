export const DATE_FORMAT_DATE = 'MMM D';
export const DATE_FORMAT_TIME = 'HH:MM';
export const DATE_FORMAT_TAG = 'YYYY-MM-DD';
export const DATE_FORMAT_TAG_FULL = 'YYYY-MM-DDTHH:MM';
export const DATE_FORMAT_INPUT_DATE = 'DD/MM/YY';
export const DATE_FORMAT_INPUT_TIME = 'HH:MM';

export const MS_IN_MIN = 60000;
export const MIN_IN_HOUR = 60;
export const MIN_IN_DAY = 1440;

export const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const FilterTypes = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

export const DEFAULT_FILTER_TYPE = FilterTypes.EVERYTHING;

export const NoEventMessage = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.FUTURE]: 'There are no future events now',
};

export const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const DEFAULT_SORT_TYPE = SortType.DAY;

export const Sorts = [
  {
    sortType: SortType.DAY,
    isDisabled: false,
  },
  {
    sortType: SortType.EVENT,
    isDisabled: true,
  },
  {
    sortType: SortType.TIME,
    isDisabled: false,
  },
  {
    sortType: SortType.PRICE,
    isDisabled: false,
  },
  {
    sortType: SortType.OFFERS,
    isDisabled: true,
  },
];

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const DEFAULT_EVENT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

