function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomFromArray(array) {
  return array[getRandomInt(array.length)];
}

function renderCard(card) {
  return `
  <div class="card" data-id="${card.id}">${card.name}</div> `;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export { getRandomFromArray, getRandomInt, renderCard, delay };
