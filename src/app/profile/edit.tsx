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
import { Photo } from '@/components/ui/Photo';
import { IconButton } from '@/components/ui/IconButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { images } from '@/assets/photos';
import { profile } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function EditProfileScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [height, setHeight] = useState(String(profile.heightCm));
  const [weight, setWeight] = useState(String(profile.weightKg));

  const nameMissing = !firstName.trim() || !lastName.trim();
  const emailInvalid = !email.includes('@');

  return (
    <Screen
      keyboardAware
      gap={spacing.lg}
      topBar={
        <TopAppBar
          title="Edit Profile"
          onBack={() => router.back()}
          right={
            <IconButton
              name="camera"
              accessibilityLabel="Change profile photo"
              onPress={() => router.back()}
            />
          }
        />
      }
      bottom={
        <Button
          label="Save Changes"
          disabled={nameMissing || emailInvalid}
          onPress={() => router.back()}
          testID="edit-profile-save"
        />
      }
    >
      <View style={styles.identity}>
        <Photo
          source={images.editProfileAvatar}
          width={96}
          height={96}
          borderRadius={radius.pill}
          style={styles.avatar}
          accessibilityLabel="Profile photo"
        />
        <Card
          onPress={() => router.back()}
          style={styles.changePhoto}
          accessibilityLabel="Change profile photo"
        >
          <Feather name="camera" size={16} color={colors.accent} />
          <Text variant="meta" color={colors.accent}>
            Change photo
          </Text>
        </Card>
      </View>

      <View style={styles.fields}>
        <View style={styles.pair}>
          <TextField
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            containerStyle={styles.pairItem}
            autoCapitalize="words"
            textContentType="givenName"
            error={firstName.trim() ? undefined : 'Required'}
          />
          <TextField
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            containerStyle={styles.pairItem}
            autoCapitalize="words"
            textContentType="familyName"
            error={lastName.trim() ? undefined : 'Required'}
          />
        </View>

        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          error={emailInvalid ? 'Enter a valid email address' : undefined}
          action={<Feather name="mail" size={20} color={colors.textSecondary} />}
        />

        <TextField
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          style={styles.bio}
          placeholder="Tell us about your training"
        />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Body Metrics" eyebrow="Optional" />
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

      <Card style={styles.hint}>
        <Feather name="info" size={16} color={colors.textSecondary} />
        <Text variant="caption" color={colors.textSecondary} style={styles.hintCopy}>
          Metrics stay on this device and are only used to scale your plan.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: { alignItems: 'center', gap: spacing.md },
  avatar: { width: 96 },
  changePhoto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  fields: { gap: spacing.md },
  pair: { flexDirection: 'row', gap: spacing.sm },
  pairItem: { flex: 1 },
  bio: { minHeight: 88, textAlignVertical: 'top' },
  section: { gap: spacing.md },
  hint: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  hintCopy: { flex: 1 },
});