import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../theme';

const NAV = {
  usuario: [
    { key: 'home', label: 'Home', icon: 'home-outline', iconOn: 'home', to: 'home' },
    { key: 'buscar', label: 'Buscar', icon: 'search-outline', iconOn: 'search', to: 'catalogo' },
    { key: 'emprestimos', label: 'Emprestimos', icon: 'list-outline', iconOn: 'list', to: 'emprestimos' },
    { key: 'perfil', label: 'Perfil', icon: 'person-outline', iconOn: 'person', to: 'perfil' },
  ],
  bibliotecario: [
    { key: 'home', label: 'Dashboard', icon: 'home-outline', iconOn: 'home', to: 'dashBib' },
    { key: 'cadastro', label: 'Cadastrar', icon: 'add-circle-outline', iconOn: 'add-circle', to: 'cadastro' },
    { key: 'registrar', label: 'Emprestar', icon: 'arrow-up-circle-outline', iconOn: 'arrow-up-circle', to: 'registrar' },
    { key: 'devolucao', label: 'Devolver', icon: 'arrow-down-circle-outline', iconOn: 'arrow-down-circle', to: 'devolucao' },
  ],
  gestor: [
    { key: 'home', label: 'Dashboard', icon: 'bar-chart-outline', iconOn: 'bar-chart', to: 'dashGer' },
    { key: 'perfil', label: 'Perfil', icon: 'person-outline', iconOn: 'person', to: 'perfil' },
  ],
};

export default function BottomNav({ active, nav, role = 'usuario' }) {
  const items = NAV[role] || NAV.usuario;
  return (
    <View style={styles.nav}>
      {items.map((it) => {
        const on = active === it.key;
        return (
          <TouchableOpacity
            key={it.key}
            style={styles.item}
            onPress={() => nav.reset(it.to)}
            accessibilityLabel={it.label}
            activeOpacity={0.7}
          >
            <Ionicons
              name={on ? it.iconOn : it.icon}
              size={22}
              color={on ? C.accent : C.muted}
            />
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
  label: { fontSize: 10, color: C.muted, marginTop: 2 },
  labelOn: { color: C.accent, fontWeight: '700' },
});
