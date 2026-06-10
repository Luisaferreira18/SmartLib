import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Alert,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { AccentButton, TextButton } from '../components/Button';

export default function EditarPerfil({ nav, user, setUser }) {
  const [nome, setNome] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [erros, setErros] = useState({});

  const limparErro = (campo) => setErros((e) => ({ ...e, [campo]: null }));

  const validar = () => {
    const e = {};
    if (!nome.trim()) e.nome = 'Nome obrigatorio';
    if (!email.trim()) e.email = 'E-mail obrigatorio';
    else if (!email.includes('@')) e.email = 'E-mail invalido';
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSalvar = () => {
    if (!validar()) return;
    if (setUser) setUser((u) => ({ ...u, name: nome.trim(), email: email.trim() }));
    Alert.alert('Perfil atualizado!', 'Suas informacoes foram salvas.', [
      { text: 'OK', onPress: nav.goBack },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.card }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TopBar title="Editar perfil" onBack={nav.goBack} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatarBox}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{nome.charAt(0).toUpperCase() || '?'}</Text>
          </View>
        </View>

        <Field
          label="Nome completo *"
          placeholder="Seu nome"
          value={nome}
          onChangeText={(t) => { setNome(t); limparErro('nome'); }}
          autoCapitalize="words"
        />
        {erros.nome ? <Text style={styles.erro}>{erros.nome}</Text> : null}

        <Field
          label="E-mail *"
          placeholder="seu@email.com"
          value={email}
          onChangeText={(t) => { setEmail(t); limparErro('email'); }}
          keyboardType="email-address"
        />
        {erros.email ? <Text style={styles.erro}>{erros.email}</Text> : null}

        <AccentButton onPress={handleSalvar} accessibilityLabel="Salvar alteracoes">
          Salvar alteracoes
        </AccentButton>
        <TextButton onPress={nav.goBack} accessibilityLabel="Cancelar">
          Cancelar
        </TextButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avatarBox: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: C.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { color: '#fff', fontSize: 32, fontWeight: '700' },
  erro: { color: C.danger, fontSize: 12, marginTop: -12, marginBottom: 10 },
});
