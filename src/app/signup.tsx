import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { ProgressBar } from '@/components/ui/Progress';
import { colors, spacing } from '@/constants/theme';

/** Rough strength read-out so the meter reflects what was typed. */
function score(s: string): { ratio: number; label: string; color: string } {
  if (!s) return { ratio: 0.08, label: 'Too short', color: colors.borderStrong };
  let score = 0;
  if (s.length >= 8) score += 1;
  if (s.length >= 12) score += 1;
  if (/[A-Z]/.test(s) && /[a-z]/.test(s)) score += 1;
  if (/\d/.test(s)) score += 1;
  if (/[^A-Za-z0-9]/.test(s)) score += 1;

  if (score <= 1) return { ratio: 0.25, label: 'Weak password', color: colors.danger };
  if (score <= 3) return { ratio: 0.55, label: 'Fair password', color: colors.accentPressed };
  if (score === 4) return { ratio: 0.8, label: 'Good password', color: colors.accent };
  return { ratio: 1, label: 'Strong password', color: colors.accentSoft };
}

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const strength = score(password);
  const mismatch = confirm.length > 0 && confirm !== password;

  // No real auth (spec §9).
  const goHome = () => router.replace('/home');

  return (
    <Screen
      keyboardAware
      gap={spacing.md}
      bottom={
        <View style={styles.footer}>
          <Text variant="label" align="center">
            Already have an account?{' '}
            <Text
              variant="label"
              color={colors.accent}
              onPress={() => router.replace('/login')}
              suppressHighlighting
            >
              Log In
            </Text>
          </Text>
        </View>
      }
    >
      <Text variant="wordmarkMd">DIV</Text>
      <Text variant="h1">Create your account.</Text>

      <TextField
        label="Full Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
      />

      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />

      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secure}
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        placeholder="••••••••••••"
        action={
          <Feather
            name={secure ? 'eye-off' : 'eye'}
            size={20}
            color={colors.textSecondary}
          />
        }
        onPressAction={() => setSecure((s) => !s)}
      />

      {/* Figma "Password strength": track + completion + label */}
      <View style={styles.strength}>
        <ProgressBar progress={strength.ratio} fillColor={strength.color} />
        <Text variant="caption" color={strength.color}>
          {strength.label}
        </Text>
      </View>

      <TextField
        label="Confirm Password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry={secureConfirm}
        autoCapitalize="none"
        autoComplete="new-password"
        placeholder="••••••••••••"
        error={mismatch ? 'Passwords do not match' : undefined}
        action={
          <Feather
            name={secureConfirm ? 'eye-off' : 'eye'}
            size={20}
            color={colors.textSecondary}
          />
        }
        onPressAction={() => setSecureConfirm((s) => !s)}
      />

      <Button label="Create Account" onPress={goHome} testID="signup-submit" style={styles.cta} />

      <Text variant="caption" align="center">
        By joining, you agree to our Terms of Service and Privacy Policy.
      </Text>

      <View style={styles.social}>
        <Button
          label="Google"
          variant="secondary"
          width="half"
          onPress={goHome}
          icon={<Feather name="circle" size={20} color={colors.textPrimary} />}
        />
        <Button
          label="Apple"
          variant="secondary"
          width="half"
          onPress={goHome}
          icon={<Feather name="circle" size={20} color={colors.textPrimary} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  strength: { gap: 8 },
  cta: { marginTop: spacing.xs },
  social: { flexDirection: 'row', gap: 8 },
  footer: { paddingTop: spacing.md },
});
