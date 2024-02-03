function capitalizeFirstLetter(string) {
  const lowerCaseString = string.toLowerCase();
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
}

function getItemById(id, array) {
  return array.find((item) => item.id === id);
}

function updateItems(newItem, allItems) {
  return allItems.map((item) => item.id === newItem.id ? newItem : item);
}

function isInput(evt) {
  return evt.target.tagName !== 'INPUT';
}

export {capitalizeFirstLetter, getItemById, updateItems, isInput};
