# Sir Magdi Yacoub — Tribute Page

**Task 2 · Tribute Page**
A single-page tribute to Sir Magdi Yacoub, the Egyptian-British cardiothoracic surgeon who pioneered heart and heart-lung transplantation in the UK and later brought cardiac care to underserved parts of the world.

## Live Demo : https://veronicafady22-stack.github.io/OIBSIP/WebDev-L2-Tribute%20Page/
Open in any browser — no build step required.

## Objective
Design and build a visually engaging tribute page dedicated to a historical figure, scientist, artist, or public figure I admire, using semantic HTML5 and CSS3.

## Tech Stack
- HTML5
- CSS3 (no framework, no JavaScript)
- Google Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) (headings) & [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) (body)

## Feature Checklist
-  Page title with the subject's name and a one-line tagline
-  A prominent image, sourced from Unsplash
-  A biography section — four original, paraphrased paragraphs
-  A milestones timeline (nine dated entries, 1957–2025)
-  A styled quote block with a genuine, attributed quote
-  Three background colors across sections (deep teal, parchment, crimson)
-  Two distinct font styles (serif for headings, sans-serif for body)
-  Fully responsive layout (single-column stack under 760px)

## Project Structure
```
├── magdi-yacoub-tribute.html   # the tribute page (HTML + inline CSS)
└── README.md                   # this file
```

## Sources & Research
Content was researched from [Wikipedia](https://en.wikipedia.org/wiki/Magdi_Yacoub), Imperial College London, and NHS/Royal Brompton Hospital public statements, then rewritten in my own words rather than copied. The quote in the quote block is taken directly from a 2023 interview given at the launch of his official biography.


## Design Notes
- **Palette:** deep petrol teal (`#0d2626`) for the hero and timeline, warm parchment (`#f2ecdf`) for the biography, and a deep crimson (`#7e2430`) for the quote band — chosen to evoke surgical precision and the heart itself, without leaning on generic "AI-page" defaults.
- **Typography:** Fraunces gives the headings and timeline years some editorial weight; IBM Plex Sans keeps body copy clinical and easy to read.
- **Layout:** CSS Grid for the hero and honors cards, a left-rule vertical timeline for the milestones, `clamp()` for fluid type sizing, and a single breakpoint at 760px for mobile.

## How to Run
1. Download `magdi-yacoub-tribute.html`.
2. Open it directly in any modern browser (Chrome, Firefox, Safari, Edge).
3. No installation, server, or dependencies needed.

##  Author
 Veronica Fady 
