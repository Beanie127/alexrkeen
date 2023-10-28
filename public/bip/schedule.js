import { sessions, workshops, teachers, timeslots, rooms } from "./data.js";

const schedule = document.querySelector("#schedule");

const returnTime = (int) => {
  return new Date(int).toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const returnDay = (int) => {
  const day = new Date(int).getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
};

let scheduleContent = "<thead><th>Time</th><th>Event</th></thead>";

for (const timeslot in timeslots) {
  const _session = sessions[timeslot];
  if (
    _session.timeslot != 1 &&
    _session.timeslot != 1714694400000 &&
    _session.timeslot != 1699797600000
  ) {
    scheduleContent += `
    <tr><td class="table-time">${returnDay(_session.timeslot)} ${returnTime(
      _session.timeslot
    )}</td>`;
    if (_session.category == "group") {
      scheduleContent += `<td class="table-event">${_session.description}</td>`;
    } else {
      scheduleContent += `<td class="table-event"><details><summary>${_session.description}</summary>`;
    }
    if (_session.category == "workshop") {
      scheduleContent += `<ul>`;
      rooms.forEach((room) => {
        const _workshop = workshops.find(
          (workshop) => workshop.id == _session[room]
        );
        const _teacher = teachers.find(
          (teacher) => _workshop.teacher == teacher.name
        );
        scheduleContent += `
          <li>
            <strong><a href="./workshops#${_workshop.id}">${_workshop.name}</a></strong>
            in ${room} with 
            <a href="./teachers#${_teacher.id}">${_teacher.name}</a>
          </li>
          `;
      });
      // if this is an entertainment session, list any details plus all the events
    } else if (_session.category == "entertainment") {
      scheduleContent += `<ul>`;
      _session.options.forEach((option) => {
        scheduleContent += `
        <li>${_session[option]}</li>
      `;
      });
      scheduleContent += `</ul>`;
    }
    scheduleContent += `</details></td></tr>
  `;
  }
}

schedule.innerHTML = scheduleContent;
