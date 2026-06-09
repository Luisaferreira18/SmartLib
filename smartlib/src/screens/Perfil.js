import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C, BADGE } from '../theme';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

const ITEMS = ['Editar perfil', 'Notificacoes', 'Alterar senha', 'Ajuda e suporte'];

export default function Perfil({ nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>M</Text>
          </View>
          <Text style={styles.name}>Mariana Magno</Text>
          <Text style={styles.meta}>mariana.magno@email.com</Text>
          <Text style={styles.meta}>Biblioteca Publica Estadual</Text>
          <Text style={styles.meta}>Belo Horizonte - MG</Text>
        </View>
        <View style={{ marginTop: 18 }}>
          {ITEMS.map((it) => (
            <TouchableOpacity key={it} style={styles.row}>
              <Text style={styles.rowTxt}>{it}</Text>
              <Text style={styles.chev}>›</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.row} onPress={() => nav.reset('login')}>
            <Text style={[styles.rowTxt, { color: BADGE.danger.fg }]}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav active="perfil" nav={nav} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { color: '#fff', fontSize: 38, fontWeight: '700' },
  name: { fontSize: 18, fontWeight: '700', color: C.dark, marginTop: 14 },
  meta: { fontSize: 13, color: C.muted, marginTop: 3 },
  row: {
    backgroundColor: C.card,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  rowTxt: { fontSize: 15, color: C.dark },
  chev: { fontSize: 24, color: C.muted },
});
