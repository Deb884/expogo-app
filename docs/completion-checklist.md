# DIV — Completion Checklist

Derived from the spec in `README.md` and the Figma inventory in
`docs/figma-design-system.md` (44 frames across 14 sections).

## Status: complete — 44/44 frames

`npx tsc --noEmit` → exit 0. `npx expo lint` → exit 0.

## Tooling note

Design values were extracted with the **Figma REST API** against file
`1gHaxrUDpKvvA3mjXmLIpg`, page `03 - Android Application`, because the Figma MCP
tools were not bound to the session (the tool catalog is fixed at session start
even though `opencode mcp list` reports `✓ figma`). The extraction is cached in
`docs/figma-design-system.md` and `src/assets/photos.ts` (43 PNGs, named by Figma
node id). Exact hex values, font metrics, radii and spacing are therefore
verbatim, not guessed.

---

## Frames

| # | Figma frame | Route | State |
| --- | --- | --- | --- |
| 01 | Splash | `src/app/splash.tsx` | done |
| 02 | Onboarding 01/02/03 | `src/app/onboarding.tsx` | done |
| 03 | Sign In | `src/app/login.tsx` | done |
| 04 | Sign Up | `src/app/signup.tsx` | done |
| 05 | Forgot Password | `src/app/forgot-password.tsx` | done |
| 06.1 | Fitness Goal | `src/app/personalization/goal.tsx` | done |
| 06.2 | Personal Information | `src/app/personalization/information.tsx` | done |
| 06.3 | Fitness Level | `src/app/personalization/level.tsx` | done |
| 06.4 | Workout Preference | `src/app/personalization/preference.tsx` | done |
| 06.5 | Equipment | `src/app/personalization/equipment.tsx` | done |
| 06.6 | Training Schedule | `src/app/personalization/schedule.tsx` | done |
| 06.7 | Plan Generation | `src/app/personalization/generating.tsx` | done |
| 06.8 | Plan Ready | `src/app/personalization/ready.tsx` | done |
| 07.1 | Home | `src/app/(tabs)/home.tsx` | done |
| 08.1 | Workout Plan | `src/app/(tabs)/workouts.tsx` | done |
| 08.2 | Workout Library | `src/app/workouts/library.tsx` | done |
| 08.3 | Workout Categories | `src/app/workouts/categories.tsx` | done |
| 08.4 | Workout Detail | `src/app/workouts/detail.tsx?id=` | done |
| 08.5 | Exercise Detail | `src/app/workouts/exercise.tsx?id=` | done |
| 08.6 | Saved Workouts | `src/app/workouts/saved.tsx` | done |
| 09.1 | Active Workout | `src/app/session/active.tsx` | done |
| 09.2 | Rest Timer | `src/app/session/rest.tsx` | done |
| 09.3 | Workout Complete | `src/app/session/complete.tsx` | done |
| 10.1 | Progress | `src/app/(tabs)/progress.tsx` | done |
| 10.2 | Training Calendar | `src/app/progress/calendar.tsx` | done |
| 10.3 | Statistics | `src/app/progress/statistics.tsx` | done |
| 10.4 | Achievements | `src/app/progress/achievements.tsx` | done |
| 11.1 | Profile | `src/app/(tabs)/profile.tsx` | done |
| 11.2 | Edit Profile | `src/app/profile/edit.tsx` | done |
| 11.3 | My Goals | `src/app/profile/goals.tsx` | done |
| 12.1 | Settings | `src/app/settings/index.tsx` | done |
| 12.2 | Notifications | `src/app/settings/notifications.tsx` | done |
| 12.3 | App Preferences | `src/app/settings/preferences.tsx` | done |
| 12.4 | Help & Support | `src/app/settings/help.tsx` | done |
| 12.5 | About DIV | `src/app/settings/about.tsx` | done |
| 13.1 | Premium | `src/app/premium.tsx` | done |
| 14.1–14.6 | Empty Saved / Empty Progress / Empty Notifications / Network Error / Workout Loading / Profile Loading | wired into their screens + gallery at `src/app/states.tsx` | done |

## How §14 States are represented

Those six frames are **variants of existing screens**, not pages you navigate to,
so they exist twice:

1. **In context** — `EmptyState` and the `Skeleton*` primitives render on the
   screens they describe (Saved Workouts, Progress, Notifications, retry
   affordances, and as the first-paint state on Workout Detail / Profile).
2. **As a QA gallery** — `src/app/states.tsx` is a deep-link-only route
   (`div://states`) that renders all six frames side by side for review. It is
   deliberately not linked from the tab bar or any product screen.

`EmptyState`'s 112×112 `r32` tile keeps its exact box, radius and colour role but
carries a Feather glyph, because the state illustrations in the Figma file were
not part of the exported asset set.

## Architecture notes

- Design tokens live in `src/constants/` (`colors`, `typography`, `spacing`,
  `theme`) and were extracted from Figma, not eyeballed.
- Mock data lives in `src/data/` behind a barrel `index.ts` (spec §16).
- Saved-workout state uses a small external store (`src/state/saved.ts`,
  `useSyncExternalStore`) so saving on Workout Detail is reflected in Saved
  Workouts.
- Personalization is reachable from Profile (My Goals / Tune my plan) and
  Settings; the spec mandates `LOGIN → DASHBOARD`, so the wizard is not forced
  into the auth path.
- Detail screens are pushed **outside** `(tabs)` so the bottom nav renders
  correctly; the tab bar is a sibling of the navigator
  (`tabBar={() => null}` + `BottomNav`) for exact Figma control.
- The Figma artboards draw a fake status bar and gesture pill. Those are mockup
  chrome, so the app uses real device safe-area insets instead (spec §21).
- `types/assets.d.ts` declares ambient `*.png` (etc.) modules — Expo SDK 57
  ships no such declarations and Metro requires them for static asset imports.

## Known gaps

- Figma MCP tools were unavailable this session, so per-frame copy strings for
  the later sections follow the inventory in `docs/figma-design-system.md` and
  the naming conventions the earlier frames established. Re-run the MCP tools in
  a fresh session if exact copy needs verifying.
- `EmptyState` glyphs stand in for Figma illustrations (see above).
- There is no backend, database or auth — spec §8 mandates `LOGIN → DASHBOARD`
  and §20 scopes the app to local state.