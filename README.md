# 202260300-abdulmajeedalothaymin-assignment3

## Project Description

This project is a responsive personal portfolio website built with plain HTML, CSS, and JavaScript.
It started as a static portfolio in Assignment 1, gained interactivity in Assignment 2, and was extended in Assignment 3 with external API integration, stronger application logic, state management, and performance improvements.

The website presents:

- personal introduction and skills
- project cards with filtering and sorting controls
- live GitHub repository data fetched from the GitHub API
- a personalized visitor experience using saved local state
- a contact form with stronger validation rules

## Features

- Light and dark theme toggle with saved preference
- Scroll-based section reveal animation
- Active navbar link highlighting while scrolling
- Expandable site guide panel
- Project filtering by category
- Project sorting by featured order, title, and date
- Project filtering by visitor experience level
- Live GitHub repositories section with loading and error handling
- Visitor name personalization with saved greeting
- Saved UI state for project controls and guide visibility
- Time-on-site counter
- Contact form with name validation, email validation, message length rules, live helper text, a live character counter, and a disabled submit button until valid
- Responsive layout for desktop and mobile

## Project Structure

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

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/abdulmajeed-alothaymin24/202260300-abdulmajeedalothaymin-assignment3.git
```

2. Open the project folder.

3. Run the website locally using one of these options:

- open `index.html` directly in a browser, or
- use VS Code Live Server for local development

4. Make sure you are connected to the internet when testing the GitHub repositories section, because it fetches live data from the GitHub API.

## API Used

The project uses the GitHub REST API to fetch and display recent public repositories from the portfolio owner's GitHub account.

API endpoint pattern:

```text
https://api.github.com/users/{username}/repos
```

In this project, the username is:

```text
abdulmajeed-alothaymin24
```

## AI Use Summary

AI tools were used for implementation support, debugging, UI refinement, and documentation drafting.
The final code and documentation were reviewed, edited, and tested manually before inclusion.

Detailed AI documentation is available in:

- [docs/ai-usage-report.md](docs/ai-usage-report.md)

## Technical Documentation

Detailed implementation notes are available in:

- [docs/technical-documentation.md](docs/technical-documentation.md)

## Optional Deployment

This project can be deployed using:

- GitHub Pages
- Netlify
- Vercel

## Notes

- The contact form is client-side only and does not send data to a backend service.
- The GitHub section depends on the API being reachable at runtime.
