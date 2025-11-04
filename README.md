<br />
<div align="center">

<h2 align="center">Redux Todo App</h2>

<p align="center">

This application makes use of a Redux Store in order to handle state changes occuring in components throughout the application.

The default screen is for 3 todos but as add, remove, complete, and so forth, your own todos will be persisted in the localStorage.

There is unit testing for all of the Redux Slice logic, component testing to check the each element renders properly within each component, and changes under the correct circumstances, and also integration testing to check these elements render under the relevant user events.

The styling makes use of global class name best practices, and avoids class collisions.
    </p>
</div>

## Table of Contents
<!-- TABLE OF CONTENTS -->
<details>
	<summary>Table of Contents</summary>
  	<ol>
    	<li><a href="#tech-stack">Tech Stack</a></li>
		  <li><a href="#prerequisites">Prerequisites</a></li>
    	<li><a href="#project-structure">Project Structure</a></li>
    	<li><a href="#component-responsibilities">Component Responsibilities</a></li>
    	<li><a href="#contributing">Contributing</a></li>
    	<li><a href="#responsiveness">Responsiveness</a></li>
    	<li><a href="#testing">Testing</a></li>
    	<li><a href="#extras">Extras</a></li>
  	</ol>
</details>

## Tech Stack

- Vite — extremely fast set up time and dev server updates, which keeps the feedback loop short while developing.
- React — allows for fast and non-refreshing UX.
- Redux - offers a seperate state management tool which allows for cleaner code when sharing state throughout the application
Redux Toolkit - Makes for much less boilerplate code in setting up Redux Stores and Slices.
- Vitest + Testing Library — lightweight, fast unit and component tests (see `src/*/*.test.*`). Great for TDD and CI.
- react-error-boundary — allows for a catch-all method for handling unanticipated runtime errors in the UI.
- Yarn (package manager) — forces deterministic installs via its lockfile and historically reduces some cross-environment compatibility issues.

Why these choices: I chose yarn because it has caused fewer compatibility issues for me when I develop from a much older and 'travel-friendly' laptop. Vite is incredibly fast and has no additional set up for React and easy to install Redux. Redux allows for much cleaner code as all state management is outside of the components. Vitest also provides fast test execution and was easy to learn after Jest. It also integrates well with the react-testing-library I use.


## Prerequisites

Quick start — run locally

- Node.js. 

- Yarn is also recommended for contributors over npm to avoid dependency conflicts or lockfile mismatches. If you don't have Yarn installed you can install Yarn globally (for example via npm: `npm install -g yarn`).


Open a PowerShell terminal and run:

```powershell
yarn install
yarn dev
```

Then open the app at: http://localhost:5173

Other useful scripts:

```powershell
yarn test        # run unit/component tests with vitest

yarn build       # build for production

yarn preview     # preview the production build locally
```

## Project Structure

- `src/` — main source files
	- `components/` - each of the React UI components (each component has a folder containing a react `.jsx` file, and a testing `.test.jsx` file)
	- `helpers/` - the localStorage helper functions
  - `store/` - all Redux Store and Slice creation and testing files.
	- `App.jsx`, `main.jsx` - entry point.

## Component Responsibilities

- App - root of the app. renders either AddTodo or EditTodo components, and the appropriate number of TodoItems or Completed component.
- AddTodo - text input with submission linked to updating store with new todo.
- EditTodo - identically styled to AddTodo, but rendered and integrated with store actions for editing the title of a todo.
- TodoItem - renders the todo text, and 3 buttons for completion, deletion or editing functionality via the store.
- Completed - a small message for UX when all todos have been deleted.
- store/Store - creation of the store with redux toolkit, and also checks and overwrites initial state with any localStorage. 
- store/slices/TodoSlice - creation of the todo slice, which includes the default intitial state, and all actions for updating the store.

## Contributing

1. Fork the repo and create a branch: `feature/your-short-desc`.
2. Run the project and tests locally. Please fix or add tests for any functionality or behaviour you change.
3. Open a pull request with a clear description of the change and why it would be beneficial to include.

## Responsiveness

The UI uses component-scoped CSS modules and responsive layout rules. It has been styled to adapt from larger computer screens down to small mobile devices (iPhone SE).

## Testing

Tests are written with Vitest and the Testing Library (see `src/**/*.test.*`). The test suite includes component tests that verify rendering and user interactions, plus helper tests for utility functions.

To run tests with Yarn:

```powershell
yarn test
```

## Extras

- Default search: the app shows the word 'joy' as a default because it makes me happy.

<p align="right">(<a href="#readme-top">back to top</a>)</p>