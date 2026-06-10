import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C, SHADOW } from '../theme';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import BottomSheet from '../components/BottomSheet';

const STATS = [
  { v: '1.248', l: 'Livros cadastrados', tint: C.blueT },
  { v: '56', l: 'Emprestimos ativos', tint: C.greenT },
  { v: '8', l: 'Atrasos', tint: C.dangerT },
  { v: '320', l: 'Usuarios ativos', tint: C.purpleT },
];

const ACOES = [
  { t: 'Cadastrar livro', icon: '📖', color: C.navy, to: 'cadastro' },
  { t: 'Registrar emprestimo', icon: '📤', color: C.green, to: 'registrar' },
  { t: 'Registrar devolucao', icon: '📥', color: C.orange, to: 'devolucao' },
];

export default function DashBib({ nav, user }) {
  const nome = user?.name || 'Bibliotecario';
  const org = user?.org || 'Biblioteca';
  const [menuOpen, setMenuOpen] = useState(false);

  const MENU_OPTIONS = [
    { label: 'Cadastrar livro', icon: '📖', onPress: () => nav.navigate('cadastro') },
    { label: 'Registrar emprestimo', icon: '📤', onPress: () => nav.navigate('registrar') },
    { label: 'Registrar devolucao', icon: '📥', onPress: () => nav.navigate('devolucao') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title={org} right="☰" onRightPress={() => setMenuOpen(true)} bellCount={2} onBellPress={() => nav.navigate('notificacoes')} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={styles.hi}>Ola, {nome}!</Text>
        <Text style={styles.sub}>{org}</Text>
        <View style={styles.grid}>
          {STATS.map((s, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: s.tint }, SHADOW.sm]}>
              <Text style={styles.statValue}>{s.v}</Text>
              <Text style={styles.statLabel}>{s.l}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.section}>Acoes rapidas</Text>
        {ACOES.map((a, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.action, { backgroundColor: a.color }, SHADOW.sm]}
            onPress={() => nav.navigate(a.to)}
            accessibilityLabel={a.t}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>{a.icon}</Text>
            <Text style={styles.actionTxt}>{a.t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNav active="home" nav={nav} role="bibliotecario" />
      <BottomSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
        options={MENU_OPTIONS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hi: { fontSize: 20, fontWeight: '700', color: C.dark, marginTop: 6 },
  sub: { fontSize: 13, color: C.muted, marginTop: 2, marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { borderRadius: 14, width: '48%', padding: 14, marginBottom: 12 },
  statValue: { fontSize: 26, fontWeight: '700', color: C.dark },
  statLabel: { fontSize: 12, color: C.muted, marginTop: 6 },
  section: { fontSize: 15, fontWeight: '700', color: C.dark, marginTop: 10, marginBottom: 12 },
  action: {
    borderRadius: 12,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  actionIcon: { fontSize: 20, marginRight: 12 },
  actionTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
