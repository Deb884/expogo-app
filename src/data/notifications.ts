import type { AppNotification } from './types';

/** Inbox for Settings → Notifications. */
export const notifications: AppNotification[] = [
  {
    id: 'n-reminder',
    title: 'Lower Body Build is today',
    body: 'Six movements, about 38 minutes. Your plan is ready when you are.',
    time: '2 hours ago',
    icon: 'calendar',
    read: false,
  },
  {
    id: 'n-streak',
    title: 'Nine day streak',
    body: 'You are two sessions away from your personal best. Keep it going.',
    time: 'Yesterday',
    icon: 'zap',
    read: false,
  },
  {
    id: 'n-achievement',
    title: 'Volume Ten Thousand unlocked',
    body: 'You have moved 10,000 kg in total. That is a serious milestone.',
    time: '2 days ago',
    icon: 'award',
    read: true,
  },
  {
    id: 'n-rest',
    title: 'Recovery check-in',
    body: 'You trained hard this week. Consider a mobility session tomorrow.',
    time: '4 days ago',
    icon: 'heart',
    read: true,
  },
  {
    id: 'n-plan',
    title: 'Your plan has been updated',
    body: 'We added an extra lower-body session after your recent progress review.',
    time: '1 week ago',
    icon: 'refresh-cw',
    read: true,
  },
];

/** Toggleable notification categories on the Notifications settings screen. */
export const notificationSettings = [
  {
    id: 'workout-reminders',
    label: 'Workout reminders',
    detail: 'A nudge on your scheduled training days.',
    icon: 'bell',
    defaultValue: true,
  },
  {
    id: 'streak-alerts',
    label: 'Streak alerts',
    detail: 'Heads-up before your streak expires.',
    icon: 'zap',
    defaultValue: true,
  },
  {
    id: 'achievements',
    label: 'Achievements',
    detail: 'New badges and milestones.',
    icon: 'award',
    defaultValue: true,
  },
  {
    id: 'weekly-summary',
    label: 'Weekly summary',
    detail: 'Your progress recap every Sunday.',
    icon: 'bar-chart-2',
    defaultValue: false,
  },
  {
    id: 'tips',
    label: 'Tips & coaching',
    detail: 'Technique cues and recovery advice.',
    icon: 'info',
    defaultValue: false,
  },
  {
    id: 'sound',
    label: 'Sound & vibration',
    detail: 'Play sounds for timers and transitions.',
    icon: 'volume-2',
    defaultValue: true,
  },
] as const;

export type NotificationSettingId =
  (typeof notificationSettings)[number]['id'];