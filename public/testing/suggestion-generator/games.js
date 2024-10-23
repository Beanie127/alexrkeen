import randomNumber from "./utilities.js";
const gameGenerator = document.querySelector("#game-generator");

function randomGame(list) {
  return list[randomNumber(list.length)];
}

function filterGames(tags, difficulty) {
  // create an array of invalid games
  const invalidGames = [];
  // add any games which exceed preferred difficulty
  games.forEach((game) => {
    if (game.difficulty > difficulty) {
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
  gameGenerator.querySelector("#game-name").textContent = game.name;
  gameGenerator.querySelector("#game-player-count").textContent = game.players;
  gameGenerator.querySelector("#game-difficulty").textContent = game.difficulty;
  gameGenerator.querySelector("#game-tags").textContent = game.tags;
  const description = gameGenerator.querySelector("#game-description");
  if (game.description) {
    description.removeAttribute("hidden");
    description.innerHTML = game.description;
  } else {
    description.setAttribute("hidden", "hidden");
  }
}

gameGenerator.addEventListener("submit", (e) => {
  e.preventDefault();
  const maxDifficulty = gameGenerator.difficulty.value;
  const excludedTags = [];
  const checkboxes = gameGenerator.querySelectorAll('[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) excludedTags.push(checkbox.value);
  });

  const validGames = filterGames(excludedTags, maxDifficulty);
  const currentGame = randomGame(validGames);
  renderGame(currentGame);
});

const games = [
  { name: "Number of Words", players: 3, difficulty: 1, tags: ["scene"] },
  { name: "Superheroes", players: 4, difficulty: 2, tags: ["scene"] },
  {
    name: "Film Dub",
    players: 4,
    difficulty: 2,
    tags: ["scene", "gibberish"],
  },
  {
    name: "Good/Bad/Weird Advice",
    players: 3,
    difficulty: 1,
    tags: ["talking heads"],
  },
  {
    name: "High Status/Low Status",
    players: 2,
    difficulty: 1,
    tags: ["scene", "talking heads"],
  },
  { name: "Hesistation", players: 2, difficulty: 1, tags: ["scene"] },
  {
    name: "Questions",
    players: 6,
    difficulty: 2,
    tags: ["physical", "talking heads"],
  },
  {
    name: "Three Headed Interview",
    players: 3,
    difficulty: 1,
    tags: ["talking heads"],
  },
  {
    name: "Two Headed Letter",
    players: 4,
    difficulty: 1,
    tags: ["talking heads"],
  },
  {
    name: "Sit/Stand/Lean",
    players: 3,
    difficulty: 2,
    tags: ["scene", "physical"],
  },
  {
    name: "Entrances & Exits",
    players: 3,
    difficulty: 2,
    tags: ["scene", "physical"],
  },
  {
    name: "Hollywood Director",
    players: 4,
    difficulty: 2,
    tags: ["scene"],
  },
  { name: "Diamond", players: 4, difficulty: 1, tags: ["scene"] },
  { name: "Character Swap", players: 2, difficulty: 1, tags: ["scene"] },
  { name: "Alphabet", players: 2, difficulty: 2, tags: ["scene"] },
  { name: "Half Life", players: 2, difficulty: 2, tags: ["scene"] },
  {
    name: "First Line/Last Line",
    players: 2,
    difficulty: 2,
    tags: ["scene"],
  },
  {
    name: "Backwards Interview",
    players: 2,
    difficulty: 3,
    tags: ["scene"],
  },
  { name: "Forward/Reverse", players: 2, difficulty: 3, tags: ["scene"] },
  {
    name: "Angel/Devil",
    players: 4,
    difficulty: 2,
    tags: ["guessing", "scene"],
  },
  {
    name: "Boring/Interesting",
    players: 4,
    difficulty: 1,
    tags: ["scene", "mime"],
  },
  { name: "New Choice", players: 2, difficulty: 1, tags: ["scene"] },
  { name: "Character Swap", players: 2, difficulty: 1, tags: ["scene"] },
  { name: "Emo Switch", players: 2, difficulty: 1, tags: ["scene"] },
  { name: "Genre Switch", players: 2, difficulty: 1, tags: ["scene"] },
  { name: "Scene God", players: 3, difficulty: 1, tags: ["scene"] },
  {
    name: "Seed Word",
    players: 4,
    difficulty: 1,
    tags: ["scene", "guessing"],
  },
  {
    name: "Celebrity Interview",
    players: 2,
    difficulty: 2,
    tags: ["talking heads", "guessing"],
  },
  {
    name: "Big Night Out",
    players: 3,
    difficulty: 2,
    tags: ["guessing", "scene"],
  },
  {
    name: "Blind Date",
    players: 4,
    difficulty: 2,
    tags: ["guessing", "talking heads"],
  },
  {
    name: "QVC",
    players: 4,
    difficulty: 2,
    tags: ["guessing", "mime", "talking heads"],
  },
  {
    name: "Late Again",
    players: 4,
    difficulty: 3,
    tags: ["guessing", "mime"],
  },
  {
    name: "Expert Translator",
    players: 2,
    difficulty: 2,
    tags: ["mime", "scene"],
  },
  {
    name: "Household Olympics",
    players: 4,
    difficulty: 2,
    tags: ["mime", "physical", "talking heads"],
  },
  {
    name: "Sound Effects (2 player)",
    players: 2,
    difficulty: 2,
    tags: ["mime"],
  },
  {
    name: "Sound Effects (4 player)",
    players: 4,
    difficulty: 1,
    tags: ["scene"],
  },
  {
    name: "Chain Murder",
    players: 4,
    difficulty: 2,
    tags: ["mime", "physical", "guessing"],
  },
  {
    name: "Sign Language Interpreter",
    players: 2,
    difficulty: 2,
    tags: ["mime", "talking heads"],
  },
  {
    name: "Weekend at Bernies",
    players: 4,
    difficulty: "intermediate",
    tags: ["physical", "scene"],
  },
  {
    name: "The Clap",
    players: 6,
    difficulty: "intermediate",
    tags: ["scene"],
  },
  {
    name: "Story Die",
    players: 6,
    difficulty: 3,
    tags: ["talking heads"],
  },
  {
    name: "Story Genre",
    players: 6,
    difficulty: "intermediate",
    tags: ["talking heads"],
  },
  {
    name: "Emo Symphony",
    players: 6,
    difficulty: 1,
    tags: ["talking heads"],
  },
  {
    name: "Freeze Tag",
    players: 6,
    difficulty: 1,
    tags: ["scene", "physical"],
  },
  {
    name: "185",
    players: 6,
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
    players: 6,
    difficulty: 3,
    tags: ["talking heads"],
  },
];

function load() {
  const currentGame = randomGame(games);
  renderGame(currentGame);
}

load();
