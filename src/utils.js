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

export {getRandomNumber, getRandomArrayElement, shuffle};
