# DIV — Design System (extracted from Figma)

Source: Figma file `1gHaxrUDpKvvA3mjXmLIpg` ("div"), page `03 - Android Application`.
Extracted via Figma REST API. **These values are the source of truth.**

## Canvas

- Frame size: **390 x 844** (Android reference viewport)
- Screen background: `#020301`
- Flat design — **no drop shadows anywhere** (verified: zero effects in file)

## Color tokens

| Token | Value | Role |
| --- | --- | --- |
| `background` | `#020301` | Screen background |
| `surface` | `#0E1805` | Inputs, secondary buttons, icon buttons |
| `surfaceSunken` | `#182D09` | Progress track, bottom-nav border, illustration tile |
| `accent` | `#6FD029` | Primary button, active nav, progress fill, links |
| `accentPressed` | `#82D944` | Pressed state |
| `accentSoft` | `#BDEB9D` | Success / strength copy |
| `accentMuted` | `#21420D` | Selected card background |
| `borderSubtle` | `#182D09` | Card + bottom-nav hairline |
| `borderStrong` | `#305711` | Input border, disabled dots, checkbox |
| `textPrimary` | `#FFFFFF` | Headings, values |
| `textSecondary` | `#B7C0B0` | Body copy, captions, gesture handle |
| `danger` | `#D89C82` | Error message |
| `onAccent` | `#020301` | Text on green button |

## Radii

| Token | Value | Used by |
| --- | --- | --- |
| `xs` | 2 | Gesture handle |
| `sm` | 5 | Skeleton, small chips |
| `md` | 8 | Progress dots |
| `lg` | 12 | Selected date |
| `card` | 16 | Cards, inputs, buttons, photos |
| `selectable` | 18 | Selectable cards |
| `illustration` | 32 | Empty-state illustration tile (112x112) |
| `pill` | 100 | Progress bars, toggles, avatars |

## Typography — Inter

| Token | Size / Weight / Line-height | Letter spacing | Usage |
| --- | --- | --- | --- |
| `wordmarkXl` | 88 / 900 / 107 | -5.72 | Splash "DIV" |
| `wordmarkLg` | 48 / 900 / 58 | -3.12 | Login "DIV" |
| `wordmarkMd` | 32 / 900 / 39 | -2.08 | Header "DIV" |
| `display` | 36 / 700 / 49 | 0 | Onboarding headline |
| `h1` | 32 / 700 / 43 | 0 | "Welcome back." |
| `h2` | 28 / 700 / 34 | 0 | Top app bar title |
| `h2Center` | 28 / 700 / 38 | 0 | Empty-state title |
| `h3` | 24 / 700 / 29 | 0 | Section heading |
| `titleLg` | 20 / 400 / 27 | 0 | Card headline |
| `titleMd` | 20 / 600 / 27 | 0 | Specimen heading |
| `stat` | 26 / 700 / 31-35 | 0 | Stat numbers |
| `body` | 16 / 400 / 22 | 0 | Body copy, input values |
| `button` | 16 / 700 / 19 | 0 | Button labels |
| `bodyCenter` | 15 / 400 / 20 | 0 | Centered supporting copy |
| `label` | 14 / 400 / 19 | 0 | Links, bottom-nav (inactive 12) |
| `meta` | 13 / 400 / 18 | 0 | Workout metadata |
| `caption` | 12 / 400 / 16 | 0 | Captions, legal |
| `fieldLabel` | 12 / 500 / 15 | 0 | Input field labels |
| `overline` | 12 / 700 / 16 | 0 | "OR", eyebrows |
| `statusBar` | 12 / 600 / 15 | 0 | Status-bar clock |

## Spacing

Horizontal page padding is **24**. Screen gutters resolve to:

- 390dp  -> 24
- 360dp  -> 20
- 412dp+ -> 24 (capped)

Common gaps: `8` (tight stacks), `16` (content rhythm), `24` (section rhythm).
Vertical rhythm: status bar `32`, top app bar `72`, bottom nav `~80`, gesture area `24`.

## Screen anatomy (shared contract)

```text
Screen (390x844, VERTICAL, fill #020301, strokeAlign INSIDE)
├── Android status bar        390x32   HORIZONTAL padRight 24, SPACE_BETWEEN/CENTER
│   ├── Text "Time"                   12/600 #FFFFFF  "9:41"
│   └── Vector "Signal, Wi-Fi and battery"  64x14
├── [Top app bar]            390x72   HORIZONTAL padH 16, align CENTER
│   ├── Icon button          48x48    fill #0E1805 r16
│   └── Heading (grow)               28/700 #FFFFFF
├── Scroll viewport (grow:1) VERTICAL
│   └── Scroll content               VERTICAL gap 24 (16 dense) pad 24/24/24/24
├── [Fixed actions]                  VERTICAL gap 8 pad 16/24/16/24
└── Android navigation area   390x24   fill #020301, CENTER
    └── Gesture handle                104x4 r2 #B7C0B0
```

Scrollable screens split into `Scroll viewport` (flex:1) + `Fixed actions`, so the
primary CTA and the gesture bar stay pinned while content scrolls.

## Screens (44 total)

| # | Section | Screens |
| --- | --- | --- |
| 04 | Splash & Onboarding | Splash, Onboarding 01, 02, 03 |
| 05 | Authentication | Login, Sign Up, Forgot Password |
| 06 | Personalization | Fitness Goal, Personal Information, Fitness Level, Workout Preference, Equipment, Training Schedule, Plan Generation, Plan Ready |
| 07 | Home | Home |
| 08 | Workouts | Workout Plan, Workout Library, Workout Categories, Workout Detail, Exercise Detail, Saved Workouts |
| 09 | Active Workout | Active Workout, Rest Timer, Workout Complete |
| 10 | Progress | Training Calendar, Progress, Statistics, Achievements |
| 11 | Profile | Profile, Edit Profile, My Goals |
| 12 | Settings | Settings, Notifications, App Preferences, Help & Support, About DIV |
| 13 | Premium | Premium |
| 14 | States | Empty Saved Workouts, Empty Progress, Empty Notifications, Network Error, Workout Loading, Profile Loading |
