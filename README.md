# DIV

A dark, neon-green fitness training app built with Expo and React Native. DIV takes you from sign-up through a personalized plan (goal, level, equipment, schedule), then tracks every workout, rest break, and PR.

## Features

- **Auth flow** — splash, onboarding, sign in / sign up, forgot password
- **Personalization wizard** — fitness goal, personal info, level, preferences, equipment, schedule, plan generation
- **Workouts** — plan view, library, categories, workout & exercise detail, saved workouts
- **Live session** — active workout player, rest timer, session summary
- **Progress** — training calendar, statistics, achievements
- **Profile & settings** — edit profile, goals, notifications, preferences, help, about
- **Local persistence** — SQLite via `expo-sqlite`

## Tech stack

| | |
| --- | --- |
| Framework | Expo SDK 57, React Native 0.86, React 19 |
| Routing | Expo Router (typed routes) |
| Language | TypeScript 6 |
| Styling | Native styling with design tokens extracted from Figma |
| Storage | `expo-sqlite` |
| Animations | `react-native-reanimated`, `react-native-gesture-handler` |
| Lint | ESLint (`eslint-config-expo`) |

## Getting started

```bash
npm install
npx expo start
```

Then press `i` (iOS), `a` (Android), or scan the QR code with Expo Go.

### Scripts

| Command | Description |
| --- | --- |
| `npm run start` | Start the Expo dev server |
| `npm run start:go` | Start and print an Expo Go QR code |
| `npm run android` / `npm run ios` | Start on Android / iOS |
| `npm run web` | Start the web dev server |
| `npm run web:preview` | Build and serve the production web bundle |
| `npm run lint` | Run ESLint |

Typecheck with `npx tsc --noEmit`.

## Project structure

```
src/
  app/            # Expo Router screens (every file is a route)
    (tabs)/       # Home, Workouts, Progress, Profile
    personalization/
    workouts/
    session/
    progress/
    profile/
    settings/
  components/     # Reusable UI, navigation, workout & progress widgets
  constants/      # colors, spacing, typography, theme tokens
  data/           # Exercises, plans, progress, profile fixtures
  services/       # SQLite setup
  state/          # Saved-workout state
docs/             # Design-system extraction and completion checklist
scripts/          # Dev helpers (Expo Go QR, static web preview)
```

## Design system

Colors, radii, spacing, and type were extracted verbatim from the Figma file (page "03 - Android Application", 390 × 844 reference viewport) and live in `src/constants/`. Do not invent new values — the tokens are the visual source of truth.

- Screen background `#020301`, accent `#6FD029`, flat design with no drop shadows
- Full token tables: [`docs/figma-design-system.md`](docs/figma-design-system.md)
- Screen-by-screen status: [`docs/completion-checklist.md`](docs/completion-checklist.md)

## License

Private — all rights reserved.
