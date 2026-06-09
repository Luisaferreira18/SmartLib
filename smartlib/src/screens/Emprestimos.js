import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { C } from '../theme';
import { ATIVOS, HIST } from '../data';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Badge from '../components/Badge';
import Cover from '../components/Cover';

function novaDataDevolucao() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

export default function Emprestimos({ nav, user }) {
  const [tab, setTab] = useState('ativos');
  const [renovados, setRenovados] = useState({});

  const handleRenovar = (idx, titulo) => {
    if (renovados[idx]) return;
    Alert.alert(
      'Renovar emprestimo',
      `Renovar "${titulo}" por mais 14 dias?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Renovar',
          onPress: () => {
            setRenovados((prev) => ({ ...prev, [idx]: novaDataDevolucao() }));
            Alert.alert('Renovado!', `Nova data de devolucao: ${novaDataDevolucao()}`);
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Meus Emprestimos" />
      <View style={styles.tabsRow}>
        <TouchableOpacity
          onPress={() => setTab('ativos')}
          style={styles.tabItem}
          accessibilityLabel="Emprestimos ativos"
        >
          <Text style={[styles.tabTxt, tab === 'ativos' && styles.tabTxtOn]}>
            Ativos ({ATIVOS.length})
          </Text>
          {tab === 'ativos' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('historico')}
          style={styles.tabItem}
          accessibilityLabel="Historico de emprestimos"
        >
          <Text style={[styles.tabTxt, tab === 'historico' && styles.tabTxtOn]}>
            Historico ({HIST.length})
          </Text>
          {tab === 'historico' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      {tab === 'ativos' ? (
        <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
          {ATIVOS.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📖</Text>
              <Text style={styles.emptyTitle}>Nenhum emprestimo ativo</Text>
              <Text style={styles.emptyDesc}>Explore o catalogo e reserve um livro.</Text>
            </View>
          ) : (
            ATIVOS.map((b, i) => (
              <View key={i} style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                  <Cover w={56} h={74} />
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={styles.title}>{b.t}</Text>
                    <Text style={styles.author}>{b.a}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                      <Badge kind={b.k}>{b.badge}</Badge>
                    </View>
                  </View>
                </View>
                <View style={styles.footer}>
                  <View>
                    <Text style={styles.date}>Emprestimo: {b.emp}</Text>
                    <Text style={styles.date}>
                      Devolucao: {renovados[i] ? renovados[i] : b.dev}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.renew, renovados[i] && styles.renewDone]}
                    onPress={() => handleRenovar(i, b.t)}
                    accessibilityLabel={renovados[i] ? 'Emprestimo renovado' : 'Renovar emprestimo'}
                  >
                    <Text style={styles.renewTxt}>{renovados[i] ? '✓ Renovado' : 'Renovar'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
          {HIST.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📚</Text>
              <Text style={styles.emptyTitle}>Historico vazio</Text>
              <Text style={styles.emptyDesc}>Seus emprestimos finalizados aparecerao aqui.</Text>
            </View>
          ) : (
            HIST.map((b, i) => (
              <View key={i} style={[styles.card, styles.cardHist]}>
                <View style={{ flexDirection: 'row' }}>
                  <Cover w={56} h={74} />
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={styles.title}>{b.t}</Text>
                    <Text style={styles.author}>{b.a}</Text>
                    <Text style={[styles.date, { marginTop: 8 }]}>Emprestimo: {b.emp}</Text>
                    <Text style={styles.date}>Devolucao: {b.dev}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <Badge kind="neutral">Devolvido</Badge>
                  <Text style={{ marginLeft: 12, color: C.accent, fontSize: 15 }}>★★★★★</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <BottomNav active="emprestimos" nav={nav} role="usuario" />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: C.card,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  tabItem: { paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center' },
  tabTxt: { fontSize: 14, color: C.muted },
  tabTxtOn: { color: C.navy, fontWeight: '700' },
  tabUnderline: { height: 3, backgroundColor: C.accent, width: '100%', marginTop: 8, borderRadius: 2 },
  card: { backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 14 },
  cardHist: { borderLeftWidth: 4, borderLeftColor: C.navy },
  title: { fontSize: 15, fontWeight: '700', color: C.dark },
  author: { fontSize: 13, color: C.muted, marginTop: 2 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  date: { fontSize: 13, color: C.muted, marginTop: 2 },
  renew: { backgroundColor: C.navy, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 9 },
  renewDone: { backgroundColor: '#2eb86b' },
  renewTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: C.dark },
  emptyDesc: { fontSize: 13, color: C.muted, marginTop: 6, textAlign: 'center' },
});
