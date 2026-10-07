import { ImageSourcePropType } from 'react-native';

/**
 * Photographic assets exported straight from the Figma file.
 *
 * Each PNG was rendered from its Figma node at 2x and stored locally, so the
 * app never depends on external image URLs at runtime (spec §16). Keys are named
 * after the screen/role they serve; the trailing number is the source Figma
 * node id (colons are not valid in filenames) for traceability.
 *
 * NOTE: every asset uses a literal `require()` path. Metro resolves static
 * requires at build time and cannot follow a dynamically-built path.
 */

// 04 — Splash & Onboarding
import onboarding1 from '../../assets/images/div/7-11229.png';
import onboarding2 from '../../assets/images/div/7-11252.png';
import onboarding3 from '../../assets/images/div/7-11275.png';

// 06 — Personalization
import planReady from '../../assets/images/div/7-11838.png';

// 07 — Home
import homeAvatar from '../../assets/images/div/7-11856.png';
import homeHero from '../../assets/images/div/7-11867.png';
import homePlanA from '../../assets/images/div/7-11915.png';
import homePlanB from '../../assets/images/div/7-11921.png';

// 08 — Workouts
import workoutPlanHero from '../../assets/images/div/7-11975.png';
import planExercise1 from '../../assets/images/div/7-11987.png';
import planExercise2 from '../../assets/images/div/7-11993.png';
import planExercise3 from '../../assets/images/div/7-11999.png';

import libraryHero from '../../assets/images/div/7-12056.png';
import libraryCard1 from '../../assets/images/div/7-12062.png';
import libraryCard2 from '../../assets/images/div/7-12068.png';
import libraryCard3 from '../../assets/images/div/7-12074.png';

import categoryStrength from '../../assets/images/div/7-12109.png';
import categoryCardio from '../../assets/images/div/7-12115.png';
import categoryMobility from '../../assets/images/div/7-12121.png';
import categoryCore from '../../assets/images/div/7-12127.png';
import categoryFullBody from '../../assets/images/div/7-12133.png';

import workoutDetailHero from '../../assets/images/div/7-12168.png';
import exercise1 from '../../assets/images/div/7-12185.png';
import exercise2 from '../../assets/images/div/7-12191.png';
import exercise3 from '../../assets/images/div/7-12197.png';
import exercise4 from '../../assets/images/div/7-12203.png';
import exercise5 from '../../assets/images/div/7-12209.png';
import exercise6 from '../../assets/images/div/7-12215.png';
import exercise7 from '../../assets/images/div/7-12221.png';
import exercise8 from '../../assets/images/div/7-12227.png';
import exercise9 from '../../assets/images/div/7-12233.png';
import exercise10 from '../../assets/images/div/7-12239.png';

import exerciseDetailHero from '../../assets/images/div/7-12269.png';

import savedHero from '../../assets/images/div/7-12330.png';
import savedCard1 from '../../assets/images/div/7-12336.png';
import savedCard2 from '../../assets/images/div/7-12342.png';

// 09 — Active Workout
import activeWorkoutHero from '../../assets/images/div/7-12375.png';
import restTimerAvatar from '../../assets/images/div/7-12427.png';

// 10 — Progress
import calendarHero from '../../assets/images/div/7-12565.png';

// 11 — Profile
import profileAvatar from '../../assets/images/div/7-12889.png';
import editProfileAvatar from '../../assets/images/div/7-12961.png';

// 12 / 13 — About & Premium
import aboutHero from '../../assets/images/div/7-13321.png';
import premiumHero from '../../assets/images/div/7-13354.png';

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,

  planReady,

  homeAvatar,
  homeHero,
  homePlanA,
  homePlanB,

  workoutPlanHero,
  planExercise1,
  planExercise2,
  planExercise3,

  libraryHero,
  libraryCard1,
  libraryCard2,
  libraryCard3,

  categoryStrength,
  categoryCardio,
  categoryMobility,
  categoryCore,
  categoryFullBody,

  workoutDetailHero,
  exercise1,
  exercise2,
  exercise3,
  exercise4,
  exercise5,
  exercise6,
  exercise7,
  exercise8,
  exercise9,
  exercise10,

  exerciseDetailHero,

  savedHero,
  savedCard1,
  savedCard2,

  activeWorkoutHero,
  restTimerAvatar,

  calendarHero,

  profileAvatar,
  editProfileAvatar,

  aboutHero,
  premiumHero,
} satisfies Record<string, ImageSourcePropType>;

export type ImageKey = keyof typeof images;
