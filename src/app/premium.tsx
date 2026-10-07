import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Photo } from '@/components/ui/Photo';
import { Glow } from '@/components/ui/Glow';
import { ListRow } from '@/components/ui/ListRow';
import { images } from '@/assets/photos';
import { colors, radius, spacing } from '@/constants/theme';

const PLANS = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: '$9.99',
    period: 'per month',
    highlight: false,
  },
  {
    id: 'annual',
    label: 'Annual',
    price: '$79.99',
    period: 'per year',
    highlight: true,
  },
] as const;

const FEATURES = [
  {
    id: 'plans',
    title: 'Unlimited custom plans',
    detail: 'Regenerate your split as often as you like, with no waiting.',
    icon: 'calendar' as const,
  },
  {
    id: 'coaching',
    title: 'Form coaching',
    detail: 'Video cues and tempo guidance on every movement.',
    icon: 'video' as const,
  },
  {
    id: 'analytics',
    title: 'Advanced analytics',
    detail: 'Volume, e1RM and plate-level tracking across all history.',
    icon: 'bar-chart-2' as const,
  },
  {
    id: 'nutrition',
    title: 'Nutrition targets',
    detail: 'Calorie and macro guidance that adapts to your goal.',
    icon: 'pie-chart' as const,
  },
  {
    id: 'offline',
    title: 'Everything offline',
    detail: 'Full access with no connection required.',
    icon: 'download' as const,
  },
];

export default function PremiumScreen() {
  const router = useRouter();
  const [plan, setPlan] = useState<string>('annual');

  const selected = PLANS.find((option) => option.id === plan) ?? PLANS[1];

  return (
    <Screen
      gap={spacing.lg}
      topBar={<TopAppBar title="DIV Premium" onBack={() => router.back()} />}
      bottom={
        <Button
          label={`Start ${selected.label.toLowerCase()} · ${selected.price}`}
          onPress={() => router.back()}
          icon={<Feather name="zap" size={18} color={colors.onAccent} />}
          testID="premium-subscribe"
        />
      }
    >
      <View style={styles.hero}>
        <Glow height={200} opacity={0.3} />
        <Photo
          source={images.premiumHero}
          width={342}
          height={200}
          borderRadius={radius.card}
          accessibilityLabel="Premium artwork"
        />
      </View>

      <View style={styles.copy}>
        <Text variant="h1" align="center">
          Train without limits
        </Text>
        <Text variant="bodyCenter">
          Everything in DIV, plus the planning and coaching tools that turn a
          schedule into real progress.
        </Text>
      </View>

      {/* Plans */}
      <View style={styles.plans}>
        {PLANS.map((option) => {
          const active = option.id === plan;

          return (
            <Card
              key={option.id}
              variant="selectable"
              selected={active}
              onPress={() => setPlan(option.id)}
              style={styles.plan}
              accessibilityLabel={`${option.label}, ${option.price} ${option.period}`}
              testID={`plan-${option.id}`}
            >
              {option.highlight ? (
                <View style={styles.saveBadge}>
                  <Text variant="caption" color={colors.onAccent}>
                    Save 33%
                  </Text>
                </View>
              ) : null}

              <Text variant="overline" color={active ? colors.accent : colors.textSecondary}>
                {option.label}
              </Text>
              <Text variant="h2">{option.price}</Text>
              <Text variant="caption" color={colors.textSecondary}>
                {option.period}
              </Text>
            </Card>
          );
        })}
      </View>

      {/* Feature list */}
      <View style={styles.section}>
        <Text variant="overline" color={colors.accent}>
          Included
        </Text>
        <Card flush style={styles.listCard}>
          {FEATURES.map((feature, index) => (
            <ListRow
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              subtitle={feature.detail}
              hideChevron
              trailing={
                <Feather name="check" size={18} color={colors.accent} />
              }
              style={index === 0 ? undefined : styles.rowDivider}
            />
          ))}
        </Card>
      </View>

      {/* Comparison */}
      <View style={styles.section}>
        <Text variant="overline" color={colors.accent}>
          Free vs Premium
        </Text>
        <Card flush style={styles.listCard}>
          <CompareRow label="Generated plans" free="1" premium="Unlimited" />
          <CompareRow
            label="Exercise library"
            free="All"
            premium="All"
            divider
          />
          <CompareRow label="Progress tracking" free="Basic" premium="Advanced" divider />
          <CompareRow label="Form coaching" free="—" premium="Included" divider />
          <CompareRow label="Nutrition targets" free="—" premium="Included" divider />
        </Card>
      </View>

      <View style={styles.tags}>
        <Chip label="Cancel anytime" icon="check" />
        <Chip label="7 day refund" icon="check" />
      </View>

      <Text variant="caption" color={colors.textSecondary} align="center">
        Subscriptions renew automatically. Manage or cancel from Settings → App
        Preferences at any time.
      </Text>
    </Screen>
  );
}

function CompareRow({
  label,
  free,
  premium,
  divider,
}: {
  label: string;
  free: string;
  premium: string;
  divider?: boolean;
}) {
  return (
    <View style={[styles.compare, divider && styles.rowDivider]}>
      <Text variant="body" color={colors.textSecondary} style={styles.compareLabel}>
        {label}
      </Text>
      <Text variant="meta" style={styles.compareFree}>
        {free}
      </Text>
      <Text variant="meta" color={colors.accent}>
        {premium}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center' },
  copy: { gap: spacing.sm, alignItems: 'center' },
  plans: { flexDirection: 'row', gap: spacing.sm },
  plan: { flex: 1, alignItems: 'center', gap: 2, paddingTop: 28 },
  saveBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    paddingHorizontal: 10,
    height: 24,
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
  section: { gap: spacing.md },
  listCard: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  compare: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: spacing.md,
  },
  compareLabel: { flex: 1 },
  compareFree: { width: 84, textAlign: 'right' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});