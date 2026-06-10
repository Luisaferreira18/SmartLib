import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, BADGE } from '../theme';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

const ITEMS = [
  { label: 'Editar perfil', icon: 'pencil-outline', action: 'edit' },
  { label: 'Notificacoes', icon: 'notifications-outline', action: 'notif' },
  { label: 'Alterar senha', icon: 'lock-closed-outline', action: 'senha' },
  { label: 'Ajuda e suporte', icon: 'help-circle-outline', action: 'ajuda' },
];

export default function Perfil({ nav, user }) {
  const nome = user?.name || 'Usuario';
  const email = user?.email || 'usuario@email.com';
  const org = user?.org || 'Biblioteca Publica';
  const role = user?.role || 'usuario';

  const handleItem = (action) => {
    if (action === 'edit') return nav.navigate('editarPerfil');
    if (action === 'notif') return nav.navigate('notificacoes');
    if (action === 'senha') return nav.navigate('alterarSenha');
    if (action === 'ajuda') return Alert.alert('Ajuda e suporte', 'Entre em contato: suporte@smartlib.com.br');
  };

  const handleSair = () => {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => nav.reset('login') },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{nome.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{nome}</Text>
          <Text style={styles.meta}>{email}</Text>
          <Text style={styles.meta}>{org}</Text>
        </View>
        <View style={{ marginTop: 18 }}>
          {ITEMS.map((it) => (
            <TouchableOpacity
              key={it.label}
              style={styles.row}
              onPress={() => handleItem(it.action)}
              accessibilityLabel={it.label}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Ionicons name={it.icon} size={20} color={C.navy} style={styles.rowIcon} />
                <Text style={styles.rowTxt}>{it.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={C.muted} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.row}
            onPress={handleSair}
            accessibilityLabel="Sair da conta"
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="log-out-outline" size={20} color={BADGE.danger.fg} style={styles.rowIcon} />
              <Text style={[styles.rowTxt, { color: BADGE.danger.fg }]}>Sair da conta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav active="perfil" nav={nav} role={role} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: C.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowIcon: { marginRight: 14 },
  rowTxt: { fontSize: 15, color: C.dark },
});
