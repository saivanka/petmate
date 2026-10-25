# petmate

A React + Vite web app for pet owners. It opens with a login screen, then an onboarding step for new users, and then a routed app with a home page, a map to explore, pet events, a profile page, and a chat page.

## What it does

- Login first: `src/App.jsx` shows the Login page until a user is set, then shows Onboarding until onboarding is marked complete. Both states are kept in the browser's local storage (`petmate_user` and `petmate_onboarded_<username>`).
- Home (`/`): the main page, with pet cards (`src/components/PetCard.jsx`).
- Explore map (`/map`): a Leaflet map page, with a location picker (`src/components/LocationPicker.jsx`).
- Events (`/events`): a pet events page, with an event room component (`src/components/EventRoom.jsx`).
- Profile (`/profile`): the signed-in user's profile page.
- Chat (`/chat`): an AI chat page.
- Navigation: a shared Navbar (`src/components/Navbar.jsx`) with logout, which clears the stored user.

## Tech stack

- React 19 and Vite 8 (see `package.json`)
- React Router (`react-router-dom`) for routing
- Leaflet and React Leaflet for maps
- Lucide React for icons
- ESLint for linting (see `eslint.config.js`)

## How to run

```bash
npm install
npm run dev
```

Build for production and preview the build:

```bash
npm run build
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Project structure

```
index.html              # Entry page
vite.config.js          # Vite configuration
eslint.config.js        # ESLint configuration
src/
  main.jsx              # App entry point
  App.jsx               # Routing, login and onboarding gates
  App.css, index.css    # Styles
  assets/               # Static assets
  components/
    Navbar.jsx          # Shared navigation bar
    PetCard.jsx         # Pet card
    LocationPicker.jsx  # Map location picker
    EventRoom.jsx       # Event room
  pages/
    Home.jsx            # Home page (/)
    ExploreMap.jsx      # Map page (/map)
    Events.jsx          # Events page (/events)
    Profile.jsx         # Profile page (/profile)
    AIChat.jsx          # Chat page (/chat)
    Login.jsx           # Login page
    Onboarding.jsx      # Onboarding page
```

## Status

This is an early, single-commit app: sign-in and onboarding are local-storage only, with no backend in this repository.
