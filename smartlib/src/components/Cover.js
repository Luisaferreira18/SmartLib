import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../theme';

const PALETTES = [
  { bg: '#142145', spine: '#0e1830', txt: '#ffc721' },
  { bg: '#1a5276', spine: '#154360', txt: '#f9e79f' },
  { bg: '#1e8449', spine: '#186a3b', txt: '#d5f5e3' },
  { bg: '#784212', spine: '#6e2c00', txt: '#fdebd0' },
  { bg: '#4a235a', spine: '#3b1d4e', txt: '#e8daef' },
  { bg: '#1a252f', spine: '#17202a', txt: '#ffc721' },
  { bg: '#922b21', spine: '#7b241c', txt: '#fadbd8' },
];

function hashLabel(label) {
  let h = 0;
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0;
  return h % PALETTES.length;
}

export default function Cover({ w = 56, h = 78, label = 'Livro', big }) {
  const pal = PALETTES[hashLabel(label)];
  const spineW = Math.max(6, Math.round(w * 0.1));

  return (
    <View style={[styles.shadow, { width: w, height: h }]}>
      {/* lombo / spine */}
      <View style={[styles.spine, { width: spineW, height: h, backgroundColor: pal.spine }]} />
      {/* capa principal */}
      <View style={[styles.cover, { flex: 1, height: h, backgroundColor: pal.bg }]}>
        {/* linha decorativa */}
        <View style={[styles.stripe, { backgroundColor: pal.spine }]} />
        <Text
          style={[styles.txt, big && styles.txtBig, { color: pal.txt }]}
          numberOfLines={big ? 4 : 2}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 3 },
  },
  spine: {},
  cover: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 8,
    position: 'relative',
  },
  stripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    opacity: 0.6,
  },
  txt: { fontWeight: '700', fontSize: 11, textAlign: 'center', lineHeight: 14 },
  txtBig: { fontSize: 14, lineHeight: 18 },
});
