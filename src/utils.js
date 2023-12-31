import dayjs from 'dayjs';
import {MIN_IN_DAY, MIN_IN_HOUR, MS_IN_MIN} from './const';

export {getRandomNumber, getRandomArrayElement, shuffle, capitalizeFirstLetter, durationTime, getRandomId};

function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

function getRandomArrayElement(items) {
  return items[getRandomNumber(items.length)];
}

function shuffle(array) {
  const arrayNew = [...array];
  for (let i = arrayNew.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayNew[i], arrayNew[j]] = [arrayNew[j], arrayNew[i]];
  }
  return arrayNew;
}

function capitalizeFirstLetter(string) {
  const lowerCaseString = string.toLowerCase();
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
}

function durationTime(dateFrom, dateTo) {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const diff = date2.diff(date1) / MS_IN_MIN;

  if (diff < MIN_IN_HOUR) {
    return `${addTwoDigitalFormat(diff)}M`;
  }

  if (diff < MIN_IN_DAY) {
    const hours = addTwoDigitalFormat(Math.floor(diff / MIN_IN_HOUR));
    const minutes = addTwoDigitalFormat(diff % MIN_IN_HOUR);

    return `${hours}H ${minutes}M`;
  }

  {
    const days = addTwoDigitalFormat(Math.floor(diff / MIN_IN_DAY));
    const hours = addTwoDigitalFormat(Math.floor((diff % MIN_IN_DAY) / MIN_IN_HOUR));
    const minutes = addTwoDigitalFormat((diff % MIN_IN_DAY) % MIN_IN_HOUR);

    return `${days}D ${hours}H ${minutes}M`;
  }
}

function addTwoDigitalFormat(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

function getRandomId() {
  return Math.random().toString(16).slice(2);
}
