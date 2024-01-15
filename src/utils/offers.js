import {getRandomNumber} from './random';

function getRandomOfferIdsByType(allOffers, type) {
  let resultArray = [];
  const offerIdsByType = allOffers.find((offer) => offer.type === type).offers.map((offer) => (offer.id
  ));
  if (offerIdsByType.length === 0) {
    return resultArray;
  }
  resultArray = [...offerIdsByType].slice(0, getRandomNumber(offerIdsByType.length));
  return resultArray;
}

function getOffersChecked(eventType, allOffers, checkedOfferIds) {
  const offersByType = allOffers.find((offer) => offer.type === eventType).offers;
  return offersByType.filter((offer) => checkedOfferIds.includes(offer.id));
}

export {getRandomOfferIdsByType, getOffersChecked};
