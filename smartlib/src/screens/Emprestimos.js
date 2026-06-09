import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';
import { ATIVOS } from '../data';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Badge from '../components/Badge';
import Cover from '../components/Cover';

export default function Emprestimos({ nav }) {
  const [tab, setTab] = useState('ativos');
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Meus Emprestimos" />
      <View style={styles.tabsRow}>
        <TouchableOpacity onPress={() => setTab('ativos')} style={styles.tabItem}>
          <Text style={[styles.tabTxt, tab === 'ativos' && styles.tabTxtOn]}>Ativos (3)</Text>
          {tab === 'ativos' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('historico')} style={styles.tabItem}>
          <Text style={styles.tabTxt}>Historico</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }}>
        {ATIVOS.map((b, i) => (
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
                <Text style={styles.date}>Devolucao: {b.dev}</Text>
              </View>
              <TouchableOpacity style={styles.renew}>
                <Text style={styles.renewTxt}>Renovar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomNav active="emprestimos" nav={nav} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsRow: { flexDirection: 'row', backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.line },
  tabItem: { paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center' },
  tabTxt: { fontSize: 14, color: C.muted },
  tabTxtOn: { color: C.navy, fontWeight: '700' },
  tabUnderline: { height: 3, backgroundColor: C.accent, width: '100%', marginTop: 8, borderRadius: 2 },
  card: { backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 14 },
  title: { fontSize: 15, fontWeight: '700', color: C.dark },
  author: { fontSize: 13, color: C.muted, marginTop: 2 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  date: { fontSize: 13, color: C.muted, marginTop: 2 },
  renew: { backgroundColor: C.navy, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 9 },
  renewTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
