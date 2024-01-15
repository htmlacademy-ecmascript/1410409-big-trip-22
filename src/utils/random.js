function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

function getRandomArrayElement(items) {
  return items[getRandomNumber(items.length)];
}

export {getRandomNumber, getRandomArrayElement};
