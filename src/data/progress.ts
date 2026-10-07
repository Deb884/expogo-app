import type { Achievement, CalendarDay, StatSummary, VolumePoint } from './types';

/** Year/month used by the Training Calendar (the design shows a single month). */
export const CALENDAR_YEAR = 2026;
export const CALENDAR_MONTH = 9; // October, zero-indexed
export const CALENDAR_TODAY = 4;

/** Days in October 2026 that have a scheduled session. */
const workoutDays = [
  1, 2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 18, 19, 20, 22, 23, 25, 26, 27, 29, 30,
];

/** Days already finished — everything before today that was scheduled. */
const completedDays = [1, 2, 4];

/**
 * Builds a Monday-first month grid. Padded cells use `day: 0` so the row count
 * stays a multiple of seven regardless of viewport width.
 */
function buildMonth(
  year: number,
  monthIndex: number,
  today: number
): CalendarDay[] {
  const lead = (new Date(Date.UTC(year, monthIndex, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

  const pad = (): CalendarDay => ({
    day: 0,
    hasWorkout: false,
    completed: false,
    isToday: false,
  });

  const cells: CalendarDay[] = Array.from({ length: lead }, pad);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      hasWorkout: workoutDays.includes(day),
      completed: completedDays.includes(day),
      isToday: day === today,
    });
  }

  while (cells.length % 7 !== 0) cells.push(pad());

  return cells;
}

export const calendarDays: CalendarDay[] = buildMonth(
  CALENDAR_YEAR,
  CALENDAR_MONTH,
  CALENDAR_TODAY
);

export const calendarWeekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

export const calendarRangeLabels: Record<string, StatSummary[]> = {
  Week: [
    { label: 'Workouts', value: '4', hint: '+1 vs last week' },
    { label: 'Active time', value: '148m' },
    { label: 'Calories', value: '1,420' },
  ],
  Month: [
    { label: 'Workouts', value: '18', hint: '+4 vs last month' },
    { label: 'Active time', value: '612m' },
    { label: 'Calories', value: '5,870' },
  ],
  Year: [
    { label: 'Workouts', value: '164', hint: '+22% vs last year' },
    { label: 'Active time', value: '5,240m' },
    { label: 'Calories', value: '49,600' },
  ],
};

export type CalendarRange = keyof typeof calendarRangeLabels;

export const CALENDAR_RANGES: { value: CalendarRange; label: string }[] = [
  { value: 'Week', label: 'Week' },
  { value: 'Month', label: 'Month' },
  { value: 'Year', label: 'Year' },
];

/** Weekly training volume, Monday-first, `active` marking today. */
export const weeklyVolume: VolumePoint[] = [
  { label: 'Mon', value: 240 },
  { label: 'Tue', value: 310 },
  { label: 'Wed', value: 120 },
  { label: 'Thu', value: 180 },
  { label: 'Fri', value: 0, active: true },
  { label: 'Sat', value: 0 },
  { label: 'Sun', value: 0 },
];

/** Eight-week rolling volume used by the Progress tab root chart. */
export const monthlyVolume: VolumePoint[] = [
  { label: 'W1', value: 980 },
  { label: 'W2', value: 1240 },
  { label: 'W3', value: 1120 },
  { label: 'W4', value: 1480 },
  { label: 'W5', value: 1310 },
  { label: 'W6', value: 1620 },
  { label: 'W7', value: 1540 },
  { label: 'W8', value: 1780, active: true },
];

/** Headline numbers on the Progress tab root. */
export const progressHighlights: StatSummary[] = [
  { label: 'Workouts this month', value: '18' },
  { label: 'Active minutes', value: '612' },
  { label: 'Current streak', value: '9 days' },
  { label: 'Personal bests', value: '5' },
];

export const consistencyRate = 0.86;

/** Body measurements tracked on the Progress tab root. */
export const measurements = [
  { id: 'weight', label: 'Weight', value: '78.4 kg', delta: '-2.1 kg', icon: 'activity' },
  { id: 'chest', label: 'Chest', value: '104 cm', delta: '+2.4 cm', icon: 'maximize-2' },
  { id: 'waist', label: 'Waist', value: '82 cm', delta: '-3.5 cm', icon: 'trending-down' },
] as const;

export const achievements: Achievement[] = [
  {
    id: 'first-workout',
    title: 'First Steps',
    description: 'Complete your very first workout.',
    icon: 'flag',
    unlocked: true,
    unlockedLabel: 'Earned 12 Aug',
  },
  {
    id: 'streak-7',
    title: 'Seven Day Streak',
    description: 'Train seven days in a row.',
    icon: 'zap',
    unlocked: true,
    unlockedLabel: 'Earned 26 Aug',
  },
  {
    id: 'workouts-25',
    title: 'Quarter Century',
    description: 'Log twenty-five workouts.',
    icon: 'award',
    unlocked: true,
    unlockedLabel: 'Earned 30 Sep',
  },
  {
    id: 'streak-30',
    title: 'Thirty Day Streak',
    description: 'Train thirty days in a row.',
    icon: 'calendar',
    unlocked: false,
    progress: 0.3,
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Finish ten workouts after 8pm.',
    icon: 'moon',
    unlocked: false,
    progress: 0.7,
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Finish ten workouts before 7am.',
    icon: 'sunrise',
    unlocked: false,
    progress: 0.2,
  },
  {
    id: 'volume-10k',
    title: 'Volume Ten Thousand',
    description: 'Move 10,000 kg in total.',
    icon: 'trending-up',
    unlocked: true,
    unlockedLabel: 'Earned 4 Oct',
  },
  {
    id: 'perfect-week',
    title: 'Perfect Week',
    description: 'Hit every planned session in one week.',
    icon: 'check-circle',
    unlocked: false,
    progress: 0.6,
  },
];