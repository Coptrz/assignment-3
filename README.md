# Personal Portfolio - Assignment 3

This is my Assignment 3 portfolio. I focused on adding real data (APIs), stronger logic, saved state, and some light performance fixes.

## Highlights
- GitHub REST API widget: fetches my recent repos (no key needed) and shows friendly errors if the API fails.
- Projects section: live search, category + level filters, sorting, saved preferences, and expandable details.
- State: dark/light theme, saved username greeting, visit counter, session timer, simulated auth for the contact form, and remembered GitHub handle.
- UX polish: lazy-loaded images, reveal animations, inline validation with clear feedback.
- Accessibility: ARIA status text, focusable controls, and keyboard-friendly interactions.

## Run Locally
1) Clone or download this folder.  
2) Open `index.html` in a browser.  
Optional (recommended for API/CORS consistency): run a tiny server, e.g. `python -m http.server 8000` and open http://localhost:8000.

## Project Structure
```
assignment-3/
|- README.md
|- index.html
|- css/
|  |- styles.css
|- js/
|  |- script.js
|- assets/
|  |- images/
|- docs/
|  |- ai-usage-report.md
|  |- technical-documentation.md
|- .gitignore
```

## Feature Tour
- Hero: time-based greeting plus saved-name greeting, visit counter, session timer, and a quote widget with retry/error states.
- Projects: search + filters (category/level) + sorting with saved choices, expandable details, live stats, and lazy images.
- GitHub activity: recent repos for any username; shows stars, language, last updated, and empty/error states.
- Contact: validation for required fields, email pattern, minimum message length, plus a simulated sign-in gate.
- Guidance: status text and helper messages are exposed via `aria-live`, and errors are shown inline so users know what to do next.

## Performance Notes
- `loading="lazy"` on images, lean CSS/JS, and short fetch timeouts to avoid stuck loaders.
- DOM updates are grouped during filtering/sorting to keep things smooth.
- No external dependencies; only browser APIs are used.

## AI Usage (summary)
- Used ChatGPT for ideas and wording; I rewrote the code to fit my structure. Full details in `docs/ai-usage-report.md`.

## Deployment
- Works on GitHub Pages from the repo root. Once published, I will add the live link here.

## Quick Testing Checklist
- Load in a modern browser (Chrome/Edge/Firefox/Safari) and try toggling filters/sorting; refresh to confirm saved state.
- Enter your GitHub username in the widget; try an invalid one to see the error state.
- Toggle sign-in status in Contact; submit with invalid email/short message to see validation; then submit valid content.
- Toggle dark/light theme and reload to ensure persistence.
- On mobile viewport, ensure layout remains usable (nav hides links by design).
