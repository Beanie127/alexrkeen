function randomNumber(cap) {
  return Math.floor(Math.random() * cap);
}

export function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function randFromArray(array) {
  const num = randomNumber(array.length);
  return array[num];
}
