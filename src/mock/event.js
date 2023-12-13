import {getRandomArrayElement, getRandomNumber, shuffle} from '../utils';
import {CITY_NAMES, DESCRIPTIONS, EVENT_TYPES, getGallery, OFFERS} from '../const';

export const events = [
  {
    dateFrom: new Date('2023-01-01 10:30'),
    dateTo: new Date('2023-01-02 12:40'),
    type: getRandomArrayElement(EVENT_TYPES),
    city: getRandomArrayElement(CITY_NAMES),
    price: getRandomNumber(1000),
    offers: shuffle(OFFERS).slice(0, getRandomNumber(OFFERS.length)),
    isFavorite: !!getRandomNumber(2),
    destination: {
      description: shuffle(DESCRIPTIONS).slice(0, getRandomNumber(OFFERS.length)),
      gallery: getGallery(),
    }
  },
  {
    dateFrom: new Date('2023-01-02 18:01'),
    dateTo: new Date('2023-01-03 09:40'),
    type: getRandomArrayElement(EVENT_TYPES),
    city: getRandomArrayElement(CITY_NAMES),
    price: getRandomNumber(1000),
    offers: shuffle(OFFERS).slice(0, getRandomNumber(OFFERS.length)),
    isFavorite: !!getRandomNumber(2),
    destination: {
      description: shuffle(DESCRIPTIONS).slice(0, getRandomNumber(OFFERS.length)),
      gallery: getGallery(),
    }
  },
  {
    dateFrom: new Date('2023-01-03 11:08'),
    dateTo: new Date('2023-01-03 16:22'),
    type: getRandomArrayElement(EVENT_TYPES),
    city: getRandomArrayElement(CITY_NAMES),
    price: getRandomNumber(1000),
    offers: shuffle(OFFERS).slice(0, getRandomNumber(OFFERS.length)),
    isFavorite: !!getRandomNumber(2),
    destination: {
      description: shuffle(DESCRIPTIONS).slice(0, getRandomNumber(OFFERS.length)),
      gallery: getGallery(),
    }
  },
  {
    dateFrom: new Date('2023-01-03 18:00'),
    dateTo: new Date('2023-01-05 08:33'),
    type: getRandomArrayElement(EVENT_TYPES),
    city: getRandomArrayElement(CITY_NAMES),
    price: getRandomNumber(1000),
    offers: shuffle(OFFERS).slice(0, getRandomNumber(OFFERS.length)),
    isFavorite: !!getRandomNumber(2),
  },
];



export const EVENT_TYPES = [
  {
    eventType: CITY_NAMES[0],
    description: shuffle(DESCRIPTIONS).slice(0, getRandomNumber(OFFERS.length)),
    gallery: getGallery(),
  },
];
