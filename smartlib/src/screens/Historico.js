import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { C } from '../theme';
import { HIST } from '../data';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Badge from '../components/Badge';
import Cover from '../components/Cover';

export default function Historico({ nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Historico de emprestimos" onBack={nav.goBack} />
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        {HIST.map((b, i) => (
          <View key={i} style={styles.card}>
            <View style={{ flexDirection: 'row' }}>
              <Cover w={60} h={80} />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.title}>{b.t}</Text>
                <Text style={styles.author}>{b.a}</Text>
                <Text style={[styles.date, { marginTop: 10 }]}>Emprestimo: {b.emp}</Text>
                <Text style={styles.date}>Devolucao: {b.dev}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
              <Badge kind="neutral">Devolvido</Badge>
              <Text style={{ marginLeft: 12, color: C.accent, fontSize: 15 }}>★★★★★</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomNav active="emprestimos" nav={nav} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: C.navy },
  title: { fontSize: 15, fontWeight: '700', color: C.dark },
  author: { fontSize: 13, color: C.muted, marginTop: 2 },
  date: { fontSize: 13, color: C.muted, marginTop: 2 },
});
