# SkyScreen In-flight Movie Library

A responsive in-flight movie browser built with React, TypeScript, and Vite. Travelers can search the onboard catalog, filter by genre, sort titles, view movie details, and quickly see whether a movie fits within the remaining flight time.

## Features

- Search by movie title, director, or cast member
- Filter movies by genre and sort them alphabetically
- Expandable movie details
- Flight-time compatibility badges
- Responsive desktop, tablet, and mobile layout
- Clear empty state when no movies match

## Technology

- React 18
- TypeScript
- Vite
- Component-scoped CSS

## Setup

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal, usually `http://localhost:5173`.

## Commands

```bash
npm run dev       # Start the development server
npm run typecheck # Check TypeScript
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build
```

No environment variables, user roles, authentication, or credentials are required.

## Structure

```text
src/
  assets/       Movie catalog data
  components/   Reusable filters and movie cards
  screens/      Movie library screen
  types/        Shared TypeScript interfaces
  App.tsx       Application shell
  main.tsx      Vite entry point
```
