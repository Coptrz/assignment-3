# 🧩 Technical Documentation – Assignment 2

## 📘 Project Overview
This document explains the **technical details, structure, and performance decisions** behind my personal portfolio web application for **Assignment 2**.  
The project demonstrates my ability to create a modern, responsive, and interactive website using **HTML**, **CSS**, and **JavaScript**, while also integrating **AI-assisted improvements** and optimization techniques.

---

## 🗂️ File Structure
```
assignment-2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```
---

## ⚙️ Functional Breakdown

### 1️⃣ index.html
**Purpose:**  
Defines the layout and structure of the portfolio. It is organized into three main sections: **About**, **Projects**, and **Contact**.  
Each section includes elements for interactivity, accessibility, and animation.

**Main Components:**
- **Header / Navigation:**  
  Responsive navigation bar with a **dark/light theme toggle**.  
  The selected theme is saved in `localStorage`.

- **About Section:**  
  Includes a **personalized greeting** that updates based on the user’s name and time of day.  
  Contains an **API widget** that loads a random quote with retry and loading states.

- **Projects Section:**  
  Displays project cards with **filter buttons** and a **live search bar**.  
  Each project card can **expand and collapse** to show details smoothly.

- **Contact Section:**  
  Includes a form that validates inputs, shows **inline error messages**, and displays **animated success/error feedback**.

- **Footer:**  
  Auto-updates the current year using JavaScript.

---

### 2️⃣ css/styles.css
**Purpose:**  
Handles all styling, transitions, and animations. The CSS file was carefully organized for readability and performance.

**Key Features:**
- Uses **Flexbox** and **CSS Grid** for responsive layout.
- Defines **custom properties** (CSS variables) for theme colors and consistency.
- Includes `.reveal` and `.in-view` classes for smooth fade-in animations using `IntersectionObserver`.
- Adds hover effects on buttons and project cards.
- Provides animated feedback for form submission (success or error states).
- Ensures accessibility through proper contrast and focus outlines.

---

### 3️⃣ js/script.js
**Purpose:**  
Implements all interactivity and data handling logic.

**Main Functionalities:**
- **Greeting + LocalStorage:**  
  Saves the user’s name and theme preference.  
  Displays a time-based message (Good Morning / Afternoon / Evening).

- **Theme Toggle:**  
  Switches between dark and light themes with smooth transitions.

- **Reveal on Scroll:**  
  Uses `IntersectionObserver` to animate elements when they enter the viewport.

- **Project Search and Filter:**  
  Filters project cards based on category (Web/UI-UX) or search keywords.  
  Shows an **empty state message** when no projects match.

- **Quote API Integration:**  
  Fetches a random quote from the **Quotable API**.  
  Displays loading text while fetching and a retry button if the request fails.

- **Form Validation:**  
  Checks for empty fields or invalid email formats.  
  Displays **inline error messages**, and **animated success feedback** using `.success` / `.error` classes.

**Sample Snippet:**
```javascript
fetch('https://api.quotable.io/random')
  .then(res => res.json())
  .then(data => {
      quote.textContent = `"${data.content}" — ${data.author}`;
  })
  .catch(() => {
      status.textContent = "Failed to load quote. Please try again.";
  });