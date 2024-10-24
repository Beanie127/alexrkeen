function randomNumber(cap) {
  return Math.floor(Math.random() * cap);
}

export default function randFromArray(array) {
  const num = randomNumber(array.length);
  return array[num];
}
