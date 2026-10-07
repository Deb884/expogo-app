import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { colors, radius, layout, spacing } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('alex.morgan@email.com');

  return (
    <Screen
      keyboardAware
      topBar={<TopAppBar title="Reset password" onBack={() => router.back()} />}
      bottom={
        <View style={styles.actions}>
          <Button label="Send Reset Link" onPress={() => router.back()} />
          <Button label="Back to Log In" variant="secondary" onPress={() => router.replace('/login')} />
        </View>
      }
    >
      {/* Figma "Empty state": 112dp sunken tile + icon, then centered copy */}
      <View style={styles.state}>
        <View style={styles.tile}>
          <Feather name="key" size={48} color={colors.accent} />
        </View>
        <Text variant="h2Center">Forgot password?</Text>
        <Text variant="bodyCenter">
          Enter your email and we’ll send you a secure link to reset your password.
        </Text>
      </View>

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

      <Text variant="meta">
        Check your inbox and spam folder. The link is valid for 30 minutes.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  state: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  tile: {
    width: layout.illustration,
    height: layout.illustration,
    borderRadius: radius.illustration,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: { gap: 8 },
});
