import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { C } from '../theme';

export function PrimaryButton({ children, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.primary, style]} onPress={onPress}>
      <Text style={styles.primaryTxt}>{children}</Text>
    </TouchableOpacity>
  );
}

export function GhostButton({ children, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.ghost, style]} onPress={onPress}>
      <Text style={styles.ghostTxt}>{children}</Text>
    </TouchableOpacity>
  );
}

export function AccentButton({ children, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.accent, style]} onPress={onPress}>
      <Text style={styles.accentTxt}>{children}</Text>
    </TouchableOpacity>
  );
}

export function TextButton({ children, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.text, style]} onPress={onPress}>
      <Text style={styles.textTxt}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: C.navy,
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  primaryTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
  ghost: {
    backgroundColor: C.bg,
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  ghostTxt: { color: C.navy, fontWeight: '700', fontSize: 16 },
  accent: {
    backgroundColor: C.accent,
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  accentTxt: { color: C.navy, fontWeight: '700', fontSize: 16 },
  text: { height: 44, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  textTxt: { color: C.muted, fontWeight: '600', fontSize: 15 },
});
