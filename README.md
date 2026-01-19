# React Native Boilerplate

A minimal React Native boilerplate using Expo SDK 54 with TypeScript.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
npm start
```

Then press:

- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

## Building Standalone Apps

### First-time setup

```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Build Commands

| Command                   | Output                                                 |
| ------------------------- | ------------------------------------------------------ |
| `npm run build:android`   | APK for Android devices                                |
| `npm run build:ios`       | IPA for iOS devices (requires Apple Developer account) |
| `npm run build:simulator` | Builds for both Android emulator & iOS simulator       |
| `npm run build:all`       | APK + IPA for real devices                             |

## Before Building for Production

Add the following image assets to the `assets/` folder:

| File                | Size      | Purpose               |
| ------------------- | --------- | --------------------- |
| `icon.png`          | 1024x1024 | App icon              |
| `splash.png`        | 1284x2778 | Splash screen         |
| `adaptive-icon.png` | 1024x1024 | Android adaptive icon |
| `favicon.png`       | 48x48     | Web favicon           |

## Project Structure

```
.
├── App.tsx             # Main app component
├── assets/             # App icons and splash screen
├── app.json            # Expo configuration
├── babel.config.js     # Babel config
├── eas.json            # EAS Build config
├── metro.config.js     # Metro bundler config
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript config
```

## Technologies

- **React Native** 0.81
- **Expo** SDK 54
- **TypeScript** 5.3
