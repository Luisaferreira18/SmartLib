import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { C } from '../theme';
import { CATALOGO } from '../data';
import BottomNav from '../components/BottomNav';
import Badge from '../components/Badge';
import Cover from '../components/Cover';

const FILTROS = ['Todos', 'Disponivel', 'Poucas unidades', 'Indisponivel'];

export default function Catalogo({ nav, user }) {
  const [filtro, setFiltro] = useState('Todos');
  const [busca, setBusca] = useState('');

  const lista = CATALOGO.filter((b) => {
    const termo = busca.trim().toLowerCase();
    const matchBusca =
      termo === '' ||
      b.t.toLowerCase().includes(termo) ||
      b.a.toLowerCase().includes(termo);
    if (!matchBusca) return false;
    if (filtro === 'Todos') return true;
    if (filtro === 'Disponivel') return b.k === 'ok';
    if (filtro === 'Poucas unidades') return b.k === 'warn';
    if (filtro === 'Indisponivel') return b.k === 'neutral';
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar livros, autores..."
          placeholderTextColor={C.muted}
          value={busca}
          onChangeText={setBusca}
          accessibilityLabel="Buscar livros"
          autoCapitalize="none"
          returnKeyType="search"
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')} accessibilityLabel="Limpar busca">
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.chipRow}>
        {FILTROS.map((x) => {
          const on = filtro === x;
          return (
            <TouchableOpacity
              key={x}
              onPress={() => setFiltro(x)}
              style={[styles.chip, on && styles.chipOn]}
              accessibilityLabel={x}
            >
              <Text style={[styles.chipTxt, on && { color: '#fff' }]}>{x}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        {lista.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyTitle}>Nenhum livro encontrado</Text>
            <Text style={styles.emptyDesc}>Tente outros termos ou remova os filtros.</Text>
          </View>
        ) : (
          lista.map((b, i) => (
            <TouchableOpacity
              key={i}
              style={styles.row}
              onPress={() => nav.navigate('detalhe', { book: b })}
              accessibilityLabel={b.t}
              activeOpacity={0.75}
            >
              <Cover />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.title}>{b.t}</Text>
                <Text style={styles.author}>{b.a}</Text>
                <Badge kind={b.k}>{b.s}</Badge>
              </View>
              <Text style={styles.chev}>›</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <BottomNav active="buscar" nav={nav} role="usuario" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: C.card,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  searchIcon: { fontSize: 18, color: C.muted, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: C.dark },
  clearBtn: { fontSize: 14, color: C.muted, paddingHorizontal: 8 },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  chip: {
    backgroundColor: C.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: C.line,
    marginRight: 8,
    marginBottom: 8,
  },
  chipOn: { backgroundColor: C.navy, borderColor: C.navy },
  chipTxt: { fontSize: 12, color: C.muted },
  row: {
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 15, fontWeight: '700', color: C.dark },
  author: { fontSize: 13, color: C.muted, marginTop: 2, marginBottom: 8 },
  chev: { fontSize: 22, color: C.muted, marginLeft: 8 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: C.dark },
  emptyDesc: { fontSize: 13, color: C.muted, marginTop: 6, textAlign: 'center' },
});
