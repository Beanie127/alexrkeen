// DOM manipulation
export function updateField(target, innerHTML) {
  document.querySelector(target).innerHTML = innerHTML;
}

export function setHidden(target, hide = true) {
  const el = document.querySelector(target);
  if (hide) {
    el.setAttribute("hidden", "hidden");
    el.style.display = "none";
  } else {
    el.removeAttribute("hidden");
    el.removeAttribute("style");
  }
}

// Random selection stuff

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function randomIntTween(min, max) {
  const range = max - min;
  const result = min + Math.floor(Math.random() * range);
  return result;
}

export function bellCurveTween(min, max) {
  return Math.floor((randomIntTween(min, max) + randomIntTween(min, max)) / 2);
}

export function pickFrom(array, bellCurve = false) {
  let index;
  if (bellCurve) {
    index = bellCurveTween(0, array.length);
  } else {
    index = randomIntTween(0, array.length);
  }
  return array[index];
}

// timers
export function startTimer(exercise) {
  exercise.isActive = true;
  window.timerInterval = setInterval(() => {
    iterateTimer(exercise);
  }, 1000);
}

export function iterateTimer(exercise) {
  if (exercise.isActive == false) {
    console.log("exercise has been stopped or ended");
    clearInterval(window.timerInterval);
  }
  let minutes, seconds;
  minutes = parseInt(exercise.duration / 60, 10);
  seconds = parseInt(exercise.duration % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdownTimer.textContent = minutes + ":" + seconds;
  exercise.duration--;
  if (exercise.duration < 0) {
    expireTimer();
  }
}

export function expireTimer(btn) {
  console.log("ExpireTimer triggered");
  exercise.duration = 0;
  countdownTimer.textContent = "Time's up!";
  exercise.isActive = false;
}

// string manipulation

export function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//dates

export function today() {
  return new Date(Date.now()).toISOString().slice(0, 9);
}
