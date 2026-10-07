import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { ListRow } from '@/components/ui/ListRow';
import { Toggle } from '@/components/ui/Toggle';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { notifications, notificationSettings } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function NotificationsSettingsScreen() {
  const router = useRouter();

  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      notificationSettings.map((setting) => [setting.id, setting.defaultValue])
    )
  );

  const [inbox, setInbox] = useState(notifications);

  const unread = inbox.filter((item) => !item.read).length;

  return (
    <Screen
      gap={spacing.lg}
      topBar={<TopAppBar title="Notifications" onBack={() => router.back()} />}
    >
      {/* Inbox */}
      <View style={styles.section}>
        <SectionHeader
          title="Recent"
          eyebrow={unread > 0 ? `${unread} unread` : 'All caught up'}
          action={inbox.length > 0 ? 'Clear' : undefined}
          onAction={() => setInbox([])}
        />

        {inbox.length === 0 ? (
          <EmptyState
            icon="bell-off"
            title="No notifications"
            body="You are all caught up. Workout reminders and milestones will show up here."
            testID="notifications-empty"
          />
        ) : (
          <View style={styles.list}>
            {inbox.map((item) => (
              <Card
                key={item.id}
                onPress={() =>
                  setInbox((prev) =>
                    prev.map((entry) =>
                      entry.id === item.id ? { ...entry, read: true } : entry
                    )
                  )
                }
                style={styles.item}
                testID={`notification-${item.id}`}
              >
                <View style={[styles.itemIcon, !item.read && styles.itemIconUnread]}>
                  <Feather name={item.icon} size={18} color={colors.accent} />
                </View>

                <View style={styles.itemCopy}>
                  <View style={styles.itemHead}>
                    <Text variant="titleMd" numberOfLines={1} style={styles.itemTitle}>
                      {item.title}
                    </Text>
                    {!item.read ? <View style={styles.unreadDot} /> : null}
                  </View>
                  <Text variant="caption" color={colors.textSecondary} numberOfLines={3}>
                    {item.body}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary}>
                    {item.time}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        )}
      </View>

      {/* Toggles */}
      <View style={styles.section}>
        <SectionHeader title="What you get" eyebrow="Categories" />
        <Card flush style={styles.listCard}>
          {notificationSettings.map((setting, index) => (
            <ListRow
              key={setting.id}
              icon={setting.icon}
              title={setting.label}
              subtitle={setting.detail}
              hideChevron
              trailing={
                <Toggle
                  value={toggles[setting.id] ?? false}
                  accessibilityLabel={setting.label}
                  onChange={(next) =>
                    setToggles((prev) => ({ ...prev, [setting.id]: next }))
                  }
                />
              }
              style={index === 0 ? undefined : styles.rowDivider}
            />
          ))}
        </Card>
      </View>

      {inbox.length > 0 ? (
        <Button
          label="Mark all as read"
          variant="secondary"
          onPress={() =>
            setInbox((prev) => prev.map((entry) => ({ ...entry, read: true })))
          }
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  list: { gap: spacing.sm },
  item: { flexDirection: 'row', gap: spacing.md },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIconUnread: { backgroundColor: colors.accentMuted, borderWidth: 1, borderColor: colors.accent },
  itemCopy: { flex: 1, gap: 3 },
  itemHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  itemTitle: { flex: 1 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
  listCard: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
});