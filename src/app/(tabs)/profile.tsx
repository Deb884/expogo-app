import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ListRow } from '@/components/ui/ListRow';
import { Photo } from '@/components/ui/Photo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatTile } from '@/components/ui/StatTile';
import { images } from '@/assets/photos';
import { goalOptions, profile, profileDetails, profileStats } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();

  const goal = goalOptions.find((option) => option.id === profile.goalId);
  const goalLabel = goal?.label ?? 'Build Strength';

  return (
    <Screen gap={spacing.lg}>
      {/* Identity */}
      <View style={styles.identity}>
        <Photo
          source={images[profile.avatar]}
          width={96}
          height={96}
          borderRadius={radius.pill}
          style={styles.avatar}
          accessibilityLabel={`${profile.firstName} ${profile.lastName}`}
        />

        <View style={styles.identityCopy}>
          <Text variant="h2" numberOfLines={1}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
            {profile.email}
          </Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text variant="caption" color={colors.accent}>
                {profile.level}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text variant="caption" color={colors.accent}>
                Since {profile.memberSince}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Text variant="body" color={colors.textSecondary}>
        {profile.bio}
      </Text>

      <View style={styles.actions}>
        <Button
          label="Edit Profile"
          width="half"
          icon={<Feather name="edit-2" size={18} color={colors.onAccent} />}
          onPress={() => router.push('/profile/edit')}
        />
        <Button
          label="My Goals"
          variant="secondary"
          width="half"
          icon={<Feather name="target" size={18} color={colors.textPrimary} />}
          onPress={() => router.push('/profile/goals')}
        />
      </View>

      {/* Lifetime stats */}
      <View style={styles.stats}>
        {profileStats.map((stat) => (
          <StatTile
            key={stat.id}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
          />
        ))}
      </View>

      {/* Goal */}
      <Card
        onPress={() => router.push('/profile/goals')}
        style={styles.goal}
        accessibilityLabel="My goals"
      >
        <View style={styles.goalIcon}>
          <Feather name="target" size={20} color={colors.accent} />
        </View>
        <View style={styles.goalCopy}>
          <Text variant="caption" color={colors.textSecondary}>
            Primary goal
          </Text>
          <Text variant="titleMd">{goalLabel}</Text>
        </View>
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      </Card>

      {/* Fitness details */}
      <View style={styles.section}>
        <SectionHeader title="Fitness Information" eyebrow="Details" />
        <Card flush style={styles.listCard}>
          {profileDetails.map((detail, index) => (
            <ListRow
              key={detail.id}
              icon={detail.icon}
              title={detail.label}
              trailing={
                <Text variant="meta" color={colors.textSecondary}>
                  {detail.value}
                </Text>
              }
              hideChevron
              style={index === 0 ? undefined : styles.rowDivider}
            />
          ))}
        </Card>
      </View>

      {/* Settings + premium entry points */}
      <View style={styles.section}>
        <SectionHeader title="App" eyebrow="More" />
        <Card flush style={styles.listCard}>
          <ListRow
            icon="bell"
            title="Notifications"
            onPress={() => router.push('/settings/notifications')}
            style={styles.rowDivider}
          />
          <ListRow
            icon="sliders"
            title="App Preferences"
            onPress={() => router.push('/settings/preferences')}
            style={styles.rowDivider}
          />
          <ListRow
            icon="settings"
            title="Settings"
            onPress={() => router.push('/settings')}
            style={styles.rowDivider}
          />
          <ListRow
            icon="box"
            title="Inventory Database"
            subtitle="Manage products and stock"
            onPress={() => router.push('/inventory')}
            style={styles.rowDivider}
          />
          <ListRow
            icon="star"
            title="DIV Premium"
            subtitle="Advanced plans and coaching"
            onPress={() => router.push('/premium')}
          />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  avatar: { width: 96 },
  identityCopy: { flex: 1, gap: 4 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  badge: {
    paddingHorizontal: 10,
    height: 24,
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  actions: { flexDirection: 'row', gap: spacing.sm },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  goal: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalCopy: { flex: 1, gap: 2 },
  section: { gap: spacing.md },
  listCard: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
});