import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C, SHADOW } from '../theme';
import BottomNav from '../components/BottomNav';

const CARDS = [
  { t: 'Livros disponiveis', d: 'Explore o catalogo completo.', tint: C.blueT, to: 'catalogo' },
  { t: 'Meus emprestimos', d: 'Acompanhe seus emprestimos.', tint: C.greenT, to: 'emprestimos' },
  { t: 'Recomendacoes', d: 'Livros sugeridos para voce.', tint: C.yellowT, to: 'catalogo' },
  { t: 'Historico', d: 'Historico de leituras.', tint: C.purpleT, to: 'historico' },
];

export default function Home({ nav, user }) {
  const nome = user?.name || 'Leitor';
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hi}>Ola, {nome}</Text>
            <Text style={styles.q}>O que voce quer ler hoje?</Text>
          </View>
          <TouchableOpacity
            onPress={() => nav.navigate('notificacoes')}
            style={styles.bellWrap}
            accessibilityLabel="Notificacoes"
            activeOpacity={0.7}
          >
            <Text style={styles.bellIcon}>🔔</Text>
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeTxt}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.searchPill, SHADOW.sm]}
        onPress={() => nav.navigate('catalogo')}
        activeOpacity={0.7}
        accessibilityLabel="Buscar livros"
      >
        <Text style={styles.searchTxt}>⌕  Buscar livros, autores...</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 8, paddingBottom: 100 }}>
        {CARDS.map((c, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.card, SHADOW.sm]}
            onPress={() => nav.navigate(c.to)}
            activeOpacity={0.75}
            accessibilityLabel={c.t}
          >
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
      <BottomNav active="home" nav={nav} role="usuario" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: C.navy, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 34 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  hi: { color: '#fff', fontSize: 18, fontWeight: '700' },
  q: { color: C.subhead, fontSize: 13, marginTop: 6 },
  bellWrap: { position: 'relative', padding: 4 },
  bellIcon: { fontSize: 22 },
  bellBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: C.danger,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  bellBadgeTxt: { color: '#fff', fontSize: 9, fontWeight: '700' },
  searchPill: {
    backgroundColor: C.card,
    height: 42,
    marginHorizontal: 20,
    marginTop: -21,
    borderRadius: 22,
    justifyContent: 'center',
    paddingHorizontal: 18,
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
