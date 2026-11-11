# Far Out

A space-themed trivia game where the **rarer** your answer, the **farther** your rocket flies.

Each game has 7 prompts like "Name a fruit or vegetable that's red on the inside".
"Tomato" (said by ~30% of players) barely reaches low Earth orbit.
"Blood orange" (~2%) gets you to Mars. Find an answer almost nobody gives and you reach Proxima Centauri.

## Play it on your iPhone

The whole game is one file, `index.html`, with no build step.

- **Easiest:** open the published link in Safari.
- **From your computer on the same Wi‑Fi:** run `python3 -m http.server 8000` in this folder,
  then open `http://<your-computer's-IP>:8000` on the iPhone.
- **GitHub Pages:** repo Settings → Pages → deploy from this branch, root folder.

Tip: in Safari, tap Share → **Add to Home Screen** to run it full screen.

## What happens in a round

- The prompt card sits at the top and the answer box is focused, so the keyboard opens right away.
- A right answer launches the rocket. It shakes on ignition, leaves the ground behind, then orbits the planet it reached while aliens pop up and fireworks go off.
- The next prompt launches from that planet, not from Earth.
- A wrong answer or timeout sputters on the pad and goes nowhere.

## How scoring works

- Every prompt has a hand-built list of accepted answers. Each answer has an estimated share of players who'd say it.
- Points = rarity on a log scale (40% ≈ 11 pts, 2% ≈ 49 pts, 0.1% ≈ 86 pts, ≤0.03% = 100 pts).
- Points decide where you fly: Low Earth Orbit → Moon → Mars → Asteroid Belt → Jupiter → Saturn → Neptune → Proxima Centauri.
- Typos, plurals, and "a/the" are forgiven. An answer that isn't on the list scores 0 ("scrubbed").
- You get 25 seconds per prompt.

## Adding questions

Edit the `BANK` array at the top of the `<script>` in `index.html`. Each line is:

```
Answer name|share of players in %|alias one,alias two
```

For bulk additions, use the `EXTRA` object right below `BANK`. Each line gives one share for many answers:

```
0.05|Huntsman spider/huntsman;Redback spider/redback
```
