import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { PrimaryButton } from '../components/Button';

const STATS = [
  { v: '12.560', l: 'Emprestimos (total)', tint: C.blueT },
  { v: '5.421', l: 'Usuarios ativos', tint: C.greenT },
  { v: '18.230', l: 'Livros no sistema', tint: '#fee2e2' },
  { v: '32', l: 'Bibliotecas ativas', tint: C.yellowT },
];

const BARS = [
  { m: 'Jan', h: 0.67 },
  { m: 'Fev', h: 0.53 },
  { m: 'Mar', h: 0.86 },
  { m: 'Abr', h: 0.64 },
  { m: 'Mai', h: 1.0 },
  { m: 'Jun', h: 0.8 },
];

const CATS = [
  { l: 'Literatura (42%)', c: C.navy },
  { l: 'Infantil (25%)', c: C.accent },
  { l: 'Didaticos (20%)', c: '#3b82f6' },
  { l: 'Outros (15%)', c: '#9ca3af' },
];

export default function DashGer({ nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Dashboard Gerencial" right="☰" />
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 110 }}>
        <Text style={styles.hi}>Ola, Roberto!</Text>
        <Text style={styles.sub}>Fundacao Municipal de Cultura</Text>
        <View style={styles.grid}>
          {STATS.map((s, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: s.tint }]}>
              <Text style={styles.statValue}>{s.v}</Text>
              <Text style={styles.statLabel}>{s.l}</Text>
            </View>
          ))}
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.section}>Emprestimos por mes</Text>
          <View style={styles.chartArea}>
            {BARS.map((b) => (
              <View key={b.m} style={styles.barCol}>
                <View style={[styles.bar, { height: 90 * b.h }]} />
                <Text style={styles.barLabel}>{b.m}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.section}>Categorias mais populares</Text>
        <View style={styles.pieRow}>
          <View style={styles.donut} />
          <View style={{ flex: 1, marginLeft: 18 }}>
            {CATS.map((c) => (
              <View key={c.l} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: c.c }]} />
                <Text style={styles.legendTxt}>{c.l}</Text>
              </View>
            ))}
          </View>
        </View>

        <PrimaryButton style={{ marginTop: 24 }}>Exportar relatorio</PrimaryButton>
      </ScrollView>
      <BottomNav active="home" nav={nav} />
    </View>
  );
}

const styles = StyleSheet.create({
  hi: { fontSize: 20, fontWeight: '700', color: C.dark, marginTop: 6 },
  sub: { fontSize: 13, color: C.muted, marginTop: 2, marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { borderRadius: 12, width: '48%', padding: 14, marginBottom: 12 },
  statValue: { fontSize: 22, fontWeight: '700', color: C.dark },
  statLabel: { fontSize: 12, color: C.muted, marginTop: 6 },
  section: { fontSize: 15, fontWeight: '700', color: C.dark, marginTop: 10, marginBottom: 12 },
  chartCard: { backgroundColor: C.card, borderRadius: 12, padding: 14, marginVertical: 8 },
  chartArea: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 110 },
  barCol: { alignItems: 'center', flex: 1 },
  bar: { width: 26, backgroundColor: C.navy, borderRadius: 4 },
  barLabel: { fontSize: 11, color: C.muted, marginTop: 6 },
  pieRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 12, padding: 16 },
  donut: { width: 90, height: 90, borderRadius: 45, borderWidth: 18, borderColor: C.navy, borderRightColor: C.accent, borderBottomColor: '#3b82f6' },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  legendDot: { width: 12, height: 12, borderRadius: 3, marginRight: 8 },
  legendTxt: { fontSize: 13, color: C.dark },
});
