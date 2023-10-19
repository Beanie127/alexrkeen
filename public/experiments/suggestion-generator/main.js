import {
  events,
  activities,
  objects,
  jobs,
  locales,
  emotions,
  relationships,
  stories,
} from "./prompts.js";

const job = document.querySelector("#job");
const object = document.querySelector("#object");
const activity = document.querySelector("#activity");
const event = document.querySelector("#event");
const relationship = document.querySelector("#relationship");
const locale = document.querySelector("#locale");
const emotion = document.querySelector("#emotion");
const story = document.querySelector("#story");
const output = document.querySelector("#output");
const undo = document.querySelector("#undo");
const any = document.querySelector("#any");
const prompts = [
  events,
  objects,
  activities,
  jobs,
  locales,
  emotions,
  relationships,
  stories,
];
let previous = [];
////////// UTILITY FUNCTIONS
const capitalise = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
const addListener = (button, list) => {
  button.addEventListener("click", (e) => {
    e.preventDefault;
    previous.push(output.innerHTML);
    const num = Math.floor(Math.random() * list.contents.length);
    const _prompt = capitalise(list.contents[num]);
    output.innerHTML = `<div class="prompt-category">${list.name}</div>${_prompt}`;
  });
};
addListener(event, events);
addListener(job, jobs);
addListener(activity, activities);
addListener(object, objects);
addListener(relationship, relationships);
addListener(locale, locales);
addListener(emotion, emotions);
addListener(story, stories);

any.addEventListener("click", (e) => {
  e.preventDefault;
  previous.push(output.innerHTML);
  const _num1 = Math.floor(Math.random() * prompts.length);
  const _category = prompts[_num1];
  const _num2 = Math.floor(Math.random() * _category.contents.length);
  const _prompt = capitalise(_category.contents[_num2]);
  output.innerHTML = `<div class="prompt-category">${_category.name}</div>${_prompt}`;
});

undo.addEventListener("click", (e) => {
  e.preventDefault;
  if (previous[0]) {
    const _undo = previous.pop();
    output.innerHTML = _undo;
  }
});
