# React Demo

A modern React application built with Vite, TypeScript, and TailwindCSS.

## Features

- React 18 with TypeScript
- Vite 5 for fast development and building
- React Router 6 for client-side routing
- Zustand for state management with persistence
- TailwindCSS for styling
- ESLint for code quality
- Vitest for testing

## Development

From the monorepo root:
```bash
pnpm run dev:react-demo
```

Or directly in this directory:
```bash
pnpm dev
```

## Project Structure

- `src/` - Source code
  - `components/` - Reusable React components
  - `pages/` - Page components
  - `router/` - React Router configuration
  - `stores/` - Zustand stores
  - `types/` - TypeScript type definitions
- `public/` - Static assets