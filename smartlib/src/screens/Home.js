import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';
import BottomNav from '../components/BottomNav';

const CARDS = [
  { t: 'Livros disponiveis', d: 'Explore o catalogo completo.', tint: C.blueT, to: 'catalogo' },
  { t: 'Meus emprestimos', d: 'Acompanhe seus emprestimos.', tint: C.greenT, to: 'emprestimos' },
  { t: 'Recomendacoes', d: 'Livros sugeridos para voce.', tint: C.yellowT, to: 'catalogo' },
  { t: 'Historico', d: 'Historico de leituras.', tint: C.purpleT, to: 'historico' },
];

export default function Home({ nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.header}>
        <Text style={styles.hi}>Ola, Mariana</Text>
        <Text style={styles.q}>O que voce quer ler hoje?</Text>
      </View>
      <View style={styles.searchPill}>
        <Text style={styles.searchTxt}>⌕  Buscar livros, autores...</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 8, paddingBottom: 100 }}>
        {CARDS.map((c, i) => (
          <TouchableOpacity key={i} style={styles.card} onPress={() => nav.navigate(c.to)}>
            <View style={styles.accent} />
            <View style={[styles.icon, { backgroundColor: c.tint }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{c.t}</Text>
              <Text style={styles.cardDesc}>{c.d}</Text>
            </View>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNav active="home" nav={nav} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: C.navy, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 34 },
  hi: { color: '#fff', fontSize: 18, fontWeight: '700' },
  q: { color: C.subhead, fontSize: 13, marginTop: 6 },
  searchPill: {
    backgroundColor: C.card,
    height: 42,
    marginHorizontal: 20,
    marginTop: -21,
    borderRadius: 22,
    justifyContent: 'center',
    paddingHorizontal: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchTxt: { color: C.muted, fontSize: 13 },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    height: 82,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  accent: { width: 5, height: 82, backgroundColor: C.navy },
  icon: { width: 46, height: 46, borderRadius: 10, marginHorizontal: 14 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.dark },
  cardDesc: { fontSize: 12, color: C.muted, marginTop: 4 },
  chev: { fontSize: 24, color: C.muted },
});
