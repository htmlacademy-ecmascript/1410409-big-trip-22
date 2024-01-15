import dayjs from 'dayjs';
import {MIN_IN_DAY, MIN_IN_HOUR, MS_IN_MIN} from '../const';

function addTwoDigitalFormat(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
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

export {
  durationTime
};
