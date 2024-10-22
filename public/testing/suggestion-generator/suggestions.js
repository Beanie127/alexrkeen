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

const history = [];

const undo = document.querySelector("#btn-undo");
const promptGenerator = document.querySelector("#prompt-generator");
const output = document.querySelector("#suggestion-output");

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function promptList(prompt) {
  switch (prompt) {
    case "event":
      return events;
    case "activity":
      return activities;
    case "object":
      return objects;
    case "job":
      return jobs;
    case "location":
      return locales;
    case "emotion":
      return emotions;
    case "relationship":
      return relationships;
    case "story":
      return stories;
    case "any":
      return randomList();
  }
}

function randomList() {
  const promptTypes = [
    events,
    activities,
    objects,
    jobs,
    locales,
    emotions,
    relationships,
    stories,
  ];
  const num = Math.floor(Math.random() * promptTypes.length);
  return promptTypes[num];
}

function randomPrompt(list) {
  const num = Math.floor(Math.random() * list.length);
  return list[num];
}

function saveCurrentPrompt(prompt) {
  history.push(prompt);
}

function loadLastPrompt() {
  const lastPrompt = history.pop();
  output.textContent = lastPrompt;
}

promptGenerator.addEventListener("submit", (e) => {
  e.preventDefault();

  saveCurrentPrompt(output.textContent);

  const elements = promptGenerator.elements;
  let suggestionType = "";

  for (const element of elements) {
    if (element.checked) suggestionType = element.value;
  }

  const list = promptList(suggestionType);
  const prompt = randomPrompt(list);
  output.textContent = capitalise(prompt);
});

undo.addEventListener("click", (e) => {
  if (history.length == 0) return;
  loadLastPrompt();
});
