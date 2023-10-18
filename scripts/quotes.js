var quotes = [
	"<blockquote>The most dangerous thought you can have as a creative persion is to think you know what you&apos;re doing.</blockquote> <cite>Bret Victor</cite>",
	"<blockquote>Plot is a literary convention. Story is a force of nature.</blockquote><cite>Teresa Nielsen Hayden</cite>",
	"<blockquote>The creation of something new is not accomplished by the intellect but by the play instinct acting from inner necessity. The creative mind plays with the objects it loves.</blockquote><cite>Carl Jung</cite>",
	"<blockquote>Writing doesn&apos;t actually take that long. It&apos;s the long stretches of procrastinating that take up most of your time.</blockquote><cite>Mark Pilgrim</cite>",
	"<blockquote>It&apos;s not where you take things from—it&apos;s where you take them to.</blockquote><cite>Jean-Luc Godard</cite>",
	"<blockquote>Collecting the dots. Then connecting them. And then sharing the connections with those around you. This is how a creative human works.</blockquote><cite>Amanda Palmer</cite>",
	"<blockquote>The creative process requires more than reason […] I am almost incapable of logical thought, but I have developed techniques for keeping open the telephone line to my unconscious, in case that disorderly repository has anything to tell me.</blockquote><cite>David Ogilvy</cite>",
	"<blockquote>We hate poetry that has a palpable design upon us—and if we do not agree, seems to put its hand in its breeches pocket. Poetry should be great & unobtrusive, a thing which enters into one&apos;s soul, and does not startle it or amaze it with itself but with its subject.</blockquote><cite>John Keats</cite>",
	"<blockquote>The merit of originality is not novelty, it is sincerity.</blockquote><cite>Thomas Carlyle</cite>",
	"<blockquote>All good ideas start out as bad ones, that&apos;s why it takes so long.</blockquote><cite>Stephen Spielberg</cite>",
	"<blockquote>If the muse comes to your bedside, don&apos;t tell her you&apos;ll fuck her later.</blockquote><cite>Allen Ginsberg</cite>",
	"<blockquote>Lots of times you don&apos;t know what interests you most until you start talking.</blockquote><cite>Holden Caulfield, <em>The Catcher in the Rye</em></cite>",
	"<blockquote>A good storyteller is a good observer—everything else is just style.</blockquote><cite>Chris Cleave</cite>",
	"<blockquote>The declared meaning of a spoken word is only its overcoat, and the real meaning lies underneath its scarves and buttons.</blockquote><cite>Peter Carey</cite>",
	"<blockquote>Just start taking what you do less seriously […] if you simply shit it out and consider it your job to do it wrong—embrace the idea that what you are gonna do is going to suck—just make something bad and then criticise it until it&apos;s good.</blockquote><cite>Dan Harmon</cite>",
	"<blockquote>As my mother once said: The boys throw stones at the frogs in jest.<br>But the frogs die in earnest.</blockquote><cite>Joanna Russ</cite>",
	"<blockquote>Every valuable human being must be a radical and a rebel, for what he must aim at is to make things better than they are.</blockquote><cite>Niels Bohr</cite>",
	"<blockquote>We are what we pretend to be, so we must be careful about what we pretend to be.</blockquote><cite>Kurt Vonnegut</cite>",
	"<blockquote>Monsters are real, ghosts are real too. They live inside us, and sometimes, they win.</blockquote><cite>Stephen King</cite>",
	"<blockquote>A man&apos;s character is most evident by how he treats those who are not in a position either to retaliate or reciprocate.</blockquote><cite>Paul Eldridge</cite>",
	"<blockquote>Be ashamed to die until you have won some victory for humanity.</blockquote><cite>Horace Mann</cite>",
	"<blockquote>We who lived in concentration camps can remember the men who walked through the huts comforting others, giving away their last piece of bread. They may be few in number but they offer sufficient proof that everything can be taken from a man but one thing: the last of the human freedoms—to choose one&apos;s attitude in any given set of circumstances, to choose one&apos;s own way.</blockquote><cite>Victor Frankl</cite>",
	"<blockquote>Alas for those that never sing<br>But die with all their music in them</blockquote><cite>Oliver Wendell Holmes</cite>",
	"<blockquote>He who has a why to live can bear almost any how.</blockquote><cite>Friedrich Nietzsche</cite>",
	"<blockquote>The most terrifying fact about the universe is not that it is hostile but that it is indifferent; but if we can come to terms with this indifference and accept the challenges of life within the boundaries of death—however mutable man may be able to make them—our existence as a species can have genuine meaning and fulfilment.<br>However vast the darkness, we must supply our own light.</blockquote><cite>Stanley Kubrick</cite>",
	"<blockquote>A mind all logic is a knife all blade. It makes the hand bleed that uses it.</blockquote><cite>Rabindrananth Tagore</cite>",
	"<blockquote>A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.</blockquote><cite>Hunter S. Thompson</cite>",
	"<blockquote>It&apos;s possible to make no mistakes and still lose. That is not a weakness. That is life</blockquote><cite>Jean-Luc Picard, <em>Star Trek: The Next Generation</em></cite>",
	"<blockquote>Meaning is not something you stumble across, like the answer to a riddle or the prize in a treasure hunt. Meaning is something you build into your life. You build it out of your own past, out of your affections and loyalties, out of the experience of humankind as it is passed onto you, out of your own talent and understanding, out of the things you believe in, out of the things and people you love, out of the values for which you are willing to sacrifice something. The ingredients are there. You are the only one who can put them together in that unique pattern that will be your life. Let it be a life that has dignity and meaning for you. If it does, then the particular balance of success or failure is of less account.</blockquote><cite>John William Gardner</cite>",
	"<blockquote>A man is likely to mind his own business when it is worth minding. When it is not, he takes his mind off his own meaningless affairs by minding other people&apos;s business.</blockquote><cite>Eric Hoffer</cite>",
	"<blockquote>None of us has really the ability to understand our path until it&apos;s over.</blockquote><cite>Milton Glaser</cite>",
	"<blockquote>Albert Camus, a great humanist and existentialist voice, pointed out that to commit to a just cause with no hope of success is absurd. But then he also noted that not committing to a just cause is equally absurd. But only one choice offers the possibility for dignity. And dignity matters.</blockquote><cite>David Simon</cite>",
	"<blockquote>Don&apos;t become a well-rounded person. Well rounded people are smooth and dull. Become a thoroughly spiky person. Grow spikes from every angle. Stick in their throats like a pufferfish. If you want to woo the muse of the odd, don&apos;t read Shakespeare. Read Webster&apos;s revenge plays. Don&apos;t read Homer and Aristotle. Read Herodotus where he&apos;s off talking about Egyptian women having public sex with goats. If you want to read about myth don&apos;t read Joseph Campbell, read about convulsive religion, read about voodoo and the Millerites and the Munster Anabaptists. There are hundreds of years of extremities, there are vast legacies of mutants. There have always been geeks. There will always be geeks. Become the apotheosis of geek. Learn who your spiritual ancestors were. You didn&apos;t come here from nowhere. There are reasons why you&apos;re here. Learn those reasons. Learn about the stuff that was buried because it was too experimental or embarrassing or inexplicable.</blockquote><cite>Bruce Sterling</cite>",
	"<blockquote>Only those who will risk going too far can possibly find out how far one can go.</blockquote><cite>T. S. Eliot</cite>",
	"<blockquote>The privilege of a lifetime is to become who you truly are.</blockquote><cite>Carl Jung</cite>",
	"<blockquote>It is by going down into the abyss that we recover the treasures of life. Where you stumble, there lies your treasure.</blockquote><cite>Joseph Campbell</cite>",
	"<blockquote>Don&apos;t take advice from people like me who got very lucky. Taylor Swift telling you to follow your dreams is like a lottery winner saying “Liquidise your assets! Buy Powerball tickets! It works!”</blockquote><cite>Bo Burnham</cite>",
	"<blockquote>Often the mind needs the relaxation of inner controls—needs to be freed in reveries or day dreaming—for the unaccustomed ideas to emerge.</blockquote><cite>Rollo May</cite>",
	"<blockquote>And lost be the day to us in which a measure hath not been danced.<br>And false be every truth which hath not had laughter along with it!</blockquote><cite>Friedrich Nietzsche</cite>",
	"<blockquote>Stop running away and you will be found.</blockquote><cite>Lao Tzu</cite>",
	"<blockquote>A goal without a plan is just a wish.</blockquote><cite>Antoine de Saint-Exupéry</cite>",
	"<blockquote>Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.</blockquote><cite>Richard Feynman</cite>",
	"<blockquote>An intellectual is someone whose mind watches itself.</blockquote><cite>Albert Camus</cite>",
	"<blockquote>We are never definitely right, we can only be sure we are wrong.</blockquote><cite>Richard Feynman</cite>",
	"<blockquote>Experience is what you get when you don&apos;t get what you wanted.</blockquote><cite>Thaddeus Howse</cite>",
	"<blockquote>To try and fail is at least to learn; to fail to try is to suffer the inestimable loss of what might have been.</blockquote><cite>Chester Barnard</cite>",
	"<blockquote>Everyone I meet is my master in some point, and in that I learn from him.</blockquote><cite>Ralph Waldo Emerson</cite>",
	"<blockquote>The only person you are destined to become is the person you decide to be.</blockquote><cite>Ralph Waldo Emerson</cite>",
	"<blockquote>Too often, convinced of our own intelligence or success, we stay in a comfort zone that ensures that we never feel stupid (and we are never challenged to learn or reconsider what we know). It obscures from view various weaknesses in our understanding, until eventually it&apos;s too late to change course. This is where the silent toll is taken.</blockquote><cite>Ryan Holliday</cite>",
	"<blockquote>Those who do not read books have no advantage over those who cannot read books.</blockquote><cite>Anonymous</cite>",
	"<blockquote>As our island of knowledge grows, so does the shore of our ignorance.</blockquote><cite>John Whacker</cite>",
	"<blockquote>Being okay with being okay is a necessary step toward great.</blockquote><cite>Josh Spector</cite>",
	"<blockquote>You can fail at what you don&apos;t want, so you might as well take a shot at what you do.</blockquote><cite>Jim Carrey</cite>",
	"<blockquote>…it struck me what quality went to form a Man of Achievement, especially in Literature, and which Shakespeare possessed so enormously—I mean Negative Capability, that is, when a man is capable of being in uncertainties, mysteries, doubts, without any irritable reaching after fact and reason… with a great poet the sense of Beauty overcomes every other consideration, or rather obliterates all consideration.</blockquote><cite>John Keats</cite>",
	"<blockquote>It is the paradox of human existence that man must simultaneously seek for closeness and for independence; for oneness with others and at the same time for the preservation of his uniqueness and particularity… the answer to this paradox—and to the moral problems of man—is productiveness.</blockquote><cite>Erich Fromm</cite>",
	"<blockquote>Worthy work carries with it the hope of pleasure in rest, the hope of the pleasure in our using what it makes, and the hope of pleasure in our daily creative skill. All other work but this is worthless; it is slaves&apos; work — mere toiling to live, that we may live to toil.</blockquote><cite>William Morris</cite>",
	"<blockquote>Curiosity is the very basis of education and if you tell me that curiosity killed the cat, I say only the cat died nobly.</blockquote><cite>Arnold Edinborough</cite>",
	"<blockquote>Don&apos;t ask yourself what the world needs, ask yourself what makes you come alive, and then go and do that. Because what the world needs is people who have come alive.</blockquote><cite>Howard Thurman</cite>",
	"<blockquote>Nature demands inequality, hierarchy, subordination of the inferior to the superior—but human history [is] a series of revolts against this natural order, leading to ever greater egalitarianism.</blockquote><cite>Norman Cohn</cite>",
	"<blockquote>If we habitually extinguish boredom with technology instead of allowing the brain to enter default mode, we&apos;re essentially letting the thought processes that are supposed to help inform our individual stance towards society be endlessly intruded by that very society.</blockquote><cite>Mariah Olson</cite>",
	"<blockquote>The ethical progress of society depends, not on imitating the cosmic process, still less on running away from it, but on combating it.</blockquote><cite>T. H. Huxley</cite>",
	"<blockquote>Just because you&apos;re winning a game doesn&apos;t mean it&apos;s a good game.</blockquote><cite>Seth Godin</cite>",
	"<blockquote>Every normal man must be tempted, at times, to spit on his hands, hoist the black flag, and begin slitting throats.</blockquote><cite>H. L. Mencken</cite>",
	"<blockquote>The truth does not change according to our ability to stomach it.</blockquote><cite>Flannery O&apos;Connor</cite>",
	"<blockquote>Life isn&apos;t divided into genres. It&apos;s a horrifying, romantic, tragic, comical science-fiction cowboy detective novel.</blockquote><cite>Alan Moore</cite>",
	"<blockquote>What makes something real is that it can&apos;t be represented to completion.</blockquote><cite>Jaron Lanier</cite>",
	"<blockquote>I don&apos;t want your love unless you know I am repulsive, and love me even as you know it.</blockquote><cite>Georges Bataille</cite>",
	"<blockquote>Belonging is the innate human desire to be part of something larger than us. Because this yearning is so primal, we often try to acquire it by fitting in and by seeking approval, which are not only hollow substitutes to belonging, but often barriers to it. Because true belonging only happens when we present our authentic, imperfect selves to the world, our sense of belonging can never be greater than our level of self-acceptance.</blockquote><cite>Brené Brown</cite>",
	"<blockquote>For small creatures such as we the vastness is bearable only through love.</blockquote><cite>Carl Sagan</cite>",
	"<blockquote>The hottest places in hell are reserved for those who, in a period of moral crisis, maintain their neutrality.</blockquote><cite>John F. Kennedy</cite>",
	"<blockquote>Moral indignation is jealousy with a halo.</blockquote><cite>H. G. Wells</cite>",
	"<blockquote><h3>The Laughing Heart</h3><p>your life is your life<br>don&apos;t let it be clubbed into dank submission.<br>be on the watch.<br>there are ways out.<br>there is light somewhere.<br>it may not be much light but<br>it beats the darkness.<br>be on the watch.<br>the gods will offer you chances.<br>know them.<br>take them.<br>you can&apos;t beat death but<br>you can beat death in life, sometimes.<br>and the more often you learn to do it,<br>the more light there will be.<br>your life is your life.<br>know it while you have it.<br>you are marvelous<br>the gods wait to delight<br>in you.</blockquote><cite>Charles Bukowski</cite>",
	"<blockquote>What is the point of having free will if one cannot occasionally spit in the eye of destiny?</blockquote><cite>Jim Butcher</cite>",
	"<blockquote>People have only as much liberty as they have the intelligence to want and the courage to take.</blockquote><cite>Emma Goldman</cite>",
	"<blockquote>Destiny is not a matter of chance; it&apos;s a matter of choice. It is not a thing to be waited for, it&apos;s a thing to be achieved.</blockquote><cite>William Jennings Bryan</cite>",
	"<blockquote>There is only one kind of shock worse than the totally unexpected: the expected for which one has refused to prepare.</blockquote><cite>Mary Renault</cite>",
	"<blockquote>You can&apos;t be spontaneous within reason.</blockquote><cite>Alan Watts</cite>",
	"<blockquote>The aim of psychoanalysis is not to cure people but to show them that there is nothing wrong with them.</blockquote><cite>Adam Philips</cite>",
	"<blockquote>Peace of mind is an inside job.</blockquote><cite>Anne Lamott</cite>",
	"<blockquote>By doing your thing—as opposed to what you think you ought to be doing—you kindle a fire that helps keep the rest of us warm.</blockquote><cite>Oliver Burkeman</cite>",
	"<blockquote>Suffering turns up when there is […] too big a gap between who a person feels himself to be and who he wants to be.</blockquote><cite>Adam Philips</cite>",
	"<blockquote>Being a grown-up means taking responsibility for the experiment of your life, without looking for some actual or imaginary parent to stamp it with their blessing.</blockquote><cite>Joe Moran</cite>",
	"<blockquote>Practice any art […] no matter how well or badly, not to get money and fame, but to experience becoming, to find out what&apos;s inside you, to make your soul grow.</blockquote><cite>Kurt Vonnegut</cite>",
	"<blockquote>Your growth as a conscious being is measured by the number of uncomfortable conversations you are willing to have.</blockquote><cite>Kevin Kelly</cite>",
	"<blockquote>In individuals, insanity is rare; but in groups, parties, nations and epochs, it is the rule.</blockquote><cite>Friedrich Nietzsche</cite>",
	"<blockquote>We don&apos;t forgive people because they deserve it. We forgive them because they need it — because we need it.</blockquote><cite>Bree Despain</cite>",
	"<blockquote>To be great is to be misunderstood.</blockquote><cite>Oscar Wilde</cite>",
	"<blockquote>What we need most of all […] is a sense that we&apos;ve been attended to, listened to, and worried about. We want our existence to be acknowledged and noted.</blockquote><cite>Joe Moran</cite>",
];

function newQuote() {
	var randomNumber = Math.floor(Math.random() * quotes.length);
	document.getElementById("quoteDisplay").innerHTML = quotes[randomNumber];
}

window.addEventListener("load", newQuote);

// copy this to add a new quote
// &apos;<blockquote></blockquote><cite></cite>&apos;,
