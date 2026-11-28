---
title: "JavaScript Fundamentals & DOM Manipulation for Beginners (Day 5)"
date: 2026-11-28
summary: "Learn JavaScript fundamentals and DOM manipulation in this beginner-friendly guide. Master let/const, functions, arrays, querySelector, addEventListener, and build an interactive Vanilla JS To-Do list."
tags: JavaScript, DOM Manipulation, Web Development, Vanilla JS, Beginner
---

If HTML is the skeleton and CSS is the skin, **JavaScript is the brain** of your website. Up until now, your pages have looked great, but they could not react when a visitor clicked a button, typed into an input field, or submitted a form.

That changes today. You will learn the core building blocks of JavaScript, then connect that logic to the browser with **DOM manipulation** and **events**—turning static pages into interactive web applications.

This is Day 5 of the web development series. If you are just joining, start with the [complete HTML guide](/blog/complete-html-guide-beginner-to-advanced), continue with [semantic HTML and accessible forms](/blog/semantic-html-forms-accessibility), then [CSS fundamentals](/blog/css-fundamentals-selectors-colors-box-model) and [responsive layouts with Flexbox and Grid](/blog/modern-responsive-layouts-flexbox-css-grid). Everything you build today sits on top of that foundation.

> **Quick answer:** Default to `const` and switch to `let` only when a value must change. Select elements with `document.querySelector()`, update text with `textContent`, and react to users with `addEventListener()`. Call `event.preventDefault()` on forms to stop the page reload, then create and append new elements with `document.createElement()` and `appendChild()`.

## Table of contents

- [What JavaScript Actually Does](#what-javascript-actually-does)
- [1. Variables: const vs let](#1-variables-const-vs-let)
- [2. Data Types: Primitives, Arrays and Objects](#2-data-types-primitives-arrays-and-objects)
- [3. Functions and Control Flow](#3-functions-and-control-flow)
- [4. The DOM in Plain English](#4-the-dom-in-plain-english)
- [5. The Four DOM Methods You Will Use Everywhere](#5-the-four-dom-methods-you-will-use-everywhere)
- [6. Events and addEventListener](#6-events-and-addeventlistener)
- [Hands-On: Build a Vanilla JS To-Do List](#hands-on-build-a-vanilla-js-to-do-list)
- [How the To-Do List Works](#how-the-to-do-list-works)
- [Accessibility and Security Details](#accessibility-and-security-details)
- [Common Beginner Mistakes](#common-beginner-mistakes)
- [Debug JavaScript in DevTools](#debug-javascript-in-devtools)
- [Quick Checklist](#quick-checklist)
- [Conclusion and Next Steps](#conclusion-and-next-steps)

## What JavaScript Actually Does

Almost every line of beginner JavaScript does one of three jobs:

1. **Store data.** Variables, arrays and objects hold the values your app works with.
2. **Make decisions.** Functions, `if` statements and loops decide what should happen.
3. **Talk to the page.** The DOM and events let your code read the page and respond to the user.

You run JavaScript by linking a `.js` file from HTML. Put the script at the end of `<body>` so the HTML exists before your code runs, or keep it in `<head>` with the `defer` attribute, which waits for parsing to finish:

```html
<script src="app.js" defer></script>
```

Both approaches work. The important part is that `document.querySelector()` cannot find an element that has not been parsed yet.

Open your browser DevTools (`F12`, or `Ctrl + Shift + I`), switch to the **Console** tab, and type `2 + 2`. You should see `4`. The console is where you will test small pieces of logic and read error messages for the rest of your career.

## 1. Variables: const vs let

A variable is a named box that stores a value. Modern JavaScript gives you two keywords for this, and `var` is legacy code you should avoid in new projects.

| Keyword | Can be reassigned? | Scope | Use it for |
| --- | --- | --- | --- |
| `const` | No | Block | Values that stay the same |
| `let` | Yes | Block | Counters, input values, loop indexes |
| `var` | Yes | Function | Old code and tutorials only |

The rule is simple: **start with `const`, and change it to `let` only when the value needs to change.**

```javascript
const siteName = "DevBlog"; // Stays the same
let visitorCount = 100;     // Will change

visitorCount = 101;         // Valid: let can be reassigned
// siteName = "New Name";   // TypeError: const cannot be reassigned
```

Trying to reassign a `const` throws an error in the console. That is a feature, not a limitation: it stops accidental changes before they become bugs.

One detail that confuses almost everyone: `const` prevents **rebinding the variable**, not changing the contents of an object or array.

```javascript
const developer = {
  name: "Natesh",
  role: "Full-Stack Developer"
};

developer.name = "Natesh K"; // Allowed: mutating the object
// developer = {};           // TypeError: rebinding the variable
```

If you need a truly frozen object, use `Object.freeze()`, but that is beyond today's scope. For now, remember that `const` means "this name always points to the same value."

## 2. Data Types: Primitives, Arrays and Objects

JavaScript organizes data into simple **primitives** and structured collections:

- **Primitives:** strings (`"Hello"`), numbers (`42`), booleans (`true` or `false`), `null`, `undefined`, and symbols.
- **Arrays:** ordered lists written with square brackets `[]`.
- **Objects:** key-value pairs written with curly braces `{}`.

```javascript
// Primitives
const userName = "Natesh";
const isLoggedIn = true;
const yearsOfExperience = 2;

// Array: order matters, access by index starting at 0
const skills = ["HTML", "CSS", "JavaScript"];
console.log(skills[0]);      // "HTML"
console.log(skills.length);  // 3

// Object: access values by key
const developer = {
  name: "Natesh",
  role: "Full-Stack Developer",
  experienceYears: 2
};
console.log(developer.role); // "Full-Stack Developer"
```

Two habits worth building now:

- Use `===` instead of `==`. Strict equality compares both value and type, so `"5" === 5` is `false` and does not surprise you later.
- Use `console.log()` liberally. Printing a value is faster than guessing what it contains.

## 3. Functions and Control Flow

**Functions** package reusable logic. **Control flow** lets that logic make decisions with `if` and `else`, and repeat work with loops.

```javascript
function greetUser(name, isReturning) {
  if (isReturning) {
    return "Welcome back, " + name + "!";
  } else {
    return "Hello, " + name + "! Glad you're here.";
  }
}

console.log(greetUser("Alex", true));  // "Welcome back, Alex!"
console.log(greetUser("Sam", false));  // "Hello, Sam! Glad you're here."
```

A few terms that will come up constantly:

- **Parameters** are the names in the function definition (`name`, `isReturning`).
- **Arguments** are the real values you pass in (`"Alex"`, `true`).
- **`return`** sends a value back to the caller and stops the function immediately.
- A function without a `return` gives you `undefined`.

The `if` block above can be shortened with early returns, which is easier to read once a function grows:

```javascript
function greetUser(name, isReturning) {
  if (isReturning) return "Welcome back, " + name + "!";
  return "Hello, " + name + "! Glad you're here.";
}
```

Loops pair naturally with arrays:

```javascript
const skills = ["HTML", "CSS", "JavaScript"];

for (let i = 0; i < skills.length; i++) {
  console.log(skills[i]);
}
```

The loop starts at index `0`, runs while `i` is less than the array length, and increments after each pass. Off-by-one errors usually come from using `<=` instead of `<` here.

## 4. The DOM in Plain English

When the browser loads an HTML file, it builds a live tree of objects in memory called the **DOM (Document Object Model)**. Every element becomes a node, and every node can be read or changed by JavaScript.

```text
document
└── html
    ├── head
    │   └── title
    └── body
        ├── header
        └── main
            ├── h1
            └── ul
```

The `document` object is your entry point into that tree. Open DevTools and look at the **Elements** panel: that is the live DOM, not the original HTML file. If JavaScript adds a class or a new list item, you will see it there immediately.

## 5. The Four DOM Methods You Will Use Everywhere

You do not need to memorize the whole DOM API. These four cover most beginner interactions:

| Method / Property | What it does | Example |
| --- | --- | --- |
| `document.querySelector()` | Selects the first element matching a CSS selector. | `document.querySelector("#submit-btn")` |
| `element.textContent` | Reads or replaces the plain text inside an element. | `title.textContent = "Updated!"` |
| `element.classList.toggle()` | Adds a class if missing, removes it if present. | `card.classList.toggle("dark-mode")` |
| `element.addEventListener()` | Runs a function when an event fires. | `btn.addEventListener("click", handleClick)` |

### Selecting elements

`querySelector()` accepts any valid CSS selector: `#id`, `.class`, `[data-role="card"]`, or even `main .task-list li:first-child`.

```javascript
const title = document.querySelector("#page-title");
const firstCard = document.querySelector(".card");
const allCards = document.querySelectorAll(".card");

console.log(title.textContent);
console.log(allCards.length);
```

`querySelector()` returns `null` when nothing matches. If you immediately read a property on `null`, the console says `Cannot read properties of null (reading 'textContent')`. That almost always means a typo in the selector or a script running before the element exists.

### Reading and writing text

```javascript
const status = document.querySelector("#status");
status.textContent = "Saved successfully";
```

`textContent` treats everything as plain text. That is exactly what you want for anything a user typed.

### Toggling classes

```javascript
const card = document.querySelector(".card");
card.classList.add("is-open");
card.classList.remove("is-open");
card.classList.toggle("is-open");

const isOpen = card.classList.contains("is-open");
console.log(isOpen);
```

Styling stays in CSS; JavaScript only switches class names. This keeps behavior and presentation separate and makes the UI easier to maintain.

## 6. Events and addEventListener

An **event** is something that happens in the browser: a click, a key press, a form submission, or a page finishing loading. `addEventListener()` attaches a function—called a **callback**—that runs whenever that event occurs.

```javascript
const button = document.querySelector("#save-btn");

button.addEventListener("click", function () {
  console.log("Button clicked!");
});
```

Common events you will use first:

| Event | Fires when |
| --- | --- |
| `click` | The user clicks an element |
| `submit` | A form is submitted |
| `input` | The value changes as the user types |
| `change` | A value is committed, such as a select or checkbox |
| `keydown` | A key is pressed |

### The event object and preventDefault

The callback receives an **event object** with details about what happened. On a form submission, the browser's default behavior is to reload the page and send the data somewhere. For a client-side app, that reload destroys your state, so you cancel it:

```javascript
const form = document.querySelector("#todo-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page reload
  console.log("Form handled in JavaScript");
});
```

### Example: Dark mode toggle in 6 lines of JS

```css
body.dark-theme {
  background-color: #0f172a;
  color: #f8fafc;
}
```

```javascript
const themeBtn = document.querySelector("#theme-toggle");
const statusText = document.querySelector("#status");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  const isDark = document.body.classList.contains("dark-theme");
  statusText.textContent = isDark ? "Dark Mode On" : "Light Mode On";
});
```

The `condition ? valueIfTrue : valueIfFalse` syntax is the ternary operator, a compact `if`/`else` for choosing between two values.

## Hands-On: Build a Vanilla JS To-Do List

Now put everything together. The app lets users add tasks, click a task to mark it complete, and delete tasks—all without a framework, a build step, or a page reload.

### Step 1: The HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanilla JS To-Do List</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <main class="todo-app">
    <h1>My Tasks</h1>

    <form id="todo-form" class="todo-form">
      <label class="sr-only" for="task-input">New task</label>
      <input
        type="text"
        id="task-input"
        placeholder="What needs to be done?"
        autocomplete="off"
        required
      >
      <button type="submit">Add</button>
    </form>

    <p id="task-status" class="task-status" aria-live="polite">No tasks yet.</p>

    <ul id="task-list" class="task-list"></ul>
  </main>

  <!-- Link JavaScript at the bottom of body so the HTML loads first -->
  <script src="app.js"></script>
</body>
</html>
```

The `label` is visually hidden but still read by screen readers, so the input has a real accessible name. The `aria-live="polite"` status region announces changes without interrupting the user.

### Step 2: The CSS (`styles.css`)

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #f1f5f9;
  color: #0f172a;
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

.todo-app {
  width: 100%;
  max-width: 450px;
  background-color: #ffffff;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.todo-form input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
}

.todo-form button {
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.todo-form button:hover {
  background-color: #1d4ed8;
}

.task-status {
  margin-bottom: 16px;
  color: #64748b;
  font-size: 0.85rem;
}

.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.task-text {
  flex: 1;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.task-text:hover {
  color: #1d4ed8;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: #94a3b8;
}

.delete-btn {
  background-color: #ef4444;
  color: #ffffff;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #dc2626;
}

.task-text:focus-visible,
.delete-btn:focus-visible,
.todo-form input:focus-visible,
.todo-form button:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

The `.task-text` reset matters: it is a real `<button>`, so it inherits button styling by default. Removing the border and background makes it look like plain text while keeping keyboard support.

### Step 3: The JavaScript (`app.js`)

```javascript
// 1. Select the elements once
const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskStatus = document.querySelector("#task-status");

// 2. Handle form submission
todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from refreshing

  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  updateStatus();

  // Clear the input and refocus for the next task
  taskInput.value = "";
  taskInput.focus();
});

// 3. Build and append a new task item
function createTaskElement(text) {
  const listItem = document.createElement("li");
  listItem.classList.add("task-item");

  // Task text: a button so it works with mouse and keyboard
  const textButton = document.createElement("button");
  textButton.type = "button";
  textButton.classList.add("task-text");
  textButton.textContent = text;
  textButton.setAttribute("aria-pressed", "false");

  textButton.addEventListener("click", function () {
    const isCompleted = listItem.classList.toggle("completed");
    textButton.setAttribute("aria-pressed", String(isCompleted));
    updateStatus();
  });

  // Delete button: removes the item from the DOM
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("aria-label", "Delete task: " + text);

  deleteBtn.addEventListener("click", function () {
    listItem.remove();
    updateStatus();
  });

  // Assemble and insert into the list
  listItem.appendChild(textButton);
  listItem.appendChild(deleteBtn);
  taskList.appendChild(listItem);
}

// 4. Keep the status line in sync
function updateStatus() {
  const total = taskList.children.length;
  const done = taskList.querySelectorAll(".task-item.completed").length;

  if (total === 0) {
    taskStatus.textContent = "No tasks yet.";
    return;
  }

  taskStatus.textContent = done + " of " + total + " tasks completed.";
}
```

Open `index.html` in your browser. Type a few tasks, click one to cross it off, and press **Delete** to remove it. Tab through the page to confirm the task text and buttons respond to the keyboard as well.

### Step 4: Test it like a user

- Submit the form with an empty input. The browser blocks it and nothing is added.
- Add three tasks and confirm the status line updates.
- Click a task. It should get a line-through and the status count should change.
- Tab to a task and press **Enter** or **Space**. The completed state should toggle.
- Delete a task. The item disappears and the count drops.
- Refresh the page. The list resets, because everything lives in memory for now.

## How the To-Do List Works

The flow is short enough to trace end to end:

1. **`submit` fires** when the user presses Add or hits Enter in the input.
2. **`event.preventDefault()`** stops the browser's default form submission and page reload.
3. **`taskInput.value.trim()`** reads the typed text and removes leading and trailing spaces.
4. **The empty check** returns early, so blank tasks never reach the list.
5. **`createTaskElement()`** builds an `li`, a text button and a delete button, then appends them.
6. **Each button owns its listener**, so clicking text toggles `completed` and clicking Delete calls `listItem.remove()`.
7. **`updateStatus()`** counts the remaining items and completed items, then writes a summary into the live region.

Because the elements are created in JavaScript, they exist only in the DOM. There is no array of tasks to loop over, which keeps this version simple. The trade-off is that you cannot re-render or persist the list yet; that comes later.

## Accessibility and Security Details

**Prefer `textContent` over `innerHTML` for user input.** This is the most important habit in this lesson. `innerHTML` parses a string as HTML, so user input can inject markup and scripts:

```javascript
const userInput = '<img src="x" onerror="alert(1)">';

element.textContent = userInput; // Safe: shown as literal text
// element.innerHTML = userInput; // Dangerous: the image tag is parsed
```

An attacker who can inject HTML can run code in your page, steal session data, or deface the UI. This is **Cross-Site Scripting (XSS)**. `textContent` treats the value as text and closes that door.

**Use real buttons for clickable things.** A `<span>` with a click listener cannot be focused or activated by keyboard. A `<button>` works with Enter and Space, is announced as a button, and supports `:focus-visible` styling.

**Label icon-only and repeated buttons.** The visible text "Delete" is fine on its own, but several identical buttons are ambiguous to screen readers. `aria-label="Delete task: Buy milk"` gives each one a unique name.

**Announce changes politely.** `aria-live="polite"` tells assistive technology to read the status line when it changes, without interrupting whatever the user is doing.

**Never remove focus outlines without a replacement.** The `:focus-visible` rule in the CSS is not decoration; it is how keyboard users know where they are.

## Common Beginner Mistakes

- Using `var` out of habit. Use `const` by default and `let` when reassignment is required.
- Reassigning a `const` and expecting it to work, or assuming `const` freezes an object's contents.
- Calling the function in `addEventListener` instead of passing it: `addEventListener("click", handleClick())` runs immediately and passes the return value. Drop the parentheses.
- Forgetting `event.preventDefault()` on a form, then wondering why the page reloads and the list disappears.
- Running `querySelector` before the element exists. Put the script at the end of `<body>` or use `defer`.
- Reading `.textContent` on an input instead of `.value`. Inputs store their current text in `value`.
- Using `innerHTML` with anything a user typed.
- Forgetting `return` inside a function, then logging `undefined`.
- Comparing with `==` and getting surprising type coercion. Use `===`.
- Writing a selector that does not match, then ignoring the resulting `null` error.

## Debug JavaScript in DevTools

1. **Read the first red error in the Console.** Later errors are often consequences of the first one.
2. **`console.log()` the value before the line that fails.** Confirm the element, the input value or the array is what you expect.
3. **Use the Elements panel** to check whether a class actually toggled. If the class is there but the style is not, the problem is in the CSS selector.
4. **Set a breakpoint** in the Sources panel and step through the code line by line. Hovering a variable shows its current value.
5. **Watch for `Cannot read properties of null`.** It means `querySelector` found nothing: check the id, the class and the script order.
6. **Test with the keyboard**, not only the mouse. Tab through the app and activate everything with Enter or Space.

## Quick Checklist

Before you call the To-Do list finished:

- The script loads after the HTML, or uses `defer`.
- Variables use `const` unless they are reassigned.
- Every `querySelector` matches a real id or class.
- `addEventListener` receives a function reference, not a function call.
- The form calls `event.preventDefault()`.
- User text is inserted with `textContent`.
- Clickable task text is a real `<button>`.
- Delete buttons have unique accessible names.
- The completed state is visible without relying on color alone.
- A visible focus ring appears on every interactive element.
- The status line updates and is announced politely.
- The Console shows no errors after adding, completing and deleting tasks.

## Conclusion and Next Steps

You just built your first interactive browser application with Vanilla JavaScript. Along the way you covered the pieces that every framework assumes you already know: variables with `const` and `let`, arrays and objects, functions and conditionals, DOM selection, class toggling, and event handling with `addEventListener`.

Your action items:

1. Rebuild the To-Do list from memory, without copying the code.
2. Add a filter for All, Active and Completed using `classList` and a loop.
3. Add an edit button that swaps the task text for an input.
4. Persist the list with `localStorage` so a refresh does not erase it.
5. Run a Lighthouse accessibility audit and fix anything it flags.

If the layout still feels shaky, revisit [CSS fundamentals](/blog/css-fundamentals-selectors-colors-box-model) and [responsive layouts](/blog/modern-responsive-layouts-flexbox-css-grid) before adding more behavior. JavaScript is easier to debug when the page underneath it is predictable.

**Tomorrow we unlock modern ES6+ syntax and asynchronous JavaScript**—template literals, arrow functions, destructuring, modules, promises, `fetch` and `async`/`await`. That is the exact foundation React and Node.js rely on, and it is where the small app you built today starts to look like a real product.
