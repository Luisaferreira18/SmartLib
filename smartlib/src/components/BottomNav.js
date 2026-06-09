import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';

const ITEMS = [
  { key: 'home', label: 'Home', icon: '⌂', to: 'home' },
  { key: 'buscar', label: 'Buscar', icon: '⌕', to: 'catalogo' },
  { key: 'emprestimos', label: 'Emprestimos', icon: '≣', to: 'emprestimos' },
  { key: 'perfil', label: 'Perfil', icon: '☻', to: 'perfil' },
];

export default function BottomNav({ active, nav }) {
  return (
    <View style={styles.nav}>
      {ITEMS.map((it) => {
        const on = active === it.key;
        return (
          <TouchableOpacity key={it.key} style={styles.item} onPress={() => nav.reset(it.to)}>
            <Text style={[styles.icon, on && { color: C.accent }]}>{it.icon}</Text>
            <Text style={[styles.label, on && styles.labelOn]}>{it.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: C.card,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: C.line,
    paddingBottom: 6,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 20, color: C.muted, marginBottom: 2 },
  label: { fontSize: 10, color: C.muted },
  labelOn: { color: C.accent, fontWeight: '700' },
});
