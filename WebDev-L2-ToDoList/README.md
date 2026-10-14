# To-Do Web App

An interactive to-do list built with plain HTML5, CSS3, and vanilla JavaScript. Add tasks, mark them complete, edit them inline, and delete them. Tasks are split into **Pending** and **Completed** lists and saved in the browser, so they are still there after a page refresh.

## Features

- Add new tasks with the input field and the **Add Task** button (or press Enter)
- New tasks appear immediately in the **Pending Tasks** list
- Mark a task complete with its checkbox. Completed tasks move to the **Completed Tasks** list, and unchecking moves them back
- **Edit** a task inline. Press Enter or click **Save** to confirm, Esc or **Cancel** to discard
- **Delete** a task permanently from either list
- Live counters: "X pending" and "Y completed" above each list
- Timestamps showing when each task was added and when it was completed
- Persistence across page refreshes using `localStorage`
- Friendly empty-state messages when a list has no items

## Tech Stack

- HTML5
- CSS3
- JavaScript (vanilla, no libraries or build tools)

## Getting Started

No installation is needed.

1. Download or clone this repository.
2. Open `index.html` in any modern browser.

```bash
git clone https://github.com/USERNAME/todo-app.git
cd todo-app
# then open index.html in your browser
```

## Project Structure

```
todo-app/
├── index.html   # Markup, styles, and script in a single file
└── README.md
```

## How It Works

The app keeps all tasks in a single `tasks` array, which is the one source of truth. Each task is an object:

```js
{
  id: "k3j9x2ab",
  text: "Buy groceries",
  completed: false,
  createdAt: 1760000000000,
  completedAt: null
}
```

Every action (add, toggle, edit, delete) follows the same flow:

1. Change the `tasks` array.
2. Call `update()`, which saves the array to `localStorage`.
3. `render()` filters the array into pending and completed tasks and redraws both lists, along with the counters and empty-state messages.

### Notes

- Task text is inserted with `textContent`, not `innerHTML`, so any HTML typed into a task is displayed as plain text and never executed.
- Reading and writing `localStorage` is wrapped in `try/catch`, so the app keeps working if storage is unavailable (for example, in some private browsing modes). In that case, tasks are not saved between refreshes.

## Deploying with GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
4. After a minute or two, the app is live at `https://USERNAME.github.io/todo-app/`.

## Possible Improvements

- Filter or search tasks
- Drag and drop to reorder
- Due dates and priorities
- Dark mode

## License

This project was created as a learning exercise. Feel free to use and modify it.
