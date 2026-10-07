import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ListRow } from '@/components/ui/ListRow';
import { Photo } from '@/components/ui/Photo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { images } from '@/assets/photos';
import { aboutRows } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

const LINKS = [
  {
    id: 'website',
    label: 'Website',
    detail: 'div.fit',
    url: 'https://div.fit',
    icon: 'globe' as const,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    detail: '@divtraining',
    url: 'https://instagram.com',
    icon: 'instagram' as const,
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    detail: 'How you may use DIV',
    url: 'https://div.fit/terms',
    icon: 'file-text' as const,
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    detail: 'Your data never leaves your device',
    url: 'https://div.fit/privacy',
    icon: 'shield' as const,
  },
];

const openUrl = (url: string) => {
  Linking.openURL(url).catch(() => {
    // Deep links are unavailable in some sandboxed environments; ignore.
  });
};

export default function AboutScreen() {
  const router = useRouter();

  return (
    <Screen
      gap={spacing.lg}
      topBar={<TopAppBar title="About DIV" onBack={() => router.back()} />}
    >
      <View style={styles.hero}>
        <Photo
          source={images.aboutHero}
          width={342}
          height={240}
          borderRadius={radius.card}
          accessibilityLabel="About DIV artwork"
        />
      </View>

      <View style={styles.copy}>
        <Text variant="h1" align="center">
          DIV
        </Text>
        <Text variant="bodyCenter">
          Training that fits around your life. Build a plan from your goal, level,
          equipment and schedule — then track it all in one place.
        </Text>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Version" eyebrow="Build info" />
        <Card flush style={styles.listCard}>
          {aboutRows.map((row, index) => (
            <ListRow
              key={row.id}
              title={row.label}
              trailing={
                <Text variant="meta" color={colors.textSecondary}>
                  {row.value}
                </Text>
              }
              hideChevron
              style={index === 0 ? undefined : styles.rowDivider}
            />
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Links" eyebrow="Legal & social" />
        <Card flush style={styles.listCard}>
          {LINKS.map((link, index) => (
            <ListRow
              key={link.id}
              icon={link.icon}
              title={link.label}
              subtitle={link.detail}
              onPress={() => openUrl(link.url)}
              style={index === 0 ? undefined : styles.rowDivider}
              testID={`about-${link.id}`}
            />
          ))}
        </Card>
      </View>

      <Card style={styles.madeIn}>
        <Feather name="heart" size={18} color={colors.accent} />
        <Text variant="caption" color={colors.textSecondary} style={styles.madeInCopy}>
          Designed and built for people who would rather train than browse. No
          accounts, no servers, no tracking.
        </Text>
      </Card>

      <Button
        label="Back to Settings"
        variant="secondary"
        onPress={() => router.back()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center' },
  copy: { gap: spacing.sm, alignItems: 'center' },
  section: { gap: spacing.md },
  listCard: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  madeIn: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  madeInCopy: { flex: 1 },
});