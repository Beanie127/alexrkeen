function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomFromArray(array) {
  return array[getRandomInt(array.length)];
}

export { getRandomFromArray, getRandomInt };
