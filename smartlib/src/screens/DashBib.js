import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

const STATS = [
  { v: '1.248', l: 'Livros cadastrados', tint: C.blueT },
  { v: '56', l: 'Emprestimos ativos', tint: C.greenT },
  { v: '8', l: 'Atrasos', tint: '#fee2e2' },
  { v: '320', l: 'Usuarios ativos', tint: C.purpleT },
];

const ACOES = [
  { t: 'Cadastrar livro', color: C.navy, to: 'cadastro' },
  { t: 'Registrar emprestimo', color: '#2eb86b', to: 'registrar' },
  { t: 'Registrar devolucao', color: '#ff8c1a', to: null },
];

export default function DashBib({ nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Biblioteca do Bairro" right="☰" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={styles.hi}>Ola, Carlos!</Text>
        <Text style={styles.sub}>Biblioteca do Bairro</Text>
        <View style={styles.grid}>
          {STATS.map((s, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: s.tint }]}>
              <Text style={styles.statValue}>{s.v}</Text>
              <Text style={styles.statLabel}>{s.l}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.section}>Acoes rapidas</Text>
        {ACOES.map((a, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.action, { backgroundColor: a.color }]}
            onPress={() => a.to && nav.navigate(a.to)}
          >
            <Text style={styles.actionTxt}>{a.t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNav active="home" nav={nav} />
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  actionTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
