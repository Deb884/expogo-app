import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { ListRow } from '@/components/ui/ListRow';
import { Photo } from '@/components/ui/Photo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { images } from '@/assets/photos';
import { profile } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <Screen gap={spacing.lg} topBar={<TopAppBar title="Settings" onBack={() => router.back()} />}>
      <Card
        onPress={() => router.push('/profile/edit')}
        style={styles.account}
        accessibilityLabel="Edit profile"
      >
        <Photo
          source={images.profileAvatar}
          width={52}
          height={52}
          borderRadius={radius.pill}
          style={styles.avatar}
          accessibilityLabel={`${profile.firstName} ${profile.lastName}`}
        />
        <View style={styles.accountCopy}>
          <Text variant="titleMd" numberOfLines={1}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
            {profile.email}
          </Text>
        </View>
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      </Card>

      <View style={styles.section}>
        <SectionHeader title="Preferences" eyebrow="App" />
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
            subtitle="Units, week start, reminders"
            onPress={() => router.push('/settings/preferences')}
            style={styles.rowDivider}
          />
          <ListRow
            icon="lock"
            title="Privacy"
            subtitle="Your data stays on this device"
          />
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Support" eyebrow="Help" />
        <Card flush style={styles.listCard}>
          <ListRow
            icon="help-circle"
            title="Help & Support"
            onPress={() => router.push('/settings/help')}
            style={styles.rowDivider}
          />
          <ListRow
            icon="info"
            title="About DIV"
            onPress={() => router.push('/settings/about')}
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

      <View style={styles.section}>
        <SectionHeader title="Account" eyebrow="Danger zone" />
        <Card flush style={styles.listCard}>
          <ListRow
            icon="log-out"
            title="Sign Out"
            tone="danger"
            onPress={() => router.replace('/login')}
            style={styles.rowDivider}
          />
          <ListRow
            icon="trash-2"
            title="Delete Account"
            subtitle="Permanently removes your data"
            tone="danger"
            onPress={() => router.replace('/splash')}
          />
        </Card>
      </View>

      <Text variant="caption" color={colors.textSecondary} align="center">
        DIV · Version 1.0.0
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  account: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 52 },
  accountCopy: { flex: 1, gap: 2 },
  section: { gap: spacing.md },
  listCard: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
});