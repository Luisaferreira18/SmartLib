import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';

export default function Notificacoes({ nav, notifs = [], setNotifs }) {
  const marcarLida = (id) =>
    setNotifs((ns) => ns.map((n) => (n.id === id ? { ...n, lida: true } : n)));

  const marcarTodas = () =>
    setNotifs((ns) => ns.map((n) => ({ ...n, lida: true })));

  const naoLidas = notifs.filter((n) => !n.lida).length;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar
        title="Notificacoes"
        onBack={nav.goBack}
        right={naoLidas > 0 ? 'Marcar todas' : null}
        onRightPress={naoLidas > 0 ? marcarTodas : undefined}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {naoLidas > 0 && (
          <Text style={styles.countTxt}>
            {naoLidas} nao lida{naoLidas > 1 ? 's' : ''}
          </Text>
        )}
        {notifs.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Sem notificacoes</Text>
            <Text style={styles.emptyMsg}>Voce esta em dia!</Text>
          </View>
        )}
        {notifs.map((n) => (
          <TouchableOpacity
            key={n.id}
            style={[styles.card, !n.lida && styles.cardUnread]}
            onPress={() => marcarLida(n.id)}
            accessibilityLabel={n.title}
            activeOpacity={0.7}
          >
            <View style={styles.topRow}>
              {!n.lida && <View style={styles.dot} />}
              <Text style={styles.hora}>{n.hora}</Text>
            </View>
            <Text style={[styles.title, !n.lida && { color: C.navy }]}>{n.title}</Text>
            <Text style={styles.msg}>{n.msg}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  countTxt: { fontSize: 12, color: C.accent, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12 },
  card: {
    backgroundColor: C.card,
    marginHorizontal: 14,
    marginTop: 10,
    borderRadius: 12,
    padding: 14,
  },
  cardUnread: { borderLeftWidth: 3, borderLeftColor: C.navy },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.navy, marginRight: 6 },
  hora: { fontSize: 11, color: C.muted },
  title: { fontSize: 14, fontWeight: '700', color: C.dark, marginBottom: 4 },
  msg: { fontSize: 13, color: C.muted, lineHeight: 18 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: C.dark, marginTop: 16 },
  emptyMsg: { fontSize: 13, color: C.muted, marginTop: 6 },
});
