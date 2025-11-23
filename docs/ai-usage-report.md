# AI Usage Report - Assignment 3

## Tools Used
- ChatGPT 

## How I Used AI
- Brainstormed which APIs and features make sense for a student portfolio (chose GitHub repos and a quotes widget).
- Asked for ideas on combining filters, sorting, and saved state; then rewrote the logic in my own vanilla JS style.
- Used AI to tighten wording in the README and technical docs so they match what I built.
- Checked validation edge cases (email pattern, short messages) and how to keep UX friendly with a simulated auth gate.

## What I Kept vs. What I Changed
- Kept the GitHub API idea but rewrote fetch, timeout, and error handling myself.
- Reworked filter/sort code to cut redundant DOM work and added my own stats banner, level filter, timer, and visit counter.
- Rewrote all documentation text to reflect the actual implementation.

## Benefits
- Faster planning of rubric-friendly features (API integration, complex logic, state management).
- Helpful reminders on accessibility, error handling, and empty/timeout states.
- Saved time on documentation phrasing while keeping it accurate and student-focused.

## Challenges
- Cleaning up duplicated CSS and keeping everything ASCII-safe and consistent across browsers.
- Managing multiple event listeners while keeping state synchronized after UI updates.
- Handling GitHub API timeouts and possible rate limits without leaving blank UI.

## What I Learned
- Organizing and persisting state with localStorage (theme, filters, auth status, username, GitHub handle).
- Better error handling for public APIs (timeouts, empty data, retry messaging).
- Clearer validation with inline feedback and gated submission.
- How to use AI as a learning aid, not a substitute: review suggestions critically and adapt them to my codebase.

## Reflection
- Using AI tools felt like having a second pair of eyes during development.  
- I learned how to prompt effectively, evaluate code suggestions critically, and refine them into my own implementation.  
- This process helped me improve both my coding workflow and my confidence in solving front-end problems independently.