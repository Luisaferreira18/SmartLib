import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { C, SHADOW } from '../theme';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import BottomSheet from '../components/BottomSheet';
import { PrimaryButton } from '../components/Button';

const STATS = [
  { v: '12.560', l: 'Emprestimos (total)', tint: C.blueT },
  { v: '5.421', l: 'Usuarios ativos', tint: C.greenT },
  { v: '18.230', l: 'Livros no sistema', tint: C.dangerT },
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
  { l: 'Literatura (42%)', c: C.navy, pct: 0.42 },
  { l: 'Infantil (25%)', c: C.accent, pct: 0.25 },
  { l: 'Didaticos (20%)', c: C.blue, pct: 0.20 },
  { l: 'Outros (15%)', c: '#9ca3af', pct: 0.15 },
];

function polar(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function DonutChart({ data, size = 96, strokeWidth = 20 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth) / 2;
  let cumAngle = 0;
  const paths = [];

  data.forEach((d, i) => {
    const span = d.pct * 360;
    const startAngle = cumAngle;
    const endAngle = cumAngle + span - (span < 360 ? 1.5 : 0);
    cumAngle += span;

    const start = polar(cx, cy, r, startAngle);
    const end = polar(cx, cy, r, endAngle);
    const large = span > 180 ? 1 : 0;

    paths.push(
      <Path
        key={i}
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
        fill="none"
        stroke={d.c}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
      />
    );
  });

  return <Svg width={size} height={size}>{paths}</Svg>;
}

export default function DashGer({ nav, user }) {
  const nome = user?.name || 'Gestor';
  const org = user?.org || 'Fundacao Municipal de Cultura';
  const [menuOpen, setMenuOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const MENU_OPTIONS = [
    { label: 'Exportar relatorio', icon: '📊', onPress: () => setExportOpen(true) },
    { label: 'Perfil', icon: '👤', onPress: () => nav.navigate('perfil') },
  ];

  const EXPORT_OPTIONS = [
    { label: 'Exportar como PDF', icon: '📄', onPress: () => {} },
    { label: 'Exportar como Excel', icon: '📊', onPress: () => {} },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar
        title="Dashboard Gerencial"
        right="☰"
        onRightPress={() => setMenuOpen(true)}
        bellCount={2}
        onBellPress={() => nav.navigate('notificacoes')}
      />
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 110 }}>
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

        <View style={[styles.chartCard, SHADOW.sm]}>
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

        <Text style={[styles.section, { marginTop: 16 }]}>Categorias mais populares</Text>
        <View style={[styles.pieRow, SHADOW.sm]}>
          <DonutChart data={CATS} size={96} strokeWidth={20} />
          <View style={{ flex: 1, marginLeft: 18 }}>
            {CATS.map((c) => (
              <View key={c.l} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: c.c }]} />
                <Text style={styles.legendTxt}>{c.l}</Text>
              </View>
            ))}
          </View>
        </View>

        <PrimaryButton
          style={{ marginTop: 24 }}
          onPress={() => setExportOpen(true)}
          accessibilityLabel="Exportar relatorio"
        >
          Exportar relatorio
        </PrimaryButton>
      </ScrollView>
      <BottomNav active="home" nav={nav} role="gestor" />
      <BottomSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
        options={MENU_OPTIONS}
      />
      <BottomSheet
        visible={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Escolha o formato"
        options={EXPORT_OPTIONS}
      />
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
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 110,
  },
  barCol: { alignItems: 'center', flex: 1 },
  bar: { width: 26, backgroundColor: C.navy, borderRadius: 4 },
  barLabel: { fontSize: 11, color: C.muted, marginTop: 6 },
  pieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 16,
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  legendDot: { width: 12, height: 12, borderRadius: 3, marginRight: 8 },
  legendTxt: { fontSize: 13, color: C.dark },
});
