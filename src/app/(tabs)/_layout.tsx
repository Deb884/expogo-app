import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { BottomNav } from '@/components/navigation/BottomNav';

/**
 * Tab shell. The native/styled tab bar is disabled (`tabBar={() => null}`) and
 * replaced by the Figma `BottomNav`, which is rendered as a sibling so its
 * spacing and hairline match the design exactly.
 */
export default function TabsLayout() {
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Tabs
          tabBar={() => null}
          screenOptions={{ headerShown: false }}
        />
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#020301' },
  content: { flex: 1 },
});
