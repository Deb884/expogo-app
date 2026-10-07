import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/constants/theme';
import { profile } from '@/data';

export default function PersonalInformationScreen() {
  const router = useRouter();

  const [age, setAge] = useState('28');
  const [height, setHeight] = useState(String(profile.heightCm));
  const [weight, setWeight] = useState(String(profile.weightKg));
  const [sex, setSex] = useState<string[]>([]);

  const toggleSex = (id: string) =>
    setSex((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const ageNum = Number(age);
  const ageInvalid =
    !Number.isInteger(ageNum) || ageNum < 13 || ageNum > 100;

  return (
    <Screen
      keyboardAware
      gap={spacing.lg}
      topBar={
        <TopAppBar
          title="About You"
          onBack={() => router.back()}
        />
      }
      bottom={
        <View style={styles.actions}>
          <Button
            label="Back"
            variant="secondary"
            width="half"
            onPress={() => router.back()}
          />
          <Button
            label="Continue"
            width="half"
            disabled={ageInvalid}
            onPress={() => router.push('/personalization/level')}
            testID="info-next"
          />
        </View>
      }
    >
      <View style={styles.copy}>
        <Text variant="overline" color={colors.accent}>
          Step 2 of 6
        </Text>
        <Text variant="h1">Tell us about you</Text>
        <Text variant="body" color={colors.textSecondary}>
          These numbers let us scale volume and intensity to your body.
        </Text>
      </View>

      <View style={styles.fields}>
        <TextField
          label="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          error={ageInvalid ? 'Enter an age between 13 and 100' : undefined}
        />

        <View style={styles.pair}>
          <TextField
            label="Height (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="number-pad"
            containerStyle={styles.pairItem}
          />
          <TextField
            label="Weight (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            containerStyle={styles.pairItem}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="titleMd">Sex</Text>
        <Text variant="caption" color={colors.textSecondary}>
          Used for calorie estimates only. Optional.
        </Text>

        <View style={styles.pills}>
          {[
            { id: 'female', label: 'Female' },
            { id: 'male', label: 'Male' },
            { id: 'other', label: 'Prefer not to say' },
          ].map((option) => {
            const active = sex.includes(option.id);

            return (
              <Card
                key={option.id}
                variant="selectable"
                selected={active}
                onPress={() => toggleSex(option.id)}
                style={styles.pill}
                accessibilityLabel={option.label}
                testID={`sex-${option.id}`}
              >
                <Text
                  variant="meta"
                  color={active ? colors.accent : colors.textSecondary}
                >
                  {option.label}
                </Text>
              </Card>
            );
          })}
        </View>
      </View>

      <Card style={styles.privacy}>
        <Feather name="lock" size={16} color={colors.textSecondary} />
        <Text variant="caption" color={colors.textSecondary} style={styles.privacyCopy}>
          Everything you enter stays on this device. DIV has no servers.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: { gap: spacing.sm },
  fields: { gap: spacing.md },
  pair: { flexDirection: 'row', gap: spacing.sm },
  pairItem: { flex: 1 },
  section: { gap: spacing.sm },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  pill: { paddingHorizontal: spacing.md, paddingVertical: 10 },
  privacy: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  privacyCopy: { flex: 1 },
  actions: { flexDirection: 'row', gap: spacing.sm },
});