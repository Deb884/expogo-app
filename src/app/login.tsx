import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Checkbox } from '@/components/ui/Checkbox';
import { colors, spacing } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [secure, setSecure] = useState(true);

  // No real auth (spec §9) — both CTAs land on the dashboard.
  const goHome = () => router.replace('/home');

  return (
    <Screen
      keyboardAware
      gap={spacing.lg}
      bottom={
        <View style={styles.footer}>
          <Text variant="label" align="center">
            Don’t have an account?{' '}
            <Text
              variant="label"
              color={colors.accent}
              onPress={() => router.push('/signup')}
              suppressHighlighting
            >
              Sign Up
            </Text>
          </Text>
        </View>
      }
    >
      <Text variant="wordmarkLg">DIV</Text>

      <View style={styles.welcome}>
        <Text variant="h1">Welcome back.</Text>
        <Text variant="body" color={colors.textSecondary}>
          Continue your journey.
        </Text>
      </View>

      <View style={styles.fields}>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          action={<Feather name="mail" size={20} color={colors.textSecondary} />}
        />

        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secure}
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
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
      </View>

      <View style={styles.preferences}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: remember }}
          accessibilityLabel="Remember me"
          onPress={() => setRemember((r) => !r)}
          style={styles.remember}
          hitSlop={6}
        >
          <Checkbox checked={remember} onToggle={() => setRemember((r) => !r)} label="Remember me" />
          <Text variant="meta" color={colors.textPrimary}>
            Remember me
          </Text>
        </Pressable>

        <Text
          variant="meta"
          color={colors.accent}
          onPress={() => router.push('/forgot-password')}
          suppressHighlighting
        >
          Forgot password?
        </Text>
      </View>

      <Button label="Log In" onPress={goHome} testID="login-submit" />

      <View style={styles.divider}>
        <Text variant="overline" align="center">
          OR
        </Text>
      </View>

      <View style={styles.social}>
        <Button
          label="Continue with Google"
          variant="secondary"
          onPress={goHome}
          icon={<Feather name="circle" size={20} color={colors.textPrimary} />}
        />
        <Button
          label="Continue with Apple"
          variant="secondary"
          onPress={goHome}
          icon={<Feather name="circle" size={20} color={colors.textPrimary} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  welcome: { gap: 8 },
  fields: { gap: spacing.md },
  preferences: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  remember: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  divider: { marginVertical: spacing.xs },
  social: { gap: 8 },
  footer: { paddingTop: spacing.md },
});
