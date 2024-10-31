const refreshQuote = document.querySelector("#refresh-quote");
const displayQuote = document.querySelector("#display-quote");
const quoteFilter = document.querySelector("#quote-filter");
const quoteFilterResults = document.querySelector("#quote-filter-results");

function renderQuote(quote, target) {
  const blockquote = document.createElement("blockquote");
  blockquote.innerHTML = quote.text;
  const cite = document.createElement("cite");
  cite.innerHTML = quote.author;
  blockquote.appendChild(cite);
  target.appendChild(blockquote);
}

// return a random quote
function randomQuote() {
  const randomNumber = Math.floor(Math.random() * allQuotes.length);
  return allQuotes[randomNumber];
}

// return a filtered list of quotes which match the search term
function filterQuotes(searchTerm) {
  return allQuotes.filter(
    (quote) =>
      quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// on load, clear filter results, then render all quotes, and render a random quote
window.addEventListener("load", () => {
  quoteFilterResults.innerHTML = "";
  allQuotes.forEach((quote) => renderQuote(quote, quoteFilterResults));
  renderQuote(randomQuote(), displayQuote);
});

// on click, clear displayQuote and render a new random quote
refreshQuote.addEventListener("click", () => {
  displayQuote.innerHTML = "";
  renderQuote(randomQuote(), displayQuote);
});

// on keyup, clear filter results and render all quotes matching search term
quoteFilter.addEventListener("keyup", (e) => {
  quoteFilterResults.innerHTML = "";
  const filteredList = filterQuotes(e.target.value);
  filteredList.forEach((quote) => renderQuote(quote, quoteFilterResults));
});

const allQuotes = [
  {
    text: "To laugh often and much; to win the respect of intelligent people and the affection of children; to earn the appreciation of honest critics and endure the betrayal of false friends; to appreciate beauty; to find the best in others; to leave the world a bit better, whether by a healthy child, a garden patch or a redeemed social condition; to know even one life has breathed easier because you have lived. This is to have succeeded.",
    author: "Bessie A. Stanley",
  },
  {
    text: "Be kind, for everyone you meet is fighting a hard battle.",
    author: "Socrates",
  },
  {
    text: "Failure doesn't define you. It's what you do after you fail that determines whether you're a leader or a waste of perfectly good air.",
    author: "Sabaa Tahir",
  },
  {
    text: "We are punished by our sins, not for them.",
    author: "Elbert Hubbard",
  },
  {
    text: "Don't take life too seriously. You will never get out of it alive.",
    author: "Elbert Hubbard",
  },
  {
    text: "In order to have friends, you must first be one.",
    author: "Elbert Hubbard",
  },
  {
    text: "It takes 20 years to build a reputation and five minutes to ruin it.",
    author: "Warren Buffett",
  },
  {
    text: "Human nature is not a machine to be built after a model, and set to do exactly the work prescribed for it, but a tree, which requires to grow and develop itself on all sides, according to the tendency of the inward forces which make it a living thing.",
    author: "John Stuart Mill",
  },
  {
    text: "‘Blessed be all metrical rules that forbid automatic responses, / <br/> force us to have second thoughts, free from the fetters of Self",
    author: "W.H. Auden",
  },
  {
    text: "There is nothing wrong with spending a night in jail if it means getting the shot you need. Send out all your dogs and one might return with pray... Carry bolt cutters everywhere. Thwart institutional cowardice.",
    author: "Werner Herzog",
  },
  {
    text: "Never attribute to malice or stupidity that which can be explained by moderately rational individuals following incentives in a complex system.",
    author: "Douglas W. Hubbard",
  },
  { text: "It never gets easier, you just go faster.", author: "Greg LeMond" },
  {
    text: "But there are no labor shortcuts for caring, in and of itself, no stretching a little bit of intentionality to provide focused attention across some ever increasing population. Care doesn’t scale; cruelty does. You can’t automate your way around the infinite obligation to the other.",
    author: "Rob Horning",
  },
  {
    text: "The needs, tastes, aspirations and interests of mankind are neither similar nor naturally harmonious; often they are diametrically opposed and antagonistic. On the other hand, the life of each individual is so conditioned by the life of others that it would be impossible, even assuming it were convenient to do so, to isolate oneself and live one’s own life. Social solidarity is a fact from which no one can escape.",
    author: "Errico Malatesta",
  },
  {
    author: "Eckhart Tolle",
    text: "Acceptance of the unacceptable is the greatest source of grace in this world.",
  },
  {
    author: "Michael Singer",
    text: "If you want to know why you do something, stop doing it and see what happens.",
  },
  {
    author: "Sugar (Cheryl Strayed)",
    text: "I’ll never know and neither will you of the life you don’t choose. We’ll only know that whatever that sister life was, it was important and beautiful and not ours. It was the ghost ship that didn’t carry us. There’s nothing to do but salute it from the shore.",
  },
  {
    author: "Cyril Connolly",
    text: "Better to write for yourself and have no public, than to write for the public and have no self.",
  },
  {
    author: "Ursula K. Le Guin",
    text: "A child free from the guilt of ownership and the burden of economic competition will grow up with the will to do what needs doing and the capacity for joy in doing it. It is useless work that darkens the heart. The delight of the nursing mother, of the scholar, of the successful hunter, of the good cook, of the skilful maker, of anyone doing needed work and doing it well — this durable joy is perhaps the deepest source of human affection and of sociality as a whole.",
  },
  {
    author: "Denis Diderot",
    text: "Beware of the man who talks about putting things in order! Putting things in order always means getting other people under your control.",
  },
  {
    author: "Denis Diderot",
    text: "Pithy sentences are like sharp nails which force truth upon our memory.",
  },
  {
    author: "Denis Diderot",
    text: "Men will never be free until the last king is strangled with the entrails of the last priest.",
  },
  {
    author: "Clive James",
    text: "All I can do is turn a phrase until it catches the light.",
  },
  {
    author: "Jorje Luis Borges",
    text: "What I'm really concerned about is reaching one person. And that person may be myself for all I know.",
  },
  {
    author: "Rich Burlew",
    text: "Intentions matter only in the absence of results. And then, only for the blaming.",
  },
  {
    author: "Plutarch",
    text: "Education is not the filling of a pail, but the lighting of a fire.",
  },
  {
    author: "Neil Gaiman",
    text: "I can write down a few words and make people thousands of miles away, whom I have never met and will never meet, laugh tears of joy and cry tears of true sorrow for people who do not exist and have never existed and never will exist. If that isn't actual literal magic I don't know what is. ",
  },
  {
    author: "Richard N. Bolles",
    text: 'One of the saddest pieces of advice in the world is "Oh come now — be realistic." The best parts of this world were not fashioned by those who were "realistic."',
  },
  {
    author: "Linus Pauling",
    text: "The best way to have a good idea is to have a lot of ideas.",
  },
  {
    author: "Robert Heinlein",
    text: "A human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship, design a building, write a sonnet, balance accounts, build a wall, set a bone, comfort the dying, take orders, give orders, cooperate, act alone, solve equations, analyze a new problem, pitch manure, program a computer, cook a tasty meal, fight efficiently, die gallantly. Specialization is for insects.",
  },
  {
    author: "Harry Ruby",
    text: "The best bridge between despair and hope is a good night's sleep.",
  },
  {
    author: "Adam Grant",
    text: "It&apos;s impossible to please everyone. The question is whether you're disappointing the right people.",
  },
  {
    author: "David McRaney",
    text: "Until we know we are wrong, being wrong feels exactly like being right.",
  },
  {
    author: "Aldous Huxley",
    text: "Experience is not what happens to you; it is what you do with what happens to you.",
  },
  {
    author: "Haruki Murakami",
    text: "[A]s I write I think about all sorts of things. I don&apos;t necessarily write down what I&apos;m thinking; It&apos;s just that as I write I think about things. As I write, I arrange my thoughts. And rewriting and revising takes my thinking down even deeper paths. No matter how much I write, though, I never reach a conclusion. And no matter how much I rewrite, I never reach the destination. Even after decades of writing, the same still holds true.",
  },
  {
    author: "Walter Anderson",
    text: "The most sincere compliment we can pay is attention.",
  },
  {
    author: "C.S. Lewis",
    text: "Friendship is unnecessary, like philosophy, like art, like the universe itself… It has no survival value; Rather it is one of those things which give value to survival.",
  },
  {
    author: "J Matthews",
    text: "We cannot get anything 'out' of life. There is no little pocket, situated outside of life, where we could steal life's provisions and squirrel them away. The life of this moment has no outside.",
  },
  {
    author: "Paulo Coelho",
    text: "The reward of our work is not what we get, but what we become.",
  },
  {
    author: "Richard Feynman",
    text: "Fall in love with some activity, and do it! Nobody ever figures out what life is all about, and it doesn't matter. Explore the world. Nearly everything is really interesting if you go into it deeply enough. Work as hard and as much as you want to on the things you like to do the best. Don't think about what you want to be, but what you want to do. Keep up some kind of a minimum with other things so that society doesn't stop you from doing anything at all.",
  },
  {
    author: "Ursula K. Le Guin",
    text: "For we each of us deserve everything, every luxury that was ever piled in the tombs of the dead kings, and we each of us deserve nothing, not a mouthful of bread in hunger. Have we not eaten while another starved? Will you punish us for that? Will you reward us for the virtue of starving while others ate? No man earns punishment, no man earns reward. Free your mind of the idea of deserving, the idea of earning, and you will begin to be able to think.",
  },
  {
    author: "Werner Herzog",
    text: "Fact creates norms, and truth illumination.",
  },
  {
    author: "Blaise Pascal",
    text: "All of humanity's problems stem from man's inability to sit quietly in a room alone.",
  },
  {
    author: "E. M. Forster",
    text: "How do I know what I think until I see what I say?",
  },
  {
    author: "Primo Levi",
    text: "I have travelled as a loner and have followed a winding path, forming for myself a haphazard culture, full of gaps, a smattering of knowledge. In recompense, I have enjoyed looking at the world from unusual angles, inventing, so to speak, the instrumentation: examining matters of technique with the eye of a literary man, and literature with the eye of a technician.",
  },
  {
    author: "Ludwig van Beethoven",
    text: "To play a wrong note is insignificant; to play without passion is inexcusable.",
  },
  {
    author: "Elder Sophrony of Essex",
    text: "Stand at the brink of the abyss of despair, and when you see that you cannot bear it anymore, draw back a little and have a cup of tea.",
  },
  {
    author: "Eliezer Yudkowsky",
    text: `<h3>Litany of Gendlin</h3>
      What is true is already so.<br/>
      Owning up to it doesn't make it worse.<br/>
      Not being open about it doesn't make it go away.<br/>
      And because it's true, it is what is there to be interacted with.<br/>
      Anything untrue isn't there to be lived.<br/>
      People can stand what is true,<br/>
      for they are already enduring it.<br/>`,
  },
  {
    author: "Eliezer Yudkowsky",
    text: `<h3>Litany of Tarski</h3>
      If X, I desire to believe that X.<br/>
      If not X, I desire to believe that not X.<br/>
      Let me not become attached to beliefs I may not want.`,
  },
  {
    author:
      "Lee, 'If The Chosen One Can&apos;t Defy Heteronormative Structures, Who Can?'",
    text: "We live in the world that exists. The best we can do for the world we want to live in is build it.",
  },
  {
    author: "Oscar Wilde",
    text: "A map of the world that does not include Utopia is not worth even glancing at, for it leaves out the one country at which Humanity is always landing. And when Humanity lands there, it looks out, and, seeing a better country, sets sail. Progress is the realisation of Utopias.",
  },
  {
    author: "Jim Hollan &amp; Scott Stornetta",
    text: "Requiring one medium to imitate the other inevitably pits strengths of the old medium against weaknesses of the new.",
  },
  {
    author: "Anne Rice",
    text: "To write something, you have to risk making a fool of yourself.",
  },
  {
    author: "William Shatner",
    text: "If you make a fool of yourself, you can do it with dignity, without taking your pants down. And if you do take your pants down, you can still do it with dignity.",
  },
  {
    author: "Charlie Chaplin",
    text: "Failure is unimportant. It takes courage to make a fool of yourself.",
  },
  {
    author: "Denzel Washington",
    text: "Don't aspire to make a living, aspire to make a difference.",
  },
  {
    author: "Thomas Carlyle",
    text: "The merit of originality is not novelty, it is sincerity.",
  },
  {
    author: "Rick Rubin",
    text: "If you want to connect with an audience… you have to ignore them when you are making the work. Because if you're making the work for the audience, it's no longer a genuine work. It's no longer authentic. The authenticity is what makes it good. You putting yourself into it, flaws and all. Ugly and all. Beautiful and all. Weird and all. All of those things are what makes people connect. So when I say 'the audience comes last', I do mean it, but the reason the audience comes last is, the audience has to come last – in service to the audience. If you are making it for the audience, you will undershoot the target. If you are making it for yourself, you'll do the best work.",
  },
  {
    author: "Chuck Close",
    text: "Inspiration is for amateurs; the rest of us just show up and get to work. If you wait around for the clouds to part and a bolt of lightning to strike you in the brain, you are not going to make an awful lot of work. All the best ideas come out of the process; they come out of the work itself.",
  },
  {
    author: "Bret Victor",
    text: "The most dangerous thought you can have as a creative person is to think you know what you're doing.",
  },
  {
    author: "Teresa Nielsen Hayden",
    text: "Plot is a literary convention. Story is a force of nature.",
  },
  {
    author: "Carl Jung",
    text: "The creation of something new is not accomplished by the intellect but by the play instinct acting from inner necessity. The creative mind plays with the objects it loves.",
  },
  {
    author: "Mark Pilgrim",
    text: "Writing doesn't actually take that long. It's the long stretches of procrastinating that take up most of your time.",
  },
  {
    author: "Jean-Luc Godard",
    text: "It&apos;s not where you take things from—it&apos;s where you take them to.",
  },
  {
    author: "Amanda Palmer",
    text: "Collecting the dots. Then connecting them. And then sharing the connections with those around you. This is how a creative human works.",
  },
  {
    author: "David Ogilvy",
    text: "The creative process requires more than reason […] I am almost incapable of logical thought, but I have developed techniques for keeping open the telephone line to my unconscious, in case that disorderly repository has anything to tell me.",
  },
  {
    author: "John Keats",
    text: "We hate poetry that has a palpable design upon us—and if we do not agree, seems to put its hand in its breeches pocket. Poetry should be great & unobtrusive, a thing which enters into one&apos;s soul, and does not startle it or amaze it with itself but with its subject.",
  },
  {
    author: "Stephen Spielberg",
    text: "All good ideas start out as bad ones, that&apos;s why it takes so long.",
  },
  {
    author: "Allen Ginsberg",
    text: "If the muse comes to your bedside, don't tell her you'll fuck her later.",
  },
  {
    author: "Holden Caulfield, 'The Catcher in the Rye'",
    text: "Lots of times you don&apos;t know what interests you most until you start talking.",
  },
  {
    author: "Chris Cleave",
    text: "A good storyteller is a good observer—everything else is just style.",
  },
  {
    author: "Peter Carey",
    text: "The declared meaning of a spoken word is only its overcoat, and the real meaning lies underneath its scarves and buttons.",
  },
  {
    author: "Dan Harmon",
    text: "You stink. Prove it. It will go faster. And then, after you write something incredibly shitty in about six hours, it's no problem making it better in passes, because in addition to being absolutely untalented, you are also a mean, petty CRITIC. You know how you suck and you know how everything sucks and when you see something that sucks, you know exactly how to fix it, because you're an asshole… Switch from team 'I will one day write something good' to team 'I have no choice but to write a piece of shit' and then take off your 'bad writer' hat and replace it with a 'petty critic' hat and go to town on that poor hack's draft and that's your second draft.",
  },
  {
    author: "Dan Harmon",
    text: "Just start taking what you do less seriously. Consider it your job to do it wrong, embrace the idea that what you are gonna do is going to suck — just make something bad and then criticise it until it's good.",
  },
  {
    author: "Ira Glass",
    text: "Nobody tells this to people who are beginners, I wish someone told me. All of us who do creative work, we get into it because we have good taste. But there is this gap. For the first couple years you make stuff, it's just not that good. It's trying to be good, it has potential, but it's not. But your taste, the thing that got you into the game, is still killer. And your taste is why your work disappoints you. A lot of people never get past this phase, they quit. Most people I know who do interesting, creative work went through years of this. We know our work doesn't have this special thing we want it to have. We all go through this. And if you are just starting out or you are still in this phase, you gotta know it's normal and the most important thing you can do is do a lot of work. Put yourself on a deadline so that every week you will finish one story. It's only by going through a volume of work that you will close that gap, and your work will be as good as your ambitions. And I took longer to figure out how to do this than anyone I've ever met. It's gonna take a while. It's normal to take a while. You've just gotta fight your way through.",
  },
  {
    author: "Joanna Russ",
    text: "As my mother once said: The boys throw stones at the frogs in jest. But the frogs die in earnest.",
  },
  {
    author: "John F. Kennedy",
    text: "The hottest places in hell are reserved for those who, in a period of moral crisis, maintain their neutrality.",
  },
  {
    author: "H. G. Wells",
    text: "Moral indignation is jealousy with a halo.",
  },
  {
    author: "Niels Bohr",
    text: "Every valuable human being must be a radical and a rebel, for what he must aim at is to make things better than they are.",
  },
  {
    author: "Kurt Vonnegut",
    text: "We are what we pretend to be, so we must be careful about what we pretend to be.",
  },
  {
    author: "Stephen King",
    text: "Monsters are real, ghosts are real too. They live inside us, and sometimes, they win.",
  },
  {
    author: "Paul Eldridge",
    text: "A man&apos;s character is most evident by how he treats those who are not in a position either to retaliate or reciprocate.",
  },
  {
    author: "Horace Mann",
    text: "Be ashamed to die until you have won some victory for humanity.",
  },
  {
    author: "Victor Frankl",
    text: "We who lived in concentration camps can remember the men who walked through the huts comforting others, giving away their last piece of bread. They may be few in number but they offer sufficient proof that everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances, to choose one's own way.",
  },
  {
    author: "Oliver Wendell Holmes",
    text: "Alas for those that never sing but die with all their music in them.",
  },
  {
    author: "Friedrich Nietzsche",
    text: "He who has a why to live can bear almost any how.",
  },
  {
    author: "Stanley Kubrick",
    text: "The most terrifying fact about the universe is not that it is hostile but that it is indifferent; but if we can come to terms with this indifference and accept the challenges of life within the boundaries of death—however mutable man may be able to make them—our existence as a species can have genuine meaning and fulfilment. However vast the darkness, we must supply our own light.",
  },
  {
    author: "Rabindrananth Tagore",
    text: "A mind all logic is a knife all blade. It makes the hand bleed that uses it.",
  },
  {
    author: "Hunter S. Thompson",
    text: "A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.",
  },
  {
    author: "Jean-Luc Picard, 'Star Trek: The Next Generation'",
    text: "It's possible to make no mistakes and still lose. That is not a weakness. That is life.",
  },
  {
    author: "John William Gardner",
    text: "Meaning is not something you stumble across, like the answer to a riddle or the prize in a treasure hunt. Meaning is something you build into your life. You build it out of your own past, out of your affections and loyalties, out of the experience of humankind as it is passed onto you, out of your own talent and understanding, out of the things you believe in, out of the things and people you love, out of the values for which you are willing to sacrifice something. The ingredients are there. You are the only one who can put them together in that unique pattern that will be your life. Let it be a life that has dignity and meaning for you. If it does, then the particular balance of success or failure is of less account.",
  },
  {
    author: "Eric Hoffer",
    text: "A man is likely to mind his own business when it is worth minding. When it is not, he takes his mind off his own meaningless affairs by minding other people&apos;s business.",
  },
  {
    author: "Charles Bukowski",
    text: `
      <h3>The Laughing Heart</h3>
      your life is your life<br/>
      don&apos;t let it be clubbed into dank submission.<br/>
      be on the watch.<br/>
      there are ways out.<br/>
      there is light somewhere.<br/>
      it may not be much light but<br/>
      it beats the darkness.<br/>
      be on the watch.<br/>
      the gods will offer you chances.<br/>
      know them.<br/>take them.<br/>
      you can&apos;t beat death but<br/>
      you can beat death in life, sometimes.<br/>
      and the more often you learn to do it,<br/>
      the more light there will be.<br/>
      your life is your life.<br/>
      know it while you have it.<br/>
      you are marvelous<br/>
      the gods wait to delight<br/>
      in you
    `,
  },
  {
    author: "Sahil Bloom",
    text: "Much of what we call 'luck' is the macro result of 1,000s of micro actions. Your habits put you in a position where luck is more likely to strike. The Luck Razor: When choosing between two paths, choose the path that has a larger luck surface area.",
  },
  {
    author: "Friedrich Nietzsche",
    text: "The profoundest mind must also be the most frivolous one.",
  },
  {
    author: "Marcus Aurelius",
    text: "If you seek tranquillity, do less. Which brings a double satisfaction: to do less, better.",
  },
  {
    author: "Jimmy Carr",
    text: "The opposite of addiction isn&apos;t sobriety, it&apos;s purpose.",
  },
  {
    author: "Carl Jung",
    text: "The privilege of a lifetime is to become who you truly are.",
  },
  {
    author: "Jim Butcher",
    text: "What is the point of having free will if one cannot occasionally spit in the eye of destiny?",
  },
  {
    author: "Emma Goldman",
    text: "People have only as much liberty as they have the intelligence to want and the courage to take.",
  },
  {
    author: "William Jennings Bryan",
    text: "Destiny is not a matter of chance; it&apos;s a matter of choice. It is not a thing to be waited for, it&apos;s a thing to be achieved.",
  },
  {
    author: "Mary Renault",
    text: "There is only one kind of shock worse than the totally unexpected: the expected for which one has refused to prepare.",
  },
  {
    author: "Alan Watts",
    text: "You can&apos;t be spontaneous within reason.",
  },
  {
    author: "Adam Philips",
    text: "The aim of psychoanalysis is not to cure people but to show them that there is nothing wrong with them.",
  },
  {
    author: "Anne Lamott",
    text: "Peace of mind is an inside job.",
  },
  {
    author: "Oliver Burkeman",
    text: "By doing your thing—as opposed to what you think you ought to be doing—you kindle a fire that helps keep the rest of us warm.",
  },
  {
    author: "Adam Philips",
    text: "Suffering turns up when there is […] too big a gap between who a person feels himself to be and who he wants to be.",
  },
  {
    author: "Joe Moran",
    text: "Being a grown-up means taking responsibility for the experiment of your life, without looking for some actual or imaginary parent to stamp it with their blessing.",
  },
  {
    author: "Kurt Vonnegut",
    text: "Practice any art […] no matter how well or badly, not to get money and fame, but to experience becoming, to find out what&apos;s inside you, to make your soul grow.",
  },
  {
    author: "Kevin Kelly",
    text: "Your growth as a conscious being is measured by the number of uncomfortable conversations you are willing to have.",
  },
  {
    author: "Milton Glaser",
    text: "None of us really has the ability to understand our path until it&apos;s over.",
  },
  {
    author: "David Simon",
    text: "Albert Camus, a great humanist and existentialist voice, pointed out that to commit to a just cause with no hope of success is absurd. But then he also noted that not committing to a just cause is equally absurd. But only one choice offers the possibility for dignity. And dignity matters.",
  },
  {
    author: "Bruce Sterling",
    text: "Don&apos;t become a well-rounded person. Well rounded people are smooth and dull. Become a thoroughly spiky person. Grow spikes from every angle. Stick in their throats like a pufferfish. If you want to woo the muse of the odd, don&apos;t read Shakespeare. Read Webster&apos;s revenge plays. Don&apos;t read Homer and Aristotle. Read Herodotus where he&apos;s off talking about Egyptian women having public sex with goats. If you want to read about myth don&apos;t read Joseph Campbell, read about convulsive religion, read about voodoo and the Millerites and the Munster Anabaptists. There are hundreds of years of extremities, there are vast legacies of mutants. There have always been geeks. There will always be geeks. Become the apotheosis of geek. Learn who your spiritual ancestors were. You didn&apos;t come here from nowhere. There are reasons why you&apos;re here. Learn those reasons. Learn about the stuff that was buried because it was too experimental or embarrassing or inexplicable.",
  },
  {
    author: "T. S. Eliot",
    text: "Only those who will risk going too far can possibly find out how far one can go.",
  },
  {
    author: "Joseph Campbell",
    text: "It is by going down into the abyss that we recover the treasures of life. Where you stumble, there lies your treasure.",
  },
  {
    author: "Bo Burnham",
    text: "Don&apos;t take advice from people like me who got very lucky. Taylor Swift telling you to follow your dreams is like a lottery winner saying “Liquidise your assets! Buy Powerball tickets! It works!”",
  },
  {
    author: "Rollo May",
    text: "Often the mind needs the relaxation of inner controls—needs to be freed in reveries or day dreaming—for the unaccustomed ideas to emerge.",
  },
  {
    author: "Friedrich Nietzsche",
    text: "And lost be the day to us in which a measure hath not been danced. And false be every truth which hath not had laughter along with it!",
  },
  {
    author: "David Ogilvy",
    text: "Creative people are especially observant, and they value accurate observation (telling themselves the truth) more than other people do. They often express part-truths, but this they do vividly; the part they express is the generally unrecognized; by displacement of accent and apparent disproportion in statement they seek to point to the usually unobserved. They see things as others do, but also as others do not.",
  },
  {
    author: "Lao Tzu",
    text: "Stop running away and you will be found.",
  },
  {
    author: "Antoine de Saint-Exupéry",
    text: "A goal without a plan is just a wish.",
  },
  {
    author: "Richard Feynman",
    text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.",
  },
  {
    author: "Albert Camus",
    text: "An intellectual is someone whose mind watches itself.",
  },
  {
    author: "Richard Feynman",
    text: "We are never definitely right, we can only be sure we are wrong.",
  },
  {
    author: "Thaddeus Howse",
    text: "Experience is what you get when you don't get what you wanted.",
  },
  {
    author: "Chester Barnard",
    text: "To try and fail is at least to learn; to fail to try is to suffer the inestimable loss of what might have been.",
  },
  {
    author: "Ralph Waldo Emerson",
    text: "Everyone I meet is my master in some point, and in that I learn from him.",
  },
  {
    author: "Ralph Waldo Emerson",
    text: "The only person you are destined to become is the person you decide to be.",
  },
  {
    author: "Ryan Holliday",
    text: "Too often, convinced of our own intelligence or success, we stay in a comfort zone that ensures that we never feel stupid (and we are never challenged to learn or reconsider what we know). It obscures from view various weaknesses in our understanding, until eventually it's too late to change course. This is where the silent toll is taken.",
  },
  {
    author: "Anonymous",
    text: "Those who do not read books have no advantage over those who cannot read books.",
  },
  {
    author: "John Whacker",
    text: "As our island of knowledge grows, so does the shore of our ignorance.",
  },
  {
    author: "Josh Spector",
    text: "Being okay with being okay is a necessary step toward great.",
  },
  {
    author: "Jim Carrey",
    text: "You can fail at what you don't want, so you might as well take a shot at what you do.",
  },
  {
    author: "John Keats",
    text: "…it struck me what quality went to form a Man of Achievement, especially in Literature, and which Shakespeare possessed so enormously—I mean Negative Capability, that is, when a man is capable of being in uncertainties, mysteries, doubts, without any irritable reaching after fact and reason… with a great poet the sense of Beauty overcomes every other consideration, or rather obliterates all consideration.",
  },
  {
    author: "Erich Fromm",
    text: "It is the paradox of human existence that man must simultaneously seek for closeness and for independence; for oneness with others and at the same time for the preservation of his uniqueness and particularity… the answer to this paradox—and to the moral problems of man—is productiveness.",
  },
  {
    author: "T. H. Huxley",
    text: "The ethical progress of society depends, not on imitating the cosmic process, still less on running away from it, but on combating it.",
  },
  {
    author: "Friedrich Nietzsche",
    text: "In individuals, insanity is rare; but in groups, parties, nations and epochs, it is the rule.",
  },
  {
    author: "William Morris",
    text: "Worthy work carries with it the hope of pleasure in rest, the hope of the pleasure in our using what it makes, and the hope of pleasure in our daily creative skill. All other work but this is worthless; it is slaves' work — mere toiling to live, that we may live to toil.",
  },
  {
    author: "Arnold Edinborough",
    text: "Curiosity is the very basis of education and if you tell me that curiosity killed the cat, I say only the cat died nobly.",
  },
  {
    author: "Howard Thurman",
    text: "Don't ask yourself what the world needs, ask yourself what makes you come alive, and then go and do that. Because what the world needs is people who have come alive.",
  },
  {
    author: "Norman Cohn",
    text: "Nature demands inequality, hierarchy, subordination of the inferior to the superior—but human history [is] a series of revolts against this natural order, leading to ever greater egalitarianism.",
  },
  {
    author: "Mariah Olson",
    text: "If we habitually extinguish boredom with technology instead of allowing the brain to enter default mode, we're essentially letting the thought processes that are supposed to help inform our individual stance towards society be endlessly intruded by that very society.",
  },
  {
    author: "Seth Godin",
    text: "Just because you're winning a game doesn't mean it's a good game.",
  },
  {
    author: "H. L. Mencken",
    text: "Every normal man must be tempted, at times, to spit on his hands, hoist the black flag, and begin slitting throats.",
  },
  {
    author: "Alan Moore",
    text: "Life isn't divided into genres. It's a horrifying, romantic, tragic, comical science-fiction cowboy detective novel.",
  },
  {
    author: "Voltaire",
    text: "Doubt is not a pleasant condition, but certainty is an absurd one.",
  },
  {
    author: "Flannery O&apos;Connor",
    text: "The truth does not change according to our ability to stomach it.",
  },
  {
    author: "Jaron Lanier",
    text: "What makes something real is that it can&apos;t be represented to completion.",
  },
  {
    author: "Carl Sagan",
    text: "For small creatures such as we the vastness is bearable only through love.",
  },
  {
    author: "Bree Despain",
    text: "We don&apos;t forgive people because they deserve it. We forgive them because they need it — because we need it.",
  },
  {
    author: "Oscar Wilde",
    text: "To be great is to be misunderstood.",
  },
  {
    author: "Joe Moran",
    text: "What we need most of all […] is a sense that we&apos;ve been attended to, listened to, and worried about. We want our existence to be acknowledged and noted.",
  },
  {
    author: "Gorges Bataille",
    text: "I don't want your love unless you know I am repulsive, and love me even as you know it.",
  },
  {
    author: "Brené Brown",
    text: "Belonging is the innate human desire to be part of something larger than us. Because this yearning is so primal, we often try to acquire it by fitting in and by seeking approval, which are not only hollow substitutes to belonging, but often barriers to it. Because true belonging only happens when we present our authentic, imperfect selves to the world, our sense of belonging can never be greater than our level of self-acceptance.",
  },
  {
    author: "Ze Frank",
    text: "And God, let me enjoy this. Life isn't just a sequence of waiting for things to be done.",
  },
];
