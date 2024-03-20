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

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export { getRandomFromArray, getRandomInt, renderCard, delay, removeItemOnce };
