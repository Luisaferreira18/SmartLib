import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';
import { CATALOGO } from '../data';
import BottomNav from '../components/BottomNav';
import Badge from '../components/Badge';
import Cover from '../components/Cover';

const FILTROS = ['Todos', 'Categorias', 'Autores', 'Mais emprestados'];

export default function Catalogo({ nav }) {
  const [f, setF] = useState('Todos');
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.search}>
        <Text style={styles.searchTxt}>⌕  Buscar livros...</Text>
      </View>
      <View style={styles.chipRow}>
        {FILTROS.map((x) => {
          const on = f === x;
          return (
            <TouchableOpacity key={x} onPress={() => setF(x)} style={[styles.chip, on && styles.chipOn]}>
              <Text style={[styles.chipTxt, on && { color: '#fff' }]}>{x}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        {CATALOGO.map((b, i) => (
          <TouchableOpacity key={i} style={styles.row} onPress={() => nav.navigate('detalhe', { book: b })}>
            <Cover />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.title}>{b.t}</Text>
              <Text style={styles.author}>{b.a}</Text>
              <Badge kind={b.k}>{b.s}</Badge>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNav active="buscar" nav={nav} />
    </View>
  );
}

const styles = StyleSheet.create({
  search: { backgroundColor: C.card, height: 56, justifyContent: 'center', paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: C.line },
  searchTxt: { color: C.muted, fontSize: 14 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 14, paddingVertical: 12 },
  chip: { backgroundColor: C.card, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, borderColor: C.line, marginRight: 8, marginBottom: 8 },
  chipOn: { backgroundColor: C.navy, borderColor: C.navy },
  chipTxt: { fontSize: 12, color: C.muted },
  row: { backgroundColor: C.card, borderRadius: 12, padding: 12, flexDirection: 'row', marginBottom: 12 },
  title: { fontSize: 15, fontWeight: '700', color: C.dark },
  author: { fontSize: 13, color: C.muted, marginTop: 2, marginBottom: 8 },
});
