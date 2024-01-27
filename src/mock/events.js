import {getMockOffers} from './offers';
import {getRandomOfferIdsByType} from '../utils/offers';
import {getRandomArrayElement} from '../utils/random';
import {EVENT_COUNT} from '../const';
import {nanoid} from 'nanoid';
import {sortByDay} from '../utils/event';

const allOffers = getMockOffers();

const EVENTS = [
  {
    'basePrice': 6204,
    'dateFrom': '2024-02-14T03:08:06.925Z',
    'dateTo': '2024-02-14T12:00:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': true,
    'offers': getRandomOfferIdsByType(allOffers, 'taxi'),
    'type': 'taxi'
  },
  {
    'basePrice': 7501,
    'dateFrom': '2024-02-15T18:35:06.925Z',
    'dateTo': '2024-02-16T16:37:06.925Z',
    'destination': '09391556-048c-4c80-af32-c5ee3a3ebf12',
    'isFavorite': true,
    'offers': getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'basePrice': 3114,
    'dateFrom': '2024-02-17T10:47:06.925Z',
    'dateTo': '2024-02-19T01:23:06.925Z',
    'destination': 'e4ee14d8-f404-4262-803c-57f9cadaa0cf',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'taxi'),
    'type': 'taxi'
  },
  {
    'basePrice': 6801,
    'dateFrom': '2024-02-20T03:57:06.925Z',
    'dateTo': '2024-02-21T03:17:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'drive'),
    'type': 'drive'
  },
  {
    'basePrice': 4995,
    'dateFrom': '2024-02-22T07:05:06.925Z',
    'dateTo': '2024-02-23T14:32:06.925Z',
    'destination': 'e4ee14d8-f404-4262-803c-57f9cadaa0cf',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'check-in'),
    'type': 'check-in'
  },
  {
    'basePrice': 4282,
    'dateFrom': '2024-02-24T15:00:06.925Z',
    'dateTo': '2024-02-25T08:51:06.925Z',
    'destination': 'e8ea14f2-562d-4113-bce1-59ecfe07f5fb',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'restaurant'),
    'type': 'restaurant'
  },
  {
    'basePrice': 7185,
    'dateFrom': '2024-02-26T12:03:06.925Z',
    'dateTo': '2024-02-26T19:35:06.925Z',
    'destination': 'a81d0ceb-703e-4843-8e10-2ce98127c2d0',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'bus'),
    'type': 'bus'
  },
  {
    'basePrice': 2128,
    'dateFrom': '2024-02-27T17:15:06.925Z',
    'dateTo': '2024-02-29T08:58:06.925Z',
    'destination': 'a81d0ceb-703e-4843-8e10-2ce98127c2d0',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'bus'),
    'type': 'bus'
  },
  {
    'basePrice': 6524,
    'dateFrom': '2024-02-29T21:07:06.925Z',
    'dateTo': '2024-03-01T11:57:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'restaurant'),
    'type': 'restaurant'
  },
  {
    'basePrice': 1914,
    'dateFrom': '2024-03-01T22:17:06.925Z',
    'dateTo': '2024-03-03T23:11:06.925Z',
    'destination': 'e4ee14d8-f404-4262-803c-57f9cadaa0cf',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'drive'),
    'type': 'drive'
  },
  {
    'basePrice': 3422,
    'dateFrom': '2024-03-04T20:35:06.925Z',
    'dateTo': '2024-03-05T23:17:06.925Z',
    'destination': '0a8ae876-d594-4a2d-9c1c-38eca9be1f19',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'basePrice': 8162,
    'dateFrom': '2024-03-06T10:50:06.925Z',
    'dateTo': '2024-03-07T22:32:06.925Z',
    'destination': '0a8ae876-d594-4a2d-9c1c-38eca9be1f19',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'train'),
    'type': 'train'
  },
  {
    'basePrice': 2699,
    'dateFrom': '2024-03-08T21:11:06.925Z',
    'dateTo': '2024-03-09T23:26:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'drive'),
    'type': 'drive'
  },
  {
    'basePrice': 4122,
    'dateFrom': '2024-03-11T10:17:06.925Z',
    'dateTo': '2024-03-12T11:39:06.925Z',
    'destination': 'e8ea14f2-562d-4113-bce1-59ecfe07f5fb',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'basePrice': 3244,
    'dateFrom': '2024-03-13T16:57:06.925Z',
    'dateTo': '2024-03-14T23:15:06.925Z',
    'destination': 'e4ee14d8-f404-4262-803c-57f9cadaa0cf',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'check-in'),
    'type': 'check-in'
  },
  {
    'basePrice': 5620,
    'dateFrom': '2024-03-16T11:12:06.925Z',
    'dateTo': '2024-03-18T05:53:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'basePrice': 2376,
    'dateFrom': '2024-03-19T22:48:06.925Z',
    'dateTo': '2024-03-20T16:27:06.925Z',
    'destination': '9765b0f9-1eef-4f4d-a590-684f9c613bfd',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'ship'),
    'type': 'ship'
  },
  {
    'basePrice': 46,
    'dateFrom': '2024-03-22T10:39:06.925Z',
    'dateTo': '2024-03-24T10:55:06.925Z',
    'destination': '09391556-048c-4c80-af32-c5ee3a3ebf12',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'restaurant'),
    'type': 'restaurant'
  },
  {
    'basePrice': 4735,
    'dateFrom': '2022-03-25T09:45:06.925Z',
    'dateTo': '2022-03-26T00:34:06.925Z',
    'destination': '9765b0f9-1eef-4f4d-a590-684f9c613bfd',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'sightseeing'),
    'type': 'sightseeing'
  },
  {
    'basePrice': 9038,
    'dateFrom': '2024-03-28T00:33:06.925Z',
    'dateTo': '2024-03-28T09:48:06.925Z',
    'destination': '9765b0f9-1eef-4f4d-a590-684f9c613bfd',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'basePrice': 7864,
    'dateFrom': '2024-03-29T06:55:06.925Z',
    'dateTo': '2024-03-30T09:50:06.925Z',
    'destination': '9765b0f9-1eef-4f4d-a590-684f9c613bfd',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'taxi'),
    'type': 'taxi'
  },
  {
    'basePrice': 4546,
    'dateFrom': '2024-03-31T23:35:06.925Z',
    'dateTo': '2024-04-01T23:18:06.925Z',
    'destination': '0cbdadd5-a4a4-4e93-87da-a282905446ab',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'bus'),
    'type': 'bus'
  },
];

function getMockEvents() {
  const resultEvents = Array.from({length: Math.min(EVENT_COUNT, EVENTS.length)}, () => getRandomArrayElement(EVENTS));
  return resultEvents.sort(sortByDay).map((item) => ({id: nanoid(), ...item}));
}

export {getMockEvents};
