# Technical Documentation

## 1. Project Overview

This project is a responsive personal portfolio website built with HTML, CSS, and JavaScript.
It was developed across three assignments:

- Assignment 1: static portfolio structure and styling
- Assignment 2: interactive UI features such as theme persistence, project filtering, and form validation
- Assignment 3: external API integration, stronger application logic, additional state management, and performance improvements

The final application focuses on:

- responsive presentation
- maintainable file organization
- progressive enhancement with JavaScript
- user-friendly interaction patterns
- lightweight implementation without frameworks

## 2. Project Structure

```text
202260300-abdulmajeedalothaymin-assignment3/
|-- README.md
|-- index.html
|-- css/
|   |-- styles.css
|-- js/
|   |-- script.js
|-- assets/
|   |-- images/
|-- docs/
|   |-- ai-usage-report.md
|   |-- technical-documentation.md
|-- .gitignore
```

Separation of concerns:

- `index.html` contains semantic structure and content
- `css/styles.css` contains layout, component styling, theming, and responsive rules
- `js/script.js` contains interactivity, state management, API access, and validation logic
- `docs/` contains supporting documentation

## 3. HTML Architecture

The page is organized into semantic sections:

- Header / navbar
- Hero
- About
- Skills
- Projects
- GitHub repositories
- Contact
- Footer

Important Assignment 3 additions:

- a dedicated GitHub repositories section for live API data
- project sorting and experience-level controls
- visitor personalization input in the hero section
- session activity panel with time-on-site feedback
- expanded helper text and feedback elements in the contact form

The project cards use reusable `data-*` attributes to support filtering, sorting, and rule-based rendering:

- `data-category`
- `data-level`
- `data-date`
- `data-featured`

## 4. CSS Design and Architecture

The stylesheet is organized into major sections:

1. Theme tokens
2. Base styles
3. Layout primitives
4. Component styling
5. Scroll reveal behavior
6. Responsive rules

### Design Approach

The visual system is based on:

- CSS variables for theme consistency
- reusable card-like surfaces for related content
- soft borders and shadows for depth
- a consistent accent color for actions and emphasis

Assignment 3 UI elements such as the visitor panel, timer panel, and extra project controls were styled to match the existing card and form language already used elsewhere in the portfolio.

## 5. JavaScript Architecture

The JavaScript file is organized into feature blocks rather than classes or modules, which fits the size and complexity of the project.

Main feature areas:

- scroll fade-in
- navbar active-section tracking
- guide toggle state
- theme persistence
- project filtering and sorting
- GitHub API loading
- visitor personalization
- time-on-site counter
- contact form validation

This structure keeps logic readable and appropriate for a small front-end project without introducing unnecessary tooling.

## 6. API Integration

Assignment 3 required external API integration. The portfolio uses the GitHub REST API.

### Purpose

The GitHub section keeps the portfolio more dynamic by showing recent public repositories instead of relying only on manually written static content.

### Implementation

The JavaScript code:

- builds the GitHub API URL using the portfolio owner's username
- fetches repository data asynchronously with `fetch`
- checks `response.ok` before using the result
- filters out forked repositories
- limits the rendered results to a smaller set for readability
- renders repository cards dynamically into the page

### Error Handling

The UI includes:

- loading state text while the request is in progress
- success state after data is rendered
- user-friendly fallback message if the request fails

This satisfies the assignment requirement to handle API failure gracefully.

## 7. Complex Logic

Assignment 3 also required more advanced application logic.

The projects section now uses multiple conditions and steps:

- category filtering with buttons
- experience-level filtering with a dropdown
- sorting by featured order, alphabetical order, and date
- summary text describing the current result state
- empty-state message when no projects match

This is more advanced than the original one-step filter because the visible output depends on combined user choices and ordered rules.

## 8. State Management

State is managed using `localStorage` and controlled UI updates.

Saved values include:

- selected theme
- site guide open/closed state
- active project category
- active project sort option
- active project experience level
- visitor name

On page load, JavaScript reads these stored values and restores the interface so the site feels consistent across sessions.

## 9. Contact Form Logic

The contact form was strengthened for Assignment 3.

Validation rules:

- name must contain at least 2 characters
- email must match a valid email pattern
- message must be between 20 and 300 characters

Additional behavior:

- live helper text for each field
- live character counter for the message
- disabled submit button until the form is valid
- success and error banners
- red highlight for invalid fields on submit

This makes the form behavior more clearly rule-based and user-guided.

## 10. Timing Feature

The hero section includes a live session activity timer.

It:

- starts counting when the page loads
- updates every second
- displays the time in a readable format
- clears the interval on page unload

This was added to satisfy the assignment requirement for a timer or counter feature.

## 11. Performance and Compatibility

The project uses several lightweight performance improvements:

- no external JavaScript frameworks
- small overall file structure
- lazy loading for project thumbnails
- asynchronous image decoding hints
- reusable CSS variables and shared component styles
- minimal DOM work for a static site

Compatibility considerations:

- responsive layout built with Flexbox and CSS Grid
- tested through browser resizing and responsive view simulation
- semantic HTML used for better browser support and maintainability

One remaining limitation is that image optimization is manual; large assets should be compressed before final deployment if needed.

## 12. Known Limitations

- the contact form is client-side only and does not send real messages
- GitHub content depends on network access and GitHub API availability
- project data is still partly hand-authored in the HTML rather than being fully data-driven

## 13. Future Improvements

- deploy the site publicly
- add backend form handling
- connect project cards to individual repositories or live demos
- compress or replace larger image assets
- improve accessibility further with expanded keyboard and ARIA review
