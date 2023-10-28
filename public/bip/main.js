import { rooms, timeslots, sessions, workshops, teachers } from "./data.js";

const displayNow = document.querySelector("#current");
const displayNext = document.querySelector("#next");

let slotCurrent = 0;
let slotNext = 0;

// update slotCurrent and slotNext based on current time
const updateTimeslots = () => {
  console.log("Checking session details are up to date.");
  // get the current time
  const now = Date.now();
  // const now = 1699651800000; // to test, enter a random timeslot between 1699635600000 and 1699797600000
  console.log(`Current time is ${convertTime(now)}`);
  // find next timeslot in the array of times after now
  const _slotNext = timeslots.find((timeslot) => timeslot > now);
  console.log(`The next timeslot is ${convertTime(_slotNext)}`);
  // check if the next slot has changed since updateTimeslots was last called
  // and if so, update slotNext to match _slotNext and renderNowNext()
  if (_slotNext != slotNext) {
    console.log("Session details are out of date! Updating...");
    slotNext = _slotNext;
    console.log(`The next session starts at ${convertTime(slotNext)}`);
    // if the weekend has started
    if (slotNext != timeslots[1]) {
      slotCurrent = timeslots[timeslots.indexOf(_slotNext) - 1];
      console.log(`This session started at ${convertTime(slotCurrent)}`);
    } else {
      slotCurrent = 1;
    }
    renderNowNext();
  } else {
    // if current details are still in date, do nothing
    console.log("Session details are in date.");
  }
};

const renderNowNext = () => {
  console.log("Rendering...");
  // check if BIP has started and display relevant message
  if (slotCurrent == 1) {
    displayNow.innerHTML = `<p>BIP hasn't started yet! Check out the workshop descriptions, pack your bags and plan your journey.</p>`;
  } else {
    displayNow.innerHTML = createListingContent(slotCurrent);
  }
  // check if BIP has finished and display relevant message
  if (slotNext == 1714694400000) {
    displayNext.innerHTML = `<p>BIP WILL RETURN on Friday 3 May 2024! Keep an eye on <a href="https://group.spond.com/KYDCU">SPOND</a> to be first to register.</p>`;
  } else {
    displayNext.innerHTML = createListingContent(slotNext);
  }
};

const createListingContent = (timeslot) => {
  // find the session for the given timeslot
  const _session = sessions.find((session) => session.timeslot == timeslot);
  let content = `
  <h3>
    <strong>
      ${convertTime(timeslot)} | ${_session.description}
    </strong>
  </h3>
  `;
  // if the session has details, add them to the content
  if (_session.details) {
    content += `<em>${_session.details}</em>`;
  }
  // if this is a workshop session, find what workshop is in each room
  if (_session.category == "workshop") {
    content += `<ul>`;
    rooms.forEach((room) => {
      const _workshop = workshops.find(
        (workshop) => workshop.id == _session[room]
      );
      const _teacher = teachers.find(
        (teacher) => _workshop.teacher == teacher.name
      );
      content += `
          <li>
            <strong><a href="./workshops#${_workshop.id}">${_workshop.name}</a></strong>
            in ${room} with 
            <a href="./teachers#${_teacher.id}">${_teacher.name}</a>
          </li>
          `;
    });
    // if this is an entertainment session, list any details plus all the events
  } else if (_session.category == "entertainment") {
    content += `<ul>`;
    _session.options.forEach((option) => {
      content += `
        <li>${_session[option]}</li>
      `;
    });
    content += `</ul>`;
  }
  return content;
};

// utility functions

export const convertTime = (int) => {
  const timestamp = new Date(int);
  const time = timestamp.toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = timestamp.toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
  });
  return `${date} | ${time}`;
};

// on ready code

updateTimeslots(); // commented out while testing
setInterval(updateTimeslots, 6000);
