# Far Out

A trivia game where the **rarer** your answer, the **farther** you go.

Every prompt has many right answers, like "Name a fruit or vegetable that's red on the inside".
"Tomato" is what most people say, so it moves you one stop. "Blood orange" is rare, so it skips ahead three.

There are two worlds:

| World | Questions | Journey |
| --- | --- | --- |
| **Space** | General knowledge (91 question sets) | Climb 28 stops from the launch pad, past the Moon, Saturn and a black hole, to the edge of the universe |
| **Ocean** | Sea, water and fish (46 question sets) | Dive 28 stops in a submarine, past coral reefs, the Titanic and black smokers, to the Challenger Deep |

And three ways to play:

| Rules | How it works |
| --- | --- |
| **Classic** | 7 prompts, 25 seconds each. Get as far as you can. |
| **Daily** | Today's 7 prompts, the same for every player. Your first run of the day is the one that counts. It rotates through the whole bank before repeating. |
| **Survival** | No prompt limit, 18 seconds each. Three misses end the run. |

## Play it

**On your phone, from this computer**

```
npm install
npm start
```

Then open `http://<this computer's IP address>:8787` on a phone on the same Wi-Fi.
Everyone who plays through this server shares one scoreboard.

**Anywhere else**

- `npm run build` writes `dist/index.html`, the whole game in one file. Host it anywhere, or open it straight from disk.
- The repo root also works as a static site with no build step (GitHub Pages, for example).

Without the server, scores are kept on the device only.

## No repeats

The game remembers which questions you have completed and deals the ones you haven't first.
Completed questions only come back once you have been through every question in that world, oldest first.
This is saved on the device. On the claude.ai page it is also saved to your private cloud folder,
so it follows you between devices. The Daily ignores it, because everyone must get the same questions.

## How scoring works

- Each answer has a *share*: a hand estimate of how many players out of 100 would give it.
- Points go up as the share goes down, on a log scale: 40% is about 11 points, 2% about 49, 0.1% about 86.
- Points decide how many stops you move:

  | Tier | Share | Stops |
  | --- | --- | --- |
  | Common | 20% or more | +1 |
  | Uncommon | 3% to 20% | +2 |
  | Rare | 0.4% to 3% | +3 |
  | Legendary | under 0.4% | +4 |

- Every third right answer in a row is a **streak boost**: one extra stop and 25 extra points.
- A wrong answer, a repeat or a timeout scores nothing. You stay where you are and the streak resets.
- Typos, plurals and "a/the" are forgiven.

## Rankings

After a run, and on the Rankings screen, the game shows what share of the other players you beat
today, in the last 7 days, the last 30 days, or of all time. It compares your score with each other
player's best score in that period.

Where the scoreboard lives depends on how the game is being served:

| Board | When | Who is on it |
| --- | --- | --- |
| Cloud | The page published on claude.ai | Everyone allowed to post scores from that link |
| Server | Run with `npm start` | Everyone playing through that server |
| Device | Any other hosting | Only you |

Players are known by a generated callsign such as "Lunar Otter 42". Nobody types a name, so nothing
rude can end up on a shared board.

The results screen also shows an **estimated crowd** line. That is a model, not real players: it
imagines 3,000 people who each give answers as often as the shares say.

## Project layout

```
index.html            page structure for every screen
styles/main.css       all styling; each world swaps the colour tokens
src/
  main.js             entry point and frame loop
  core/               game logic with no screen code
    text.js           normalising answers, typo tolerance
    bank.js           parsing question banks, matching an answer
    scoring.js        points, tiers, streak bonus
    rules.js          Classic, Daily, Survival and how each deals prompts
    game.js           one run: answer, advance, summary
    stats.js          rankings maths and the estimated crowd
    rng.js            seeded randomness for the Daily
  data/               the question banks, split into themed files per world
  worlds/             each world's stops, art, sounds and backdrop
  gfx/                canvas toolkit, pixel sprites, the journey animation
  audio/synth.js      sound effects made in code
  services/           storage, callsigns, the scoreboard back-ends, completed-question tracking
  ui/                 one file per screen
server/server.js      static files plus the scoreboard API, no dependencies
scripts/build.mjs     bundles everything into dist/
tests/                automated tests (node --test)
```

## Develop

```
npm test         run the tests
npm start        serve the game and the scoreboard on port 8787
npm run build    bundle into dist/
```

### Add or change questions

Edit a file in `src/data/` (for example `space.food.bank.js` or `ocean.more.bank.js`), or add a new file and list it in `src/data/index.js`. Each line of a question is one of:

```
Tomato|30|cherry tomato,roma tomato         one answer: name | share | aliases
0.05|Huntsman spider/huntsman;Goanna        several answers with the same share; "/" separates aliases
```

`npm test` checks that every question still parses and has enough answers.

### Add a stop or a world

Each world in `src/worlds/` exports the same set of things: its route of stops, how to draw a stop,
the vehicle, the backdrop and its sounds. Add a stop by adding a row to that world's `ROUTE`.
Add a world by copying one of the files and listing it in `src/worlds/index.js`.
