import {getMockOffers} from './offers';
import {getRandomOfferIdsByType} from '../utils/offers';
import {getRandomArrayElement} from '../utils/random';
import {EVENT_COUNT} from '../const';

const allOffers = getMockOffers();

const EVENTS = [
  {
    'id': 'd1152028-2e22-4134-8c97-f6dceeaa8e53',
    'basePrice': 6204,
    'dateFrom': '2024-02-14T03:08:06.925Z',
    'dateTo': '2024-02-14T12:00:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': true,
    'offers': getRandomOfferIdsByType(allOffers, 'taxi'),
    'type': 'taxi'
  },
  {
    'id': '1e65fbbf-2405-440d-9ef7-2e480a9620a5',
    'basePrice': 7501,
    'dateFrom': '2024-02-15T18:35:06.925Z',
    'dateTo': '2024-02-16T16:37:06.925Z',
    'destination': '09391556-048c-4c80-af32-c5ee3a3ebf12',
    'isFavorite': true,
    'offers': getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'id': 'b20bfd42-5a0d-484d-860c-a64be3bfca38',
    'basePrice': 3114,
    'dateFrom': '2024-02-17T10:47:06.925Z',
    'dateTo': '2024-02-19T01:23:06.925Z',
    'destination': 'e4ee14d8-f404-4262-803c-57f9cadaa0cf',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'taxi'),
    'type': 'taxi'
  },
  {
    'id': 'ff315516-aede-48ec-9691-0d220f1e5886',
    'basePrice': 6801,
    'dateFrom': '2024-02-20T03:57:06.925Z',
    'dateTo': '2024-02-21T03:17:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'drive'),
    'type': 'drive'
  },
  {
    'id': '4931a935-8773-4daa-8345-15d7653318bf',
    'basePrice': 4995,
    'dateFrom': '2024-02-22T07:05:06.925Z',
    'dateTo': '2024-02-23T14:32:06.925Z',
    'destination': 'e4ee14d8-f404-4262-803c-57f9cadaa0cf',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'check-in'),
    'type': 'check-in'
  },
  {
    'id': '08558884-ee00-42a8-8850-067ffa0e8fed',
    'basePrice': 4282,
    'dateFrom': '2024-02-24T15:00:06.925Z',
    'dateTo': '2024-02-25T08:51:06.925Z',
    'destination': 'e8ea14f2-562d-4113-bce1-59ecfe07f5fb',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'restaurant'),
    'type': 'restaurant'
  },
  {
    'id': '364ad232-8066-4ff1-8239-8524bc12e097',
    'basePrice': 7185,
    'dateFrom': '2024-02-26T12:03:06.925Z',
    'dateTo': '2024-02-26T19:35:06.925Z',
    'destination': 'a81d0ceb-703e-4843-8e10-2ce98127c2d0',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'bus'),
    'type': 'bus'
  },
  {
    'id': 'ca5090cd-b28e-4dff-85c2-7bb2bf83d4ec',
    'basePrice': 2128,
    'dateFrom': '2024-02-27T17:15:06.925Z',
    'dateTo': '2024-02-29T08:58:06.925Z',
    'destination': 'a81d0ceb-703e-4843-8e10-2ce98127c2d0',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'bus'),
    'type': 'bus'
  },
  {
    'id': 'e62a9aca-e3d5-4cbe-8c1d-e73231116573',
    'basePrice': 6524,
    'dateFrom': '2024-02-29T21:07:06.925Z',
    'dateTo': '2024-03-01T11:57:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'restaurant'),
    'type': 'restaurant'
  },
  {
    'id': '4cd6d54e-bb47-4d6f-b89f-98c693f41283',
    'basePrice': 1914,
    'dateFrom': '2024-03-01T22:17:06.925Z',
    'dateTo': '2024-03-03T23:11:06.925Z',
    'destination': 'e4ee14d8-f404-4262-803c-57f9cadaa0cf',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'drive'),
    'type': 'drive'
  },
  {
    'id': 'b7bfe300-d17d-428c-b872-6ed3f35a70b3',
    'basePrice': 3422,
    'dateFrom': '2024-03-04T20:35:06.925Z',
    'dateTo': '2024-03-05T23:17:06.925Z',
    'destination': '0a8ae876-d594-4a2d-9c1c-38eca9be1f19',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'id': 'b6a1f03b-8f95-4275-8948-646c0a6a925c',
    'basePrice': 8162,
    'dateFrom': '2024-03-06T10:50:06.925Z',
    'dateTo': '2024-03-07T22:32:06.925Z',
    'destination': '0a8ae876-d594-4a2d-9c1c-38eca9be1f19',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'train'),
    'type': 'train'
  },
  {
    'id': '14bb79dd-679e-4115-b4f8-ba59338dd138',
    'basePrice': 2699,
    'dateFrom': '2024-03-08T21:11:06.925Z',
    'dateTo': '2024-03-09T23:26:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'drive'),
    'type': 'drive'
  },
  {
    'id': '0ee1f566-1f5c-45f8-8ae6-443f2dcfa51b',
    'basePrice': 4122,
    'dateFrom': '2024-03-11T10:17:06.925Z',
    'dateTo': '2024-03-12T11:39:06.925Z',
    'destination': 'e8ea14f2-562d-4113-bce1-59ecfe07f5fb',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'id': '58586ca0-b44d-4474-8858-4230e0fe61f9',
    'basePrice': 3244,
    'dateFrom': '2024-03-13T16:57:06.925Z',
    'dateTo': '2024-03-14T23:15:06.925Z',
    'destination': 'e4ee14d8-f404-4262-803c-57f9cadaa0cf',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'check-in'),
    'type': 'check-in'
  },
  {
    'id': '4f0aa4db-3dfe-4a09-930f-6bcc1ed73a85',
    'basePrice': 5620,
    'dateFrom': '2024-03-16T11:12:06.925Z',
    'dateTo': '2024-03-18T05:53:06.925Z',
    'destination': '40060aad-cd2f-40d8-9914-ab6f37cbf6c7',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'id': '9f9f8157-7b02-49ae-b5e5-c2c72a5dbc15',
    'basePrice': 2376,
    'dateFrom': '2024-03-19T22:48:06.925Z',
    'dateTo': '2024-03-20T16:27:06.925Z',
    'destination': '9765b0f9-1eef-4f4d-a590-684f9c613bfd',
    'isFavorite': false,
    offers: getRandomOfferIdsByType(allOffers, 'ship'),
    'type': 'ship'
  },
  {
    'id': 'e2765f76-2bd9-4db4-a833-e555d1c755e6',
    'basePrice': 46,
    'dateFrom': '2024-03-22T10:39:06.925Z',
    'dateTo': '2024-03-24T10:55:06.925Z',
    'destination': '09391556-048c-4c80-af32-c5ee3a3ebf12',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'restaurant'),
    'type': 'restaurant'
  },
  {
    'id': '0cfdcac0-26f6-4b3a-bdc1-191fd1839eeb',
    'basePrice': 4735,
    'dateFrom': '2022-03-25T09:45:06.925Z',
    'dateTo': '2022-03-26T00:34:06.925Z',
    'destination': '9765b0f9-1eef-4f4d-a590-684f9c613bfd',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'sightseeing'),
    'type': 'sightseeing'
  },
  {
    'id': 'f6aa75d0-4c8a-4db7-ba2f-6971fe91f53a',
    'basePrice': 9038,
    'dateFrom': '2024-03-28T00:33:06.925Z',
    'dateTo': '2024-03-28T09:48:06.925Z',
    'destination': '9765b0f9-1eef-4f4d-a590-684f9c613bfd',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'flight'),
    'type': 'flight'
  },
  {
    'id': '1ba616be-8ba2-45e9-b483-f067dffd7158',
    'basePrice': 7864,
    'dateFrom': '2024-03-29T06:55:06.925Z',
    'dateTo': '2024-03-30T09:50:06.925Z',
    'destination': '9765b0f9-1eef-4f4d-a590-684f9c613bfd',
    'isFavorite': true,
    offers: getRandomOfferIdsByType(allOffers, 'taxi'),
    'type': 'taxi'
  },
  {
    'id': 'a6d71d7e-b744-422c-b95d-daa62c1ec634',
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
  return Array.from({length: EVENT_COUNT}, () => getRandomArrayElement(EVENTS));
}

export {getMockEvents};
