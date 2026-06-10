import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { C } from '../theme';

export function PrimaryButton({ children, onPress, style, disabled, accessibilityLabel }) {
  return (
    <TouchableOpacity
      style={[styles.primary, style, disabled && styles.disabled]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.8}
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={[styles.primaryTxt, disabled && { opacity: 0.7 }]}>{children}</Text>
    </TouchableOpacity>
  );
}

export function GhostButton({ children, onPress, style, accessibilityLabel }) {
  return (
    <TouchableOpacity style={[styles.ghost, style]} onPress={onPress} activeOpacity={0.7} accessibilityLabel={accessibilityLabel}>
      <Text style={styles.ghostTxt}>{children}</Text>
    </TouchableOpacity>
  );
}

export function AccentButton({ children, onPress, style, accessibilityLabel }) {
  return (
    <TouchableOpacity style={[styles.accent, style]} onPress={onPress} activeOpacity={0.8} accessibilityLabel={accessibilityLabel}>
      <Text style={styles.accentTxt}>{children}</Text>
    </TouchableOpacity>
  );
}

export function TextButton({ children, onPress, style, accessibilityLabel }) {
  return (
    <TouchableOpacity style={[styles.text, style]} onPress={onPress} activeOpacity={0.7} accessibilityLabel={accessibilityLabel}>
      <Text style={styles.textTxt}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disabled: { opacity: 0.55 },
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
