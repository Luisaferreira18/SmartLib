import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../theme';

export default function Cover({ w = 56, h = 78, label = 'Livro', big }) {
  return (
    <View style={[styles.cover, { width: w, height: h }]}>
      <Text style={[styles.txt, big && { fontSize: 16 }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: { backgroundColor: C.accent, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  txt: { color: C.navy, fontWeight: '700', fontSize: 11 },
});
