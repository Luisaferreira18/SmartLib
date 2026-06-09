import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';

export default function Splash({ nav }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.splash} onPress={() => nav.replace('login')}>
      <View style={styles.circle}>
        <View style={styles.book}>
          <View style={styles.spine} />
        </View>
      </View>
      <Text style={styles.title}>SmartLib</Text>
      <Text style={styles.sub}>Biblioteca digital publica</Text>
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.hint}>toque para continuar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: C.navy2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  book: { width: 52, height: 62, borderRadius: 6, backgroundColor: C.accent, alignItems: 'flex-start' },
  spine: { width: 4, height: 42, backgroundColor: C.navy, marginTop: 10, marginLeft: 2 },
  title: { color: '#fff', fontSize: 34, fontWeight: '700', marginTop: 24 },
  sub: { color: C.muted, fontSize: 14, marginTop: 6 },
  dots: { flexDirection: 'row', position: 'absolute', bottom: 110 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#595973', marginHorizontal: 3 },
  dotActive: { width: 36, backgroundColor: C.accent },
  hint: { color: '#595973', fontSize: 11, position: 'absolute', bottom: 80 },
});
