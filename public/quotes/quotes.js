const quotes = [
  {
    Author: "Thomas Carlyle",
    Quote: "The merit of originality is not novelty, it is sincerity.",
  },
  {
    Author: "Rick Rubin",
    Quote:
      "If you want to connect with an audience… you have to ignore them when you are making the work. Because if you're making the work for the audience, it's no longer a genuine work. It's no longer authentic. The authenticity is what makes it good. You putting yourself into it, flaws and all. Ugly and all. Beautiful and all. Weird and all. All of those things are what makes people connect. So when I say 'the audience comes last', I do mean it, but the reason the audience comes last is, the audience has to come last – in service to the audience. If you are making it for the audience, you will undershoot the target. If you are making it for yourself, you'll do the best work.",
  },
  {
    Author: "Chuck Close",
    Quote:
      "Inspiration is for amateurs; the rest of us just show up and get to work. If you wait around for the clouds to part and a bolt of lightning to strike you in the brain, you are not going to make an awful lot of work. All the best ideas come out of the process; they come out of the work itself.",
  },
  {
    Author: "Bret Victor",
    Quote:
      "The most dangerous thought you can have as a creative person is to think you know what you're doing.",
  },
  {
    Author: "Teresa Nielsen Hayden",
    Quote: "Plot is a literary convention. Story is a force of nature.",
  },
  {
    Author: "Carl Jung",
    Quote:
      "The creation of something new is not accomplished by the intellect but by the play instinct acting from inner necessity. The creative mind plays with the objects it loves.",
  },
  {
    Author: "Mark Pilgrim",
    Quote:
      "Writing doesn't actually take that long. It's the long stretches of procrastinating that take up most of your time.",
  },
  {
    Author: "Jean-Luc Godard",
    Quote:
      "It&apos;s not where you take things from—it&apos;s where you take them to.",
  },
  {
    Author: "Amanda Palmer",
    Quote:
      "Collecting the dots. Then connecting them. And then sharing the connections with those around you. This is how a creative human works.",
  },
  {
    Author: "David Ogilvy",
    Quote:
      "The creative process requires more than reason […] I am almost incapable of logical thought, but I have developed techniques for keeping open the telephone line to my unconscious, in case that disorderly repository has anything to tell me.",
  },
  {
    Author: "John Keats",
    Quote:
      "We hate poetry that has a palpable design upon us—and if we do not agree, seems to put its hand in its breeches pocket. Poetry should be great & unobtrusive, a thing which enters into one&apos;s soul, and does not startle it or amaze it with itself but with its subject.",
  },
  {
    Author: "Stephen Spielberg",
    Quote:
      "All good ideas start out as bad ones, that&apos;s why it takes so long",
  },
  {
    Author: "Allen Ginsberg",
    Quote:
      "If the muse comes to your bedside, don't tell her you'll fuck her later.",
  },
  {
    Author: "Holden Caulfield, The Catcher in the Rye",
    Quote:
      "Lots of times you don&apos;t know what interests you most until you start talking.",
  },
  {
    Author: "Chris Cleave",
    Quote:
      "A good storyteller is a good observer—everything else is just style.",
  },
  {
    Author: "Peter Carey",
    Quote:
      "The declared meaning of a spoken word is only its overcoat, and the real meaning lies underneath its scarves and buttons.",
  },
  {
    Author: "Dan Harmon",
    Quote:
      "You stink. Prove it. It will go faster. And then, after you write something incredibly shitty in about six hours, it's no problem making it better in passes, because in addition to being absolutely untalented, you are also a mean, petty CRITIC. You know how you suck and you know how everything sucks and when you see something that sucks, you know exactly how to fix it, because you're an asshole… Switch from team 'I will one day write something good' to team 'I have no choice but to write a piece of shit' and then take off your 'bad writer' hat and replace it with a 'petty critic' hat and go to town on that poor hack's draft and that's your second draft.",
  },
  {
    Author: "Dan Harmon",
    Quote:
      "Just start taking what you do less seriously. Consider it your job to do it wrong, embrace the idea that what you are gonna do is going to suck — just make something bad and then criticise it until it's good.",
  },
  {
    Author: "Ira Glass",
    Quote:
      "Nobody tells this to people who are beginners, I wish someone told me. All of us who do creative work, we get into it because we have good taste. But there is this gap. For the first couple years you make stuff, it's just not that good. It's trying to be good, it has potential, but it's not. But your taste, the thing that got you into the game, is still killer. And your taste is why your work disappoints you. A lot of people never get past this phase, they quit. Most people I know who do interesting, creative work went through years of this. We know our work doesn't have this special thing we want it to have. We all go through this. And if you are just starting out or you are still in this phase, you gotta know it's normal and the most important thing you can do is do a lot of work. Put yourself on a deadline so that every week you will finish one story. It's only by going through a volume of work thast you will close that gap, and your work will be as good as your ambitions. And I took longer to figure out how to do this than anyone I've ever met. It's gonna take a while. It's normal to take a while. You've just gotta fight your way through.",
  },
  {
    Author: "Joanna Russ",
    Quote:
      "As my mother once said: The boys throw stones at the frogs in jest. But the frogs die in earnest.",
  },
  {
    Author: "John F. Kennedy",
    Quote:
      "The hottest places in hell are reserved for those who, in a period of moral crisis, maintain their neutrality.",
  },
  {
    Author: "H. G. Wells",
    Quote: "Moral indignation is jealousy with a halo.",
  },
  {
    Author: "Niels Bohr",
    Quote:
      "Every valuable human being must be a radical and a rebel, for what he must aim at is to make things better than they are.",
  },
  {
    Author: "Kurt Vonnegut",
    Quote:
      "We are what we pretend to be, so we must be careful about what we pretend to be.",
  },
  {
    Author: "Stephen King",
    Quote:
      "Monsters are real, ghosts are real too. They live inside us, and sometimes, they win.",
  },
  {
    Author: "Paul Eldridge",
    Quote:
      "A man&apos;s character is most evident by how he treats those who are not in a position either to retaliate or reciprocate.",
  },
  {
    Author: "Horace Mann",
    Quote: "Be ashamed to die until you have won some victory for humanity.",
  },
  {
    Author: "Victor Frankl",
    Quote:
      "We who lived in concentration camps can remember the men who walked through the huts comforting others, giving away their last piece of bread. They may be few in number but they offer sufficient proof that everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances, to choose one's own way.",
  },
  {
    Author: "Oliver Wendell Holmes",
    Quote:
      "Alas for those that never sing but die with all their music in them",
  },
  {
    Author: "Friedrich Nietzsche",
    Quote: "He who has a why to live can bear almost any how.",
  },
  {
    Author: "Stanley Kubrick",
    Quote:
      "The most terrifying fact about the universe is not that it is hostile but that it is indifferent; but if we can come to terms with this indifference and accept the challenges of life within the boundaries of death—however mutable man may be able to make them—our existence as a species can have genuine meaning and fulfilment. However vast the darkness, we must supply our own light.",
  },
  {
    Author: "Rabindrananth Tagore",
    Quote:
      "A mind all logic is a knife all blade. It makes the hand bleed that uses it.",
  },
  {
    Author: "Hunter S. Thompson",
    Quote:
      "A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.",
  },
  {
    Author: "Jean-Luc Picard, Star Trek: The Next Generation",
    Quote:
      "It's possible to make no mistakes and still lose. That is not a weakness. That is life.",
  },
  {
    Author: "John William Gardner",
    Quote:
      "Meaning is not something you stumble across, like the answer to a riddle or the prize in a treasure hunt. Meaning is something you build into your life. You build it out of your own past, out of your affections and loyalties, out of the experience of humankind as it is passed onto you, out of your own talent and understanding, out of the things you believe in, out of the things and people you love, out of the values for which you are willing to sacrifice something. The ingredients are there. You are the only one who can put them together in that unique pattern that will be your life. Let it be a life that has dignity and meaning for you. If it does, then the particular balance of success or failure is of less account.",
  },
  {
    Author: "Eric Hoffer",
    Quote:
      "A man is likely to mind his own business when it is worth minding. When it is not, he takes his mind off his own meaningless affairs by minding other people&apos;s business.",
  },
  {
    Author: "Charles Bukowski",
    Quote: `your life is your life
don&apos;t let it be clubbed into dank submission.
be on the watch.
there are ways out.
there is light somewhere.
it may not be much light but
it beats the darkness.
be on the watch.
the gods will offer you chances.
know them.
take them.
you can&apos;t beat death but
you can beat death in life, sometimes.
and the more often you learn to do it,
the more light there will be.
your life is your life.
know it while you have it.
you are marvelous
the gods wait to delight
in you`,
  },
  {
    Author: "Sahil Bloom",
    Quote:
      "Much of what we call 'luck' is the macro result of 1,000s of micro actions. Your habits put you in a position where luck is more likely to strike. The Luck Razor: When choosing between two paths, choose the path that has a larger luck surface area.",
  },
  {
    Author: "Friedrich Nietzsche",
    Quote: "The profoundest mind must also be the most frivolous one.",
  },
  {
    Author: "Marcus Aurelius",
    Quote:
      "If you seek tranquillity, do less. Which brings a double satisfaction: to do less, better.",
  },
  {
    Author: "Jimmy Carr",
    Quote: "The opposite of addiction isn&apos;t sobriety, it&apos;s purpose.",
  },
  {
    Author: "Carl Jung",
    Quote: "The privilege of a lifetime is to become who you truly are.",
  },
  {
    Author: "Jim Butcher",
    Quote:
      "What is the point of having free will if one cannot occasionally spit in the eye of destiny?",
  },
  {
    Author: "Emma Goldman",
    Quote:
      "People have only as much liberty as they have the intelligence to want and the courage to take.",
  },
  {
    Author: "William Jennings Bryan",
    Quote:
      "Destiny is not a matter of chance; it&apos;s a matter of choice. It is not a thing to be waited for, it&apos;s a thing to be achieved.",
  },
  {
    Author: "Mary Renault",
    Quote:
      "There is only one kind of shock worse than the totally unexpected: the expected for which one has refused to prepare.",
  },
  {
    Author: "Alan Watts",
    Quote: "You can&apos;t be spontaneous within reason.",
  },
  {
    Author: "Adam Philips",
    Quote:
      "The aim of psychoanalysis is not to cure people but to show them that there is nothing wrong with them.",
  },
  {
    Author: "Anne Lamott",
    Quote: "Peace of mind is an inside job.",
  },
  {
    Author: "Oliver Burkeman",
    Quote:
      "By doing your thing—as opposed to what you think you ought to be doing—you kindle a fire that helps keep the rest of us warm.",
  },
  {
    Author: "Adam Philips",
    Quote:
      "Suffering turns up when there is […] too big a gap between who a person feels himself to be and who he wants to be.",
  },
  {
    Author: "Joe Moran",
    Quote:
      "Being a grown-up means taking responsibility for the experiment of your life, without looking for some actual or imaginary parent to stamp it with their blessing.",
  },
  {
    Author: "Kurt Vonnegut",
    Quote:
      "Practice any art […] no matter how well or badly, not to get money and fame, but to experience becoming, to find out what&apos;s inside you, to make your soul grow.",
  },
  {
    Author: "Kevin Kelly",
    Quote:
      "Your growth as a conscious being is measured by the number of uncomfortable conversations you are willing to have.",
  },
  {
    Author: "Milton Glaser",
    Quote:
      "None of us really has the ability to understand our path until it&apos;s over.",
  },
  {
    Author: "David Simon",
    Quote:
      "Albert Camus, a great humanist and existentialist voice, pointed out that to commit to a just cause with no hope of success is absurd. But then he also noted that not committing to a just cause is equally absurd. But only one choice offers the possibility for dignity. And dignity matters.",
  },
  {
    Author: "Bruce Sterling",
    Quote:
      "Don&apos;t become a well-rounded person. Well rounded people are smooth and dull. Become a thoroughly spiky person. Grow spikes from every angle. Stick in their throats like a pufferfish. If you want to woo the muse of the odd, don&apos;t read Shakespeare. Read Webster&apos;s revenge plays. Don&apos;t read Homer and Aristotle. Read Herodotus where he&apos;s off talking about Egyptian women having public sex with goats. If you want to read about myth don&apos;t read Joseph Campbell, read about convulsive religion, read about voodoo and the Millerites and the Munster Anabaptists. There are hundreds of years of extremities, there are vast legacies of mutants. There have always been geeks. There will always be geeks. Become the apotheosis of geek. Learn who your spiritual ancestors were. You didn&apos;t come here from nowhere. There are reasons why you&apos;re here. Learn those reasons. Learn about the stuff that was buried because it was too experimental or embarrassing or inexplicable.",
  },
  {
    Author: "T. S. Eliot",
    Quote:
      "Only those who will risk going too far can possibly find out how far one can go.",
  },
  {
    Author: "Joseph Campbell",
    Quote:
      "It is by going down into the abyss that we recover the treasures of life. Where you stumble, there lies your treasure.",
  },
  {
    Author: "Bo Burnham",
    Quote:
      "Don&apos;t take advice from people like me who got very lucky. Taylor Swift telling you to follow your dreams is like a lottery winner saying “Liquidise your assets! Buy Powerball tickets! It works!”",
  },
  {
    Author: "Rollo May",
    Quote:
      "Often the mind needs the relaxation of inner controls—needs to be freed in reveries or day dreaming—for the unaccustomed ideas to emerge.",
  },
  {
    Author: "Friedrich Nietzsche",
    Quote:
      "And lost be the day to us in which a measure hath not been danced. And false be every truth which hath not had laughter along with it!",
  },
  {
    Author: "David Ogilvy",
    Quote:
      "Creative people are especially observant, and they value accurate observation (telling themselves the truth) more than other people do. They often express part-truths, but this they do vividly; the part they express is the generally unrecognized; by displacement of accent and apparent disproportion in statement they seek to point to the usually unobserved. They see things as others do, but also as others do not.",
  },
  {
    Author: "Lao Tzu",
    Quote: "Stop running away and you will be found.",
  },
  {
    Author: "Antoine de Saint-Exupéry",
    Quote: "A goal without a plan is just a wish.",
  },
  {
    Author: "Richard Feynman",
    Quote:
      "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.",
  },
  {
    Author: "Albert Camus",
    Quote: "An intellectual is someone whose mind watches itself.",
  },
  {
    Author: "Richard Feynman",
    Quote: "We are never definitely right, we can only be sure we are wrong.",
  },
  {
    Author: "Thaddeus Howse",
    Quote: "Experience is what you get when you don't get what you wanted.",
  },
  {
    Author: "Chester Barnard",
    Quote:
      "To try and fail is at least to learn; to fail to try is to suffer the inestimable loss of what might have been.",
  },
  {
    Author: "Ralph Waldo Emerson",
    Quote:
      "Everyone I meet is my master in some point, and in that I learn from him.",
  },
  {
    Author: "Ralph Waldo Emerson",
    Quote:
      "The only person you are destined to become is the person you decide to be.",
  },
  {
    Author: "Ryan Holliday",
    Quote:
      "Too often, convinced of our own intelligence or success, we stay in a comfort zone that ensures that we never feel stupid (and we are never challenged to learn or reconsider what we know). It obscures from view various weaknesses in our understanding, until eventually it's too late to change course. This is where the silent toll is taken.",
  },
  {
    Author: "Anonymous",
    Quote:
      "Those who do not read books have no advantage over those who cannot read books.",
  },
  {
    Author: "John Whacker",
    Quote:
      "As our island of knowledge grows, so does the shore of our ignorance.",
  },
  {
    Author: "Josh Spector",
    Quote: "Being okay with being okay is a necessary step toward great.",
  },
  {
    Author: "Jim Carrey",
    Quote:
      "You can fail at what you don't want, so you might as well take a shot at what you do.",
  },
  {
    Author: "John Keats",
    Quote:
      "…it struck me what quality went to form a Man of Achievement, especially in Literature, and which Shakespeare possessed so enormously—I mean Negative Capability, that is, when a man is capable of being in uncertainties, mysteries, doubts, without any irritable reaching after fact and reason… with a great poet the sense of Beauty overcomes every other consideration, or rather obliterates all consideration.",
  },
  {
    Author: "Erich Fromm",
    Quote:
      "It is the paradox of human existence that man must simultaneously seek for closeness and for independence; for oneness with others and at the same time for the preservation of his uniqueness and particularity… the answer to this paradox—and to the moral problems of man—is productiveness.",
  },
  {
    Author: "T. H. Huxley",
    Quote:
      "The ethical progress of society depends, not on imitating the cosmic process, still less on running away from it, but on combating it.",
  },
  {
    Author: "Friedrich Nietzsche",
    Quote:
      "In individuals, insanity is rare; but in groups, parties, nations and epochs, it is the rule.",
  },
  {
    Author: "William Morris",
    Quote:
      "Worthy work carries with it the hope of pleasure in rest, the hope of the pleasure in our using what it makes, and the hope of pleasure in our daily creative skill. All other work but this is worthless; it is slaves' work — mere toiling to live, that we may live to toil.",
  },
  {
    Author: "Arnold Edinborough",
    Quote:
      "Curiosity is the very basis of education and if you tell me that curiosity killed the cat, I say only the cat died nobly.",
  },
  {
    Author: "Howard Thurman",
    Quote:
      "Don't ask yourself what the world needs, ask yourself what makes you come alive, and then go and do that. Because what the world needs is people who have come alive.",
  },
  {
    Author: "Norman Cohn",
    Quote:
      "Nature demands inequality, hierarchy, subordination of the inferior to the superior—but human history [is] a series of revolts against this natural order, leading to ever greater egalitarianism.",
  },
  {
    Author: "Mariah Olson",
    Quote:
      "If we habitually extinguish boredom with technology instead of allowing the brain to enter default mode, we're essentially letting the thought processes that are supposed to help inform our individual stance towards society be endlessly intruded by that very society.",
  },
  {
    Author: "Seth Godin",
    Quote: "Just because you're winning a game doesn't mean it's a good game.",
  },
  {
    Author: "H. L. Mencken",
    Quote:
      "Every normal man must be tempted, at times, to spit on his hands, hoist the black flag, and begin slitting throats.",
  },
  {
    Author: "Alan Moore",
    Quote:
      "Life isn't divided into genres. It's a horrifying, romantic, tragic, comical science-fiction cowboy detective novel.",
  },
  {
    Author: "Voltaire",
    Quote: "Doubt is not a pleasant condition, but certainty is an absurd one.",
  },
  {
    Author: "Flannery O&apos;Connor",
    Quote: "The truth does not change according to our ability to stomach it.",
  },
  {
    Author: "Jaron Lanier",
    Quote:
      "What makes something real is that it can&apos;t be represented to completion.",
  },
  {
    Author: "Carl Sagan",
    Quote:
      "For small creatures such as we the vastness is bearable only through love.",
  },
  {
    Author: "Bree Despain",
    Quote:
      "We don&apos;t forgive people because they deserve it. We forgive them because they need it — because we need it.",
  },
  {
    Author: "Oscar Wilde",
    Quote: "To be great is to be misunderstood.",
  },
  {
    Author: "Joe Moran",
    Quote:
      "What we need most of all […] is a sense that we&apos;ve been attended to, listened to, and worried about. We want our existence to be acknowledged and noted.",
  },
  {
    Author: "Gorges Bataille",
    Quote:
      "I don't want your love unless you know I am repulsive, and love me even as you know it.",
  },
  {
    Author: "Brené Brown",
    Quote:
      "Belonging is the innate human desire to be part of something larger than us. Because this yearning is so primal, we often try to acquire it by fitting in and by seeking approval, which are not only hollow substitutes to belonging, but often barriers to it. Because true belonging only happens when we present our authentic, imperfect selves to the world, our sense of belonging can never be greater than our level of self-acceptance.",
  },
];

function newQuote() {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomNumber];
  document.getElementById(
    "quoteDisplay"
  ).innerHTML = `<blockquote>${quote.Quote}<cite>${quote.Author}</cite></blockquote>`;
}

window.addEventListener("load", newQuote);

// copy this to add a new quote
// &apos;<blockquote></blockquote><cite></cite>&apos;,
