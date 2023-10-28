import { teachers, workshops } from "../data.js";

const body = document.querySelector("#teachers-wrapper");

let teacherContent = "";

const sorted = teachers.sort((a, b) => {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) return 1;
});

for (const teacher of sorted) {
  teacherContent += `
  <div class="teacher" id="${teacher.id}">
  <h2>${teacher.name}</h2>
  <p>${teacher.bio}</p>
  <h3>Workshops</h3>
  <ul>`;
  for (const id of teacher.workshopId) {
    const _workshop = workshops.find((workshop) => workshop.id == id);
    teacherContent += `<li><a href="../workshops#${_workshop.id}">${_workshop.name}</a></li>`;
  }
  teacherContent += `</ul></div>`;
}

body.innerHTML = teacherContent;
