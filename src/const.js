export const DATE_FORMAT_DATE = 'MMM D';
export const DATE_FORMAT_TIME = 'HH:MM';
export const DATE_FORMAT_TAG = 'YYYY-MM-DD';
export const DATE_FORMAT_TAG_FULL = 'YYYY-MM-DDTHH:MM';
export const DATE_FORMAT_INPUT_DATE = 'DD/MM/YY';
export const DATE_FORMAT_INPUT_TIME = 'HH:MM';

export const EVENT_COUNT = 10;
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
