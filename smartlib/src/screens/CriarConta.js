import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { PrimaryButton, TextButton } from '../components/Button';

export default function CriarConta({ nav }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erros, setErros] = useState({});

  const limparErro = (campo) => setErros((e) => ({ ...e, [campo]: null }));

  const validar = () => {
    const e = {};
    if (!nome.trim()) e.nome = 'Nome obrigatorio';
    if (!email.trim()) e.email = 'E-mail obrigatorio';
    else if (!email.includes('@')) e.email = 'E-mail invalido';
    if (!senha.trim()) e.senha = 'Senha obrigatoria';
    else if (senha.length < 6) e.senha = 'Minimo 6 caracteres';
    if (senha !== confirmar) e.confirmar = 'Senhas nao conferem';
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleCadastrar = () => {
    if (!validar()) return;
    Alert.alert(
      'Conta criada!',
      `Bem-vindo(a), ${nome.trim()}! Sua conta foi criada com sucesso.`,
      [{ text: 'Fazer login', onPress: nav.goBack }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.card }}>
      <TopBar title="Criar conta" onBack={nav.goBack} />
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
      >
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

        <Field
          label="Senha *"
          placeholder="Minimo 6 caracteres"
          value={senha}
          onChangeText={(t) => { setSenha(t); limparErro('senha'); }}
          secure
        />
        {erros.senha ? <Text style={styles.erro}>{erros.senha}</Text> : null}

        <Field
          label="Confirmar senha *"
          placeholder="Repita a senha"
          value={confirmar}
          onChangeText={(t) => { setConfirmar(t); limparErro('confirmar'); }}
          secure
        />
        {erros.confirmar ? <Text style={styles.erro}>{erros.confirmar}</Text> : null}

        <PrimaryButton onPress={handleCadastrar} accessibilityLabel="Criar conta">
          Criar conta
        </PrimaryButton>
        <TextButton onPress={nav.goBack} accessibilityLabel="Ja tenho conta">
          Ja tenho conta
        </TextButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  erro: { color: C.danger, fontSize: 12, marginTop: -12, marginBottom: 10 },
});
