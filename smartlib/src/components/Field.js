import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { C } from '../theme';

export default function Field({
  label,
  placeholder,
  value,
  onChangeText,
  secure,
  keyboardType,
  accessibilityLabel,
}) {
  const [internal, setInternal] = useState(value || '');
  const controlled = onChangeText !== undefined;
  return (
    <View style={{ marginBottom: 18 }}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={C.muted}
        value={controlled ? value : internal}
        onChangeText={controlled ? onChangeText : setInternal}
        secureTextEntry={!!secure}
        keyboardType={keyboardType || 'default'}
        autoCapitalize="none"
        accessibilityLabel={accessibilityLabel || label || placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '700', color: C.dark, marginBottom: 8 },
  input: {
    backgroundColor: C.bg,
    borderRadius: 10,
    height: 46,
    paddingHorizontal: 16,
    fontSize: 14,
    color: C.dark,
  },
});
