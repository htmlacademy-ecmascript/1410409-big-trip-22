import {getRandomNumber} from './utils';

export const EVENT_COUNT = 3;
export const MAX_COUNT_IMAGES = 10;

export const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const CITY_NAMES = [
  'Chamonix',
  'Geneva',
  'Amsterdam',
  'Paris',
  'Berlin',
];

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const OFFERS = [
  {
    title: 'Add luggage',
    price: 50,
  },
  {
    title: 'Switch to comfort',
    price: 80,
  },
  {
    title: 'Add meal',
    price: 15,
  },
  {
    title: 'Choose seats',
    price: 5,
  },
  {
    title: 'Travel by train',
    price: 40,
  },
];


function getGallery(number = MAX_COUNT_IMAGES) {
  const gallery = [];

  for (let i = 0; i < getRandomNumber(number); i++) {
    gallery.push(`https://loremflickr.com/248/152?random=${getRandomNumber(number)}`);
  }

  return gallery;
}

export {getGallery};
