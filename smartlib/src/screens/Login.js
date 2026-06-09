import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';
import Field from '../components/Field';
import { PrimaryButton, GhostButton } from '../components/Button';

const ROLES = [
  { key: 'usuario', label: 'Usuario', icon: '👤', to: 'home' },
  { key: 'bibliotecario', label: 'Bibliotecario', icon: '📚', to: 'dashBib' },
  { key: 'gestor', label: 'Gestor', icon: '📊', to: 'dashGer' },
];

export default function Login({ nav }) {
  const [role, setRole] = useState('usuario');
  const dest = ROLES.find((r) => r.key === role).to;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.card }} contentContainerStyle={{ padding: 28, paddingTop: 40 }}>
      <View style={{ alignItems: 'center', marginBottom: 28 }}>
        <View style={styles.logo}>
          <View style={styles.logoBook} />
        </View>
        <Text style={styles.title}>SmartLib</Text>
        <Text style={styles.sub}>Biblioteca digital publica</Text>
      </View>

      <Field label="E-mail" placeholder="seu@email.com" />
      <Field label="Senha" placeholder="••••••••" secure />

      <Text style={styles.forgot}>Esqueci minha senha</Text>

      <PrimaryButton onPress={() => nav.reset(dest)}>Entrar</PrimaryButton>
      <GhostButton onPress={() => nav.reset(dest)}>Criar conta</GhostButton>

      <Text style={styles.entrarComo}>Entrar como</Text>
      <View style={styles.roleRow}>
        {ROLES.map((r) => {
          const on = role === r.key;
          return (
            <TouchableOpacity key={r.key} style={{ alignItems: 'center', width: 90 }} onPress={() => setRole(r.key)}>
              <View style={[styles.roleBox, on && styles.roleBoxOn]}>
                <Text style={{ fontSize: 24 }}>{r.icon}</Text>
              </View>
              <Text style={[styles.roleLabel, on && { color: C.navy, fontWeight: '700' }]}>{r.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: { width: 72, height: 72, borderRadius: 12, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center' },
  logoBook: { width: 40, height: 44, borderRadius: 4, backgroundColor: C.accent },
  title: { fontSize: 22, fontWeight: '700', color: C.navy, marginTop: 14 },
  sub: { fontSize: 12, color: C.muted, marginTop: 4 },
  forgot: { color: C.link, fontSize: 12, textAlign: 'right', marginTop: 2 },
  entrarComo: { textAlign: 'center', color: C.muted, fontSize: 13, marginTop: 32, marginBottom: 16 },
  roleRow: { flexDirection: 'row', justifyContent: 'center' },
  roleBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleBoxOn: { borderColor: C.accent, backgroundColor: '#fffaf0' },
  roleLabel: { fontSize: 11, color: C.muted, marginTop: 8 },
});
