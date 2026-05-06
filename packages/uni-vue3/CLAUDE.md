# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **UniApp Vue 3** multi-platform application built with:
- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety
- **Vite** as build tool with `@dcloudio/vite-plugin-uni`
- **UniApp framework** for cross-platform deployment (H5, WeChat Mini Program, Alipay Mini Program, etc.)
- **ESLint** + **Prettier** + **oxlint** for code quality
- **Vue I18n** for internationalization (configured but not yet implemented)

## Key Configuration Files

- `vite.config.ts` - Vite configuration with UniApp plugin and `@/` alias to `src/`
- `tsconfig.json` - TypeScript configuration extending `@vue/tsconfig` with UniApp types
- `eslint.config.ts` - ESLint configuration with Vue/TypeScript rules and Prettier integration
- `src/pages.json` - UniApp page routing and tabBar configuration
- `src/manifest.json` - UniApp platform-specific configurations (app IDs, permissions, etc.)
- `.prettierrc.json` - Prettier formatting rules (single quotes, 2-space tabs)

## Development Commands

### Development Servers
- `npm run dev:h5` - Develop for H5 platform
- `npm run dev:mp-weixin` - Develop for WeChat Mini Program
- `npm run dev:mp-alipay` - Develop for Alipay Mini Program
- `npm run dev:custom` - Interactive platform selection
- `npm run dev:h5:ssr` - Develop H5 with SSR (Server-Side Rendering)

### Build Commands
- `npm run build:h5` - Build for H5 production
- `npm run build:mp-weixin` - Build WeChat Mini Program
- `npm run build:mp-alipay` - Build Alipay Mini Program
- `npm run build:h5:ssr` - Build H5 with SSR

### Code Quality
- `npm run type-check` - Run TypeScript type checking with `vue-tsc`

## Project Structure

```
src/
├── pages/                    # All application pages
│   ├── index/               # Home page (tab 1)
│   ├── blog/                # Blog page (tab 2)
│   ├── user/                # User center (tab 3)
│   └── login/               # Authentication pages
├── static/                  # Static assets (images, icons)
├── App.vue                  # Root app component with UniApp lifecycle hooks
├── main.ts                  # App entry with SSR support
├── pages.json              # Page routing and tabBar configuration
├── manifest.json           # Platform-specific app configuration
├── uni.scss                # Global SCSS styles
├── env.d.ts                # Vue module declarations
└── shime-uni.d.ts          # UniApp type extensions
```

## Architecture Notes

### Routing & Navigation
- Routes defined in `pages.json` with tabBar for main navigation (Home, Blog, User)
- Use `uni.navigateTo`, `uni.switchTab`, `uni.redirectTo` for programmatic navigation
- Pages are automatically registered based on `pages.json`

### State Management
- Currently uses local component state with `ref` and `reactive`
- No centralized state management (Pinia/Vuex) implemented yet
- Login state stored in `uni.getStorageSync('loginData')`

### Styling
- Uses **rpx** (responsive pixel) units for cross-platform compatibility
- Supports SCSS with `<style lang="scss">`
- Global styles in `uni.scss`
- Component-scoped styles with `scoped` attribute

### Cross-Platform Considerations
- Use `uni.*` APIs instead of platform-specific APIs (e.g., `uni.chooseImage` not `wx.chooseImage`)
- Check `uni.getSystemInfoSync()` for platform detection if needed
- Be aware of CSS differences between platforms (rpx helps but not perfect)

### TypeScript
- Uses `@dcloudio/types` for UniApp API types
- Vue components use `lang="ts"` and `<script setup>` syntax
- Type declarations in `src/env.d.ts` and `shims-uni.d.ts`

## Development Guidelines

### Adding New Pages
1. Create `.vue` file in `src/pages/{category}/`
2. Add route entry to `pages.json` `"pages"` array
3. For tab pages, add to `"tabBar"` `"list"` array

### Component Organization
- Currently all components are page-level (no shared `components/` directory)
- Consider extracting reusable UI components to `src/components/` if needed

### API Integration
- No API layer defined yet - currently uses mock data
- Consider creating `src/api/` directory for service modules
- Use `uni.request()` for HTTP calls with proper error handling

### Internationalization
- Vue I18n dependency is installed but not configured
- Consider setting up locale files in `src/locales/` if needed

## Platform-Specific Notes

### WeChat Mini Program
- App ID configured in `manifest.json` (`mp-weixin.appid`)
- Requires WeChat Developer Tools for preview and debugging
- Some Web APIs may not be available

### H5 Platform
- Full web browser capabilities
- Can use SSR mode with `npm run dev:h5:ssr`
- No Mini Program API limitations

### App Platforms
- `app-plus` configuration in `manifest.json` for native app features
- Additional permissions may be required for camera, storage, etc.

## Common Issues & Solutions

### TypeScript Errors
- Ensure `@dcloudio/types` is correctly referenced in `tsconfig.json`
- Use proper type assertions for UniApp API responses

### CSS Compatibility
- Test on multiple platforms - some CSS properties may behave differently
- Use `rpx` for responsive sizing across devices

### Build Errors
- Clear `dist/` and `unpackage/` directories if experiencing strange build issues
- Check platform-specific configurations in `manifest.json`

### Navigation
- Use `uni.switchTab()` for tab bar navigation, `uni.navigateTo()` for regular pages
- Tab pages cannot have navigation bars with back buttons

## Testing
- No test framework configured yet
- Consider adding Vitest for unit tests and Playwright for E2E tests