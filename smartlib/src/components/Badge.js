import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BADGE } from '../theme';

export default function Badge({ kind = 'ok', children }) {
  const c = BADGE[kind] || BADGE.ok;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.txt, { color: c.fg }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  txt: { fontSize: 11, fontWeight: '600' },
});
