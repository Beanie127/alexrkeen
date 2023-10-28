import { workshops, teachers } from "../data.js";

const body = document.querySelector("#workshops-wrapper");

let workshopContent = "";

const sorted = workshops.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
});
console.log(sorted);
for (const workshop of sorted) {
  if (workshop.id.includes("jam") == false) {
    // loop through each workshop
    workshopContent += `
  <div class="workshop" id="${workshop.id}">
  <h3>${workshop.name}</h3>`;
    // find the teacher and link their profile
    const _teacher = teachers.find(
      (teacher) => teacher.name == workshop.teacher
    );
    workshopContent += `
  <em class="teacher">Hosted by <a href="../teachers#${_teacher.id}">${workshop.teacher}</a></em>
    `;
    if (workshop.prerequisites) {
      workshopContent += `
      <p class="prerequisites"><strong>Prerequisites:</strong> ${workshop.prerequisites}</p>`;
    }

    workshopContent += `<p class="description">${workshop.description}</p>
  </div>
  `;
  }
}
workshopContent += `<hr><h2>Jams</h2>`;

for (const workshop of sorted) {
  if (workshop.id.includes("jam")) {
    workshopContent += `
    <div class="workshop jam" id ="${workshop.id}">
    <h3>${workshop.name}</h3>`;
    // find the teacher and link their profile
    const _teacher = teachers.find(
      (teacher) => teacher.name == workshop.teacher
    );
    workshopContent += `
  <em class="teacher">Hosted by <a href="../teachers#${_teacher.id}">${workshop.teacher}</a></em>
    `;
    if (workshop.prerequisites) {
      workshopContent += `
      <p class="prerequisites"><strong>Prerequisites:</strong> ${workshop.prerequisites}</p>`;
    }

    workshopContent += `<p class="description">${workshop.description}</p>
  </div>
  `;
  }
}
body.innerHTML = workshopContent;
