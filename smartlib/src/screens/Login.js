import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { C } from '../theme';
import Field from '../components/Field';
import { PrimaryButton, GhostButton } from '../components/Button';

const ROLES = [
  { key: 'usuario', label: 'Usuario', icon: '👤', to: 'home', name: 'Mariana', org: 'Biblioteca Publica Estadual' },
  { key: 'bibliotecario', label: 'Bibliotecario', icon: '📚', to: 'dashBib', name: 'Carlos', org: 'Biblioteca do Bairro' },
  { key: 'gestor', label: 'Gestor', icon: '📊', to: 'dashGer', name: 'Roberto', org: 'Fundacao Municipal de Cultura' },
];

export default function Login({ nav, setUser }) {
  const [role, setRole] = useState('usuario');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleEntrar = () => {
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha e-mail e senha.');
      return;
    }
    if (!email.includes('@')) {
      setErro('E-mail invalido.');
      return;
    }
    if (senha.length < 4) {
      setErro('Senha muito curta (minimo 4 caracteres).');
      return;
    }
    const r = ROLES.find((x) => x.key === role);
    setUser({ name: r.name, role: r.key, email: email.trim(), org: r.org });
    nav.reset(r.to);
  };

  const handleCriarConta = () => nav.navigate('criarConta');
  const limparErro = () => setErro('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.card }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 28, paddingTop: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <View style={styles.logo}>
            <View style={styles.logoBook} />
          </View>
          <Text style={styles.title}>SmartLib</Text>
          <Text style={styles.sub}>Biblioteca digital publica</Text>
        </View>

        <Field
          label="E-mail"
          placeholder="seu@email.com"
          value={email}
          onChangeText={(t) => { setEmail(t); limparErro(); }}
          keyboardType="email-address"
          accessibilityLabel="Campo de e-mail"
        />
        <Field
          label="Senha"
          placeholder="••••••••"
          value={senha}
          onChangeText={(t) => { setSenha(t); limparErro(); }}
          secure
          accessibilityLabel="Campo de senha"
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          onPress={() => Alert.alert('Recuperar senha', 'Entre em contato com sua biblioteca ou acesse o portal: smartlib.com.br/recuperar')}
          accessibilityLabel="Esqueci minha senha"
        >
          <Text style={styles.forgot}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <PrimaryButton onPress={handleEntrar} accessibilityLabel="Entrar">Entrar</PrimaryButton>
        <GhostButton onPress={handleCriarConta} accessibilityLabel="Criar conta">Criar conta</GhostButton>

        <Text style={styles.entrarComo}>Entrar como</Text>
        <View style={styles.roleRow}>
          {ROLES.map((r) => {
            const on = role === r.key;
            return (
              <TouchableOpacity
                key={r.key}
                style={{ alignItems: 'center', width: 90 }}
                onPress={() => setRole(r.key)}
                accessibilityLabel={r.label}
                activeOpacity={0.7}
              >
                <View style={[styles.roleBox, on && styles.roleBoxOn]}>
                  <Text style={{ fontSize: 24 }}>{r.icon}</Text>
                </View>
                <Text style={[styles.roleLabel, on && { color: C.navy, fontWeight: '700' }]}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: C.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBook: { width: 40, height: 44, borderRadius: 4, backgroundColor: C.accent },
  title: { fontSize: 22, fontWeight: '700', color: C.navy, marginTop: 14 },
  sub: { fontSize: 12, color: C.muted, marginTop: 4 },
  forgot: { color: C.link, fontSize: 12, textAlign: 'right', marginTop: 2 },
  erro: { color: C.danger, fontSize: 13, textAlign: 'center', marginTop: 4, marginBottom: 4 },
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
