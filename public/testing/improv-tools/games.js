import randFromArray from "./utilities.js";
const gameGenerator = document.querySelector("#game-generator");
const gameReset = document.querySelector("#game-reset");
const gameOutput = document.querySelector("#current-game");
const pastGamesList = document.querySelector("#past-games");
const pastGames = [];

function reset() {
  pastGames.length = 0;
  pastGamesList.innerHTML = "";
  gameOutput.setAttribute("hidden", "hidden");
}

gameReset.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Reset the game list?")) reset();
});

function updatePastGames(name) {
  if (name == "") return;
  const li = document.createElement("li");
  li.textContent = name;
  pastGamesList.appendChild(li);
}

function filterGames(tags, playerCount, difficulty) {
  // create an array of invalid games
  const invalidGames = [...pastGames];
  // add any games which exceed preferred difficulty or max player count
  games.forEach((game) => {
    if (game.difficulty > difficulty || game.playerCount > playerCount) {
      invalidGames.push(game);
    }
    // check if game has any tags which match excluded tags
    game.tags.forEach((tag) => {
      if (tags.includes(tag)) {
        invalidGames.push(game);
      }
    });
  });
  // generate valid games list
  const validGames = games.filter((game) => !invalidGames.includes(game));
  return validGames;
}

function renderGame(game) {
  gameOutput.removeAttribute("hidden");
  updatePastGames(gameGenerator.querySelector("#game-name").textContent);

  gameGenerator.querySelector("#game-name").textContent = game.name;
  gameGenerator.querySelector("#game-player-count").textContent =
    game.playerCount;
  const description = gameGenerator.querySelector("#game-description");

  if (game.description) {
    description.removeAttribute("hidden");
    description.innerHTML = game.description;
  } else {
    description.setAttribute("hidden", "hidden");
  }

  pastGames.push(game);
}

gameGenerator.addEventListener("submit", (e) => {
  e.preventDefault();
  // get filtered tags
  const excludedTags = [];
  const checkboxes = gameGenerator.querySelectorAll('[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) excludedTags.push(checkbox.value);
  });
  // get max difficulty
  const maxDifficulty = gameGenerator.difficulty.value;
  const maxPlayerCount = gameGenerator.playerCount.value;
  // get valid games list and pick and render a valid game
  const validGames = filterGames(excludedTags, maxPlayerCount, maxDifficulty);
  if (validGames.length == 0) return;
  const currentGame = randFromArray(validGames);
  renderGame(currentGame);
});

const games = [
  { name: "Number of Words", playerCount: 3, difficulty: 1, tags: ["scene"] },
  { name: "Superheroes", playerCount: 4, difficulty: 2, tags: ["scene"] },
  {
    name: "Film Dub",
    playerCount: 4,
    difficulty: 2,
    tags: ["scene", "gibberish"],
  },
  {
    name: "Good/Bad/Weird Advice",
    playerCount: 3,
    difficulty: 1,
    tags: ["talking heads"],
  },
  {
    name: "High Status/Low Status",
    playerCount: 2,
    difficulty: 1,
    tags: ["scene", "talking heads"],
  },
  { name: "Hesistation", playerCount: 2, difficulty: 1, tags: ["scene"] },
  {
    name: "Questions",
    playerCount: 6,
    difficulty: 2,
    tags: ["physical", "talking heads"],
  },
  {
    name: "Three Headed Interview",
    playerCount: 3,
    difficulty: 1,
    tags: ["talking heads"],
  },
  {
    name: "Two Headed Letter",
    playerCount: 4,
    difficulty: 1,
    tags: ["talking heads"],
  },
  {
    name: "Sit/Stand/Lean",
    playerCount: 3,
    difficulty: 2,
    tags: ["scene", "physical"],
  },
  {
    name: "Entrances & Exits",
    playerCount: 3,
    difficulty: 2,
    tags: ["scene", "physical"],
  },
  {
    name: "Hollywood Director",
    playerCount: 4,
    difficulty: 2,
    tags: ["scene"],
  },
  { name: "Diamond", playerCount: 4, difficulty: 1, tags: ["scene"] },
  { name: "Character Swap", playerCount: 2, difficulty: 1, tags: ["scene"] },
  { name: "Alphabet", playerCount: 2, difficulty: 2, tags: ["scene"] },
  { name: "Half Life", playerCount: 2, difficulty: 2, tags: ["scene"] },
  {
    name: "First Line/Last Line",
    playerCount: 2,
    difficulty: 2,
    tags: ["scene"],
  },
  {
    name: "Backwards Interview",
    playerCount: 2,
    difficulty: 3,
    tags: ["scene"],
  },
  { name: "Forward/Reverse", playerCount: 2, difficulty: 3, tags: ["scene"] },
  {
    name: "Angel/Devil",
    playerCount: 4,
    difficulty: 2,
    tags: ["guessing", "scene"],
  },
  {
    name: "Boring/Interesting",
    playerCount: 4,
    difficulty: 1,
    tags: ["scene", "mime"],
  },
  { name: "New Choice", playerCount: 2, difficulty: 1, tags: ["scene"] },
  { name: "Character Swap", playerCount: 2, difficulty: 1, tags: ["scene"] },
  { name: "Emo Switch", playerCount: 2, difficulty: 1, tags: ["scene"] },
  { name: "Genre Switch", playerCount: 2, difficulty: 1, tags: ["scene"] },
  { name: "Scene God", playerCount: 3, difficulty: 1, tags: ["scene"] },
  {
    name: "Seed Word",
    playerCount: 4,
    difficulty: 1,
    tags: ["scene", "guessing"],
  },
  {
    name: "Celebrity Interview",
    playerCount: 2,
    difficulty: 2,
    tags: ["talking heads", "guessing"],
  },
  {
    name: "Big Night Out",
    playerCount: 3,
    difficulty: 2,
    tags: ["guessing", "scene"],
  },
  {
    name: "Blind Date",
    playerCount: 4,
    difficulty: 2,
    tags: ["guessing", "talking heads"],
  },
  {
    name: "QVC",
    playerCount: 4,
    difficulty: 2,
    tags: ["guessing", "mime", "talking heads"],
  },
  {
    name: "Late Again",
    playerCount: 4,
    difficulty: 3,
    tags: ["guessing", "mime"],
  },
  {
    name: "Expert Translator",
    playerCount: 2,
    difficulty: 2,
    tags: ["mime", "scene"],
  },
  {
    name: "Household Olympics",
    playerCount: 4,
    difficulty: 2,
    tags: ["mime", "physical", "talking heads"],
  },
  {
    name: "Sound Effects (2 player)",
    playerCount: 2,
    difficulty: 2,
    tags: ["mime"],
  },
  {
    name: "Sound Effects (4 player)",
    playerCount: 4,
    difficulty: 1,
    tags: ["scene"],
  },
  {
    name: "Chain Murder",
    playerCount: 4,
    difficulty: 2,
    tags: ["mime", "physical", "guessing"],
  },
  {
    name: "Sign Language Interpreter",
    playerCount: 2,
    difficulty: 2,
    tags: ["mime", "talking heads"],
  },
  {
    name: "Weekend at Bernies",
    playerCount: 4,
    difficulty: "intermediate",
    tags: ["physical", "scene"],
  },
  {
    name: "The Clap",
    playerCount: 6,
    difficulty: "intermediate",
    tags: ["scene"],
  },
  {
    name: "Story Die",
    playerCount: 6,
    difficulty: 3,
    tags: ["talking heads"],
  },
  {
    name: "Story Genre",
    playerCount: 6,
    difficulty: "intermediate",
    tags: ["talking heads"],
  },
  {
    name: "Emo Symphony",
    playerCount: 6,
    difficulty: 1,
    tags: ["talking heads"],
  },
  {
    name: "Freeze Tag",
    playerCount: 6,
    difficulty: 1,
    tags: ["scene", "physical"],
  },
  {
    name: "185",
    playerCount: 6,
    difficulty: 3,
    tags: ["talking heads"],
  },
  {
    name: "Scenes We'd Like To See",
    description: `
      <p>Step forward and deliver a one-ish-liner that matches the prompt. Prompts include: <ul>
      <li>Things you can say about ITEM that you can't say about your partner</li>
      <li>Things you wouldn't expect to hear from CELEBRITY</li>
      <li>Bad advice to hear at EVENT</li>
      <li>Unlikely lines to hear/read in a GENRE</li>
      <li>World's worst PROFESSION</li>
      <li>Things you wouldn't hear on (REALITY) TV SHOW</li>
      <li>Odd things to say while ACTIVITY</li>
      <li>Pranks PROFESSION play on each other</li>
      <li>Unlikely taglines for PRODUCT/BRAND</li>
      </ul></p>`,
    playerCount: 6,
    difficulty: 3,
    tags: ["talking heads"],
  },
];
