# Monster Kanban Board

Welcome to the Monster Kanban Board!

This project is designed to teach beginners the basics of:

- React components

- Passing props

- Using useState

- Drag and drop

- Tailwind CSS styling

- Fun interactive UI (monsters following your mouse 👀)

Anyone can fork this and learn step‑by‑step.

## Running the project

After forking:

Clone your repo:

```bash
git clone https://github.com/YOUR-USERNAME/monster-kanban.git
```

Go into the project folder:

```bash
cd monster-kanban
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

You can now hold `Ctrl` and click the link Vite shows to see the website!

## Project Structure

This project was intentionally built in a simple, understandable way.

```
monster-kanban
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── public
│   ├── robots.txt
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Column.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── Monster.jsx
│   │   └── Task.jsx
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

Now let’s explain the important files in easy terms:

### `src/App.jsx` — The App Root

This is the main component of the whole app.

It’s the “entry point” for your UI:

- Sets the background

- Displays the title

- Renders the entire [Kanban board component](#componentskanbanboardjsx)

Think of it as the “stage” where everything else is placed.

### `src/main.jsx` — Vite Entry File

This file tells React where to place your app in the HTML page.

It mounts <App /> into the DOM:

```javascript
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

You almost never edit this as a beginner.

### `src/index.css` — Tailwind Setup

This file activates Tailwind CSS in your project:

```css
@import "tailwindcss";
```

This gives you all the Tailwind utility classes used in the UI.

## 📦 Inside the Components Folder

Every UI piece is a small reusable component.

### `components/Monster.jsx`

This creates the little monsters above each column.

They have:

- A body (color + height)

- Two eyes

- Pupils that follow the mouse

(using useEffect, useRef, and some simple math)

This teaches:

- refs

- event listeners

- DOM measurements

### `components/KanbanBoard.jsx`

This is the brain of the app.

It stores the full Kanban board state:

    backlog: [...]
    doing: [...]
    review: [...]
    done: [...]

It also contains functions to:

- Add tasks

- Remove tasks

- Move tasks between columns

Then it renders four <Column /> components, one for each section.

Beginners learn:

- useState

- How state updates work

- Passing functions down as props

### `components/Column.jsx`

Each Kanban column (Backlog, Doing, Review, Done) is created by this component.

It handles:

- Showing the column name

- Listing tasks

- A little box to add new tasks

- Accepting dragged tasks

- Rendering the monster above the column

Beginners learn:

- Controlled inputs (value + onChange)

- Component props

- Handling events (onDrop, onDragOver)

### `components/Task.jsx`

Represents one task card.

It:

- Shows the task text

- Can be dragged between columns

- Has a ✖ remove button

Beginners learn:

- How draggable elements work

- Passing data through drag events

- Event handlers

### `package.json`

Lists project dependencies (React, Tailwind, etc.).

Also contains commands like the `dev` one we used that calls `vite` internally:

```json
"scripts": {
  "dev": "vite",
}
```

You don’t edit this manually unless you're adding libraries.

### 🧪 What Students Can Learn From This Project

This repo is perfect for teaching:

✔️ Components & Props

(your UI is built from small reusable blocks)

✔️ State Management (useState)

(tasks added, removed, moved around)

✔️ Handling User Input

(adding tasks inside a column)

✔️ Drag-and-Drop

(the simplest possible implementation!)

✔️ Tailwind CSS

(styling without writing CSS files)

✔️ DOM Refs & Effects

(monsters’ eyes follow the mouse)

✔️ Clean, readable beginner code

(each file has one clear purpose)

---

🎉 Final Message

This project is designed to be:

- Fun 👾

- Beginner-friendly 💡

- Easy to expand 🧱

- A great teaching tool 🎓

Fork it, explore, and make it your own!

Add new monsters, animations, or even user accounts — the sky’s the limit.
