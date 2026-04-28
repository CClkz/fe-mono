# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **frontend monorepo** using pnpm workspaces with three independent projects:

1. **`@fe-mono/vue3-app`** (`packages/vue3-app/`) - A modern Vue 3 application built with:
   - Vue 3 + Composition API + `<script setup>` syntax
   - TypeScript for type safety
   - Vite 8 as build tool
   - Vue Router 4 for client-side routing
   - Pinia for state management
   - ESLint and Vitest scripts configured (dependencies may need installation)

2. **`uni-vue3`** (`packages/uni-vue3/`) - A UniApp Vue 3 multi-platform application:
   - Vue 3 with Composition API
   - TypeScript with `@dcloudio/types` for UniApp API types
   - Vite with `@dcloudio/vite-plugin-uni` for cross-platform builds
   - UniApp framework for deployment to H5, WeChat Mini Program, Alipay Mini Program, etc.
   - ESLint + Prettier + oxlint for code quality
   - Vue I18n installed (not yet configured)

3. **`@fe-mono/react-demo`** (`packages/react-demo/`) - A modern React application built with:
   - React 18 with TypeScript
   - Vite 5 as build tool
   - React Router 6 for client-side routing
   - Zustand for state management
   - TailwindCSS for styling
   - ESLint and Vitest scripts configured

All projects are configured as independent packages within a pnpm workspace.

## Key Configuration Files

### Monorepo Root
- `package.json` - Root package with workspace scripts using `pnpm --filter`
- `pnpm-workspace.yaml` - Defines `packages/*` as workspace packages
- `pnpm-lock.yaml` - Shared dependency lockfile

### vue3-app Project
- `packages/vue3-app/vite.config.ts` - Vite configuration with `@/` alias to `src/`
- `packages/vue3-app/tsconfig.app.json` - TypeScript config for Vue app
- `packages/vue3-app/tsconfig.node.json` - TypeScript config for Node/CLI

### uni-vue3 Project
- `packages/uni-vue3/vite.config.ts` - Vite config with UniApp plugin
- `packages/uni-vue3/eslint.config.ts` - ESLint configuration with Vue/TypeScript rules
- `packages/uni-vue3/tsconfig.json` - TypeScript config extending `@vue/tsconfig`
- `packages/uni-vue3/src/pages.json` - UniApp page routing and tabBar configuration
- `packages/uni-vue3/src/manifest.json` - Platform-specific app configurations
- `packages/uni-vue3/.prettierrc.json` - Prettier formatting rules

### react-demo Project
- `packages/react-demo/vite.config.ts` - Vite configuration with `@/` alias to `src/`
- `packages/react-demo/tsconfig.app.json` - TypeScript config for React app
- `packages/react-demo/tsconfig.node.json` - TypeScript config for Node/CLI
- `packages/react-demo/tailwind.config.js` - TailwindCSS configuration
- `packages/react-demo/postcss.config.js` - PostCSS configuration

## Development Commands

All commands are run from the **monorepo root** using `pnpm run <command>`:

### vue3-app Project
- `pnpm run dev:vue3-app` - Start development server
- `pnpm run build:vue3-app` - Build for production
- `pnpm run preview:vue3-app` - Preview production build
- `pnpm run type-check:vue3-app` - Run TypeScript type checking
- `pnpm run lint:vue3-app` - Run ESLint with auto-fix
- `pnpm run test:vue3-app` - Run unit tests with Vitest
- `pnpm run test:coverage:vue3-app` - Run tests with coverage report
- `pnpm run test:ui:vue3-app` - Launch Vitest UI

### uni-vue3 Project
- `pnpm run dev:uni-vue3` - Start H5 development server (`dev:h5`)
- `pnpm run build:uni-vue3` - Build H5 production version (`build:h5`)
- `pnpm run type-check:uni-vue3` - Run TypeScript type checking

**Note:** For other UniApp platforms (WeChat, Alipay, etc.), run commands directly in the `packages/uni-vue3/` directory:
- `cd packages/uni-vue3 && pnpm run dev:mp-weixin` - Develop for WeChat Mini Program
- `cd packages/uni-vue3 && pnpm run build:mp-weixin` - Build WeChat Mini Program
- See `packages/uni-vue3/CLAUDE.md` for complete platform-specific commands

### react-demo Project
- `pnpm run dev:react-demo` - Start development server
- `pnpm run build:react-demo` - Build for production
- `pnpm run preview:react-demo` - Preview production build
- `pnpm run type-check:react-demo` - Run TypeScript type checking
- `pnpm run lint:react-demo` - Run ESLint with auto-fix
- `pnpm run test:react-demo` - Run unit tests with Vitest
- `pnpm run test:coverage:react-demo` - Run tests with coverage report
- `pnpm run test:ui:react-demo` - Launch Vitest UI

### Monorepo Maintenance
- `pnpm run clean` - Remove all `node_modules` directories (use with caution)

## Project Structure

```
fe-mono/
├── packages/
│   ├── vue3-app/                 # Modern Vue 3 web application
│   │   ├── src/
│   │   │   ├── assets/           # Static assets
│   │   │   ├── components/       # Reusable Vue components
│   │   │   ├── pages/            # Page components
│   │   │   │   ├── index/        # Home page
│   │   │   │   ├── blog/         # Blog pages
│   │   │   │   ├── user/         # User center pages
│   │   │   │   └── login/        # Authentication pages
│   │   │   ├── router/           # Vue Router configuration
│   │   │   ├── stores/           # Pinia stores
│   │   │   ├── types/            # TypeScript type definitions
│   │   │   ├── App.vue           # Root app component
│   │   │   └── main.ts           # Application entry point
│   │   ├── public/               # Public assets
│   │   └── index.html            # HTML template
│   │
│   ├── uni-vue3/                 # UniApp multi-platform application
│   │   ├── src/
│   │   │   ├── pages/            # UniApp pages (file-based routing)
│   │   │   ├── static/           # Static assets
│   │   │   ├── App.vue           # Root component with UniApp lifecycle
│   │   │   ├── main.ts           # Entry with SSR support
│   │   │   ├── pages.json        # Page routing and tabBar config
│   │   │   ├── manifest.json     # Platform-specific configurations
│   │   │   ├── uni.scss          # Global SCSS styles
│   │   │   ├── env.d.ts          # Vue module declarations
│   │   │   └── shime-uni.d.ts    # UniApp type extensions
│   │   └── (see packages/uni-vue3/CLAUDE.md for detailed structure)
│   │
│   └── react-demo/               # Modern React application
│       ├── src/
│       │   ├── assets/           # Static assets
│       │   ├── components/       # Reusable React components
│       │   │   └── layout/       # Layout components (BottomTabBar, etc.)
│       │   ├── pages/            # Page components
│       │   │   ├── index/        # Home page
│       │   │   ├── blog/         # Blog pages
│       │   │   ├── user/         # User center pages
│       │   │   └── login/        # Authentication pages
│       │   ├── router/           # React Router configuration
│       │   ├── stores/           # Zustand stores
│       │   ├── types/            # TypeScript type definitions
│       │   ├── App.tsx           # Root app component
│       │   ├── main.tsx          # Application entry point
│       │   └── index.css         # Global styles with TailwindCSS
│       ├── public/               # Public assets
│       └── index.html            # HTML template
│
├── package.json                  # Root workspace configuration
├── pnpm-workspace.yaml           # Workspace definition
└── pnpm-lock.yaml               # Shared dependency lockfile
```

## Architecture Notes

### Monorepo Setup
- Uses **pnpm workspaces** with `packages/*` pattern
- Dependencies are hoisted where possible, but each package has its own `node_modules`
- Root scripts use `pnpm --filter` to target specific packages
- No shared build configuration between projects - each is independent

### vue3-app Architecture
- **Routing**: Vue Router 4 with programmatic navigation
- **State Management**: Pinia stores (example: `auth.ts`)
- **Styling**: Standard CSS with Vue SFC `<style>` blocks
- **TypeScript**: Strict mode enabled, path alias `@/` for `src/`
- **Testing**: Vitest scripts configured (dependencies may need installation)

### uni-vue3 Architecture
- **Routing**: File-based routing via `pages.json` with tabBar navigation
- **State Management**: Local component state (`ref`/`reactive`), no centralized store yet
- **Styling**: SCSS with `rpx` units for cross-platform compatibility
- **Cross-Platform**: Uses `uni.*` APIs instead of platform-specific APIs
- **TypeScript**: `@dcloudio/types` for UniApp API type definitions

### react-demo Architecture
- **Routing**: React Router 6 with programmatic navigation and route guards
- **State Management**: Zustand stores with persistence middleware
- **Styling**: TailwindCSS with custom CSS for component-specific styles
- **TypeScript**: Strict mode enabled, path alias `@/` for `src/`
- **Testing**: Vitest scripts configured for unit testing

### Dependency Management
- Each package manages its own dependencies in its `package.json`
- Root `pnpm-lock.yaml` ensures consistent versions across packages
- Use `pnpm add <package>` within specific package directory to add dependencies

## Development Guidelines

### Working with Packages
- Always run commands from the **monorepo root** using `pnpm run <command>:<project>`
- To run commands directly in a package, `cd` into the package directory first
- When adding dependencies to a specific package, navigate to that package directory first

### Adding New Packages
1. Create new directory under `packages/`
2. Initialize with `pnpm init` or copy existing `package.json` structure
3. Add package name to `pnpm-workspace.yaml` if using custom workspace patterns
4. Update root `package.json` scripts if needed

### Code Quality
- **vue3-app**: ESLint scripts configured (dependencies may need installation)
- **uni-vue3**: Full ESLint + Prettier + oxlint setup with shared configs
- **react-demo**: ESLint with React/TypeScript rules configured
- Run `pnpm run lint:<project>` before committing changes

### Testing
- **vue3-app**: Vitest scripts configured (dependencies may need installation)
- **uni-vue3**: No test framework configured yet - consider adding Vitest
- **react-demo**: Vitest scripts configured for unit testing

### Cross-Project Considerations
- These are independent applications with no shared code
- Consider extracting shared utilities to a separate package if needed
- No current shared UI components or business logic

## Platform-Specific Notes

### uni-vue3 Multi-Platform Development
- See detailed platform notes in `packages/uni-vue3/CLAUDE.md`
- Key platforms: H5, WeChat Mini Program, Alipay Mini Program, various quick apps
- Each platform may require specific configuration in `manifest.json`

### Build Outputs
- **vue3-app**: Outputs to `packages/vue3-app/dist/`
- **uni-vue3**: Outputs to `packages/uni-vue3/dist/` (H5) or `packages/uni-vue3/unpackage/dist/` (other platforms)
- **react-demo**: Outputs to `packages/react-demo/dist/`

## Common Issues

### Dependency Conflicts
- If encountering module resolution issues, try `pnpm install` at root level
- Check that dependencies are installed in the correct package directory

### Script Execution
- Root scripts use exact package names: `@fe-mono/vue3-app` for vue3-app, `uni-vue3` for uni-vue3
- Ensure package names in `--filter` match the `name` field in each package's `package.json`

### TypeScript Errors
- **vue3-app**: Uses Vue 3 TypeScript setup with `vue-tsc`
- **uni-vue3**: Requires `@dcloudio/types` for UniApp API types

### Cross-Platform Development (uni-vue3)
- Test on target platforms early and often
- Use `rpx` units for responsive design across different screen densities
- Be aware of platform-specific API limitations