import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Alert,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { AccentButton, TextButton } from '../components/Button';

export default function AlterarSenha({ nav }) {
  const [atual, setAtual] = useState('');
  const [nova, setNova] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erros, setErros] = useState({});

  const limparErro = (campo) => setErros((e) => ({ ...e, [campo]: null }));

  const validar = () => {
    const e = {};
    if (!atual.trim()) e.atual = 'Senha atual obrigatoria';
    if (!nova.trim()) e.nova = 'Nova senha obrigatoria';
    else if (nova.length < 6) e.nova = 'Minimo 6 caracteres';
    if (nova !== confirmar) e.confirmar = 'As senhas nao conferem';
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSalvar = () => {
    if (!validar()) return;
    Alert.alert('Senha alterada!', 'Sua senha foi atualizada com sucesso.', [
      { text: 'OK', onPress: nav.goBack },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.card }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TopBar title="Alterar senha" onBack={nav.goBack} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <Field
          label="Senha atual *"
          placeholder="Digite a senha atual"
          value={atual}
          onChangeText={(t) => { setAtual(t); limparErro('atual'); }}
          secure
        />
        {erros.atual ? <Text style={styles.erro}>{erros.atual}</Text> : null}

        <Field
          label="Nova senha *"
          placeholder="Minimo 6 caracteres"
          value={nova}
          onChangeText={(t) => { setNova(t); limparErro('nova'); }}
          secure
        />
        {erros.nova ? <Text style={styles.erro}>{erros.nova}</Text> : null}

        <Field
          label="Confirmar nova senha *"
          placeholder="Repita a nova senha"
          value={confirmar}
          onChangeText={(t) => { setConfirmar(t); limparErro('confirmar'); }}
          secure
        />
        {erros.confirmar ? <Text style={styles.erro}>{erros.confirmar}</Text> : null}

        <AccentButton onPress={handleSalvar} accessibilityLabel="Salvar nova senha">
          Salvar nova senha
        </AccentButton>
        <TextButton onPress={nav.goBack} accessibilityLabel="Cancelar">
          Cancelar
        </TextButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  erro: { color: C.danger, fontSize: 12, marginTop: -12, marginBottom: 10 },
});
