import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { Photo } from '@/components/ui/Photo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatTile } from '@/components/ui/StatTile';
import { WorkoutCard } from '@/components/workouts/WorkoutCard';
import { PlanWeekStrip } from '@/components/workouts/PlanWeekStrip';
import { images } from '@/assets/photos';
import { profile, planWeek, todayPlan, workouts } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  const recommended = workouts.slice(0, 4);

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <View style={styles.header}>
          <Photo
            source={images[profile.avatar]}
            width={48}
            height={48}
            borderRadius={radius.pill}
            style={styles.avatar}
            accessibilityLabel={`${profile.firstName} ${profile.lastName}`}
          />

          <View style={styles.greeting}>
            <Text variant="caption" color={colors.textSecondary}>
              Good morning
            </Text>
            <Text variant="titleMd" numberOfLines={1}>
              {profile.firstName} {profile.lastName}
            </Text>
          </View>

          <IconButton
            name="bell"
            accessibilityLabel="Notifications"
            onPress={() => router.push('/settings/notifications')}
          />
        </View>
      }
    >
      {/* Hero banner — today's session, image-fill with a legibility scrim. */}
      <View style={styles.hero}>
        <Photo
          source={images.homeHero}
          width={342}
          height={260}
          borderRadius={0}
          accessibilityLabel="Today's workout"
        />
        <LinearGradient
          colors={['rgba(2,3,1,0)', 'rgba(2,3,1,0.92)']}
          locations={[0.35, 1]}
          style={styles.heroScrim}
        />
        <View style={styles.heroBody}>
          <View style={styles.heroCopy}>
            <Text variant="overline" color={colors.accent}>
              Today · {todayPlan.durationMin} min
            </Text>
            <Text variant="h3" numberOfLines={2}>
              {todayPlan.title}
            </Text>
            <Text variant="meta" numberOfLines={1}>
              {todayPlan.focus}
            </Text>
          </View>

          <Button
            label="Start Workout"
            onPress={() => router.push('/session/active')}
            icon={<Feather name="play" size={18} color={colors.onAccent} />}
            style={styles.heroButton}
            testID="home-start-workout"
          />
        </View>
      </View>

      {/* Headline numbers */}
      <View style={styles.stats}>
        <StatTile value={`${profile.stats.currentStreak}`} label="Day streak" icon="zap" />
        <StatTile value={`${profile.stats.workoutsCompleted}`} label="Workouts" icon="activity" />
        <StatTile value="5,240" label="Active minutes" icon="clock" />
      </View>

      {/* This week */}
      <View style={styles.section}>
        <SectionHeader
          title="This Week"
          action="Full plan"
          onAction={() => router.push('/workouts')}
        />
        <PlanWeekStrip
          week={planWeek}
          onSelect={(day) => router.push('/workouts')}
        />
      </View>

      {/* Recommended */}
      <View style={styles.section}>
        <SectionHeader
          title="Recommended"
          eyebrow="For you"
          action="Library"
          onAction={() => router.push('/workouts/library')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rail}
        >
          {recommended.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              width={248}
              onPress={() => router.push(`/workouts/detail?id=${workout.id}`)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Quick links into the rest of the plan */}
      <Card
        onPress={() => router.push('/personalization/goal')}
        style={styles.cta}
        accessibilityLabel="Regenerate my plan"
      >
        <View style={styles.ctaIcon}>
          <Feather name="sliders" size={20} color={colors.accent} />
        </View>
        <View style={styles.ctaCopy}>
          <Text variant="titleMd">Tune my plan</Text>
          <Text variant="caption" color={colors.textSecondary} numberOfLines={2}>
            Adjust your goal, level, equipment or schedule at any time.
          </Text>
        </View>
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  avatar: { width: 48 },
  greeting: { flex: 1, gap: 2 },

  hero: {
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  heroScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroBody: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.md,
    gap: spacing.md,
  },
  heroCopy: { gap: 4 },
  heroButton: { alignSelf: 'flex-start' },

  stats: { flexDirection: 'row', gap: spacing.sm },

  section: { gap: spacing.md },

  rail: { gap: spacing.md, paddingRight: spacing.lg },

  cta: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  ctaIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaCopy: { flex: 1, gap: 2 },
});