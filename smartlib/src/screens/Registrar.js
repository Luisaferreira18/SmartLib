import React, { useState } from 'react';
import {
  View, ScrollView, Text, StyleSheet, Alert,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { AccentButton, TextButton } from '../components/Button';

function formatDate(raw) {
  const nums = raw.replace(/\D/g, '').slice(0, 8);
  if (nums.length <= 2) return nums;
  if (nums.length <= 4) return `${nums.slice(0, 2)}/${nums.slice(2)}`;
  return `${nums.slice(0, 2)}/${nums.slice(2, 4)}/${nums.slice(4)}`;
}

function parseDate(d) {
  const [dd, mm, yyyy] = d.split('/');
  return new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10));
}

function validarData(d) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(d)) return false;
  const dt = parseDate(d);
  return !isNaN(dt.getTime());
}

export default function Registrar({ nav }) {
  const [usuario, setUsuario] = useState('');
  const [livro, setLivro] = useState('');
  const [dataEmp, setDataEmp] = useState('');
  const [dataDev, setDataDev] = useState('');
  const [erros, setErros] = useState({});

  const limparErro = (campo) => setErros((e) => ({ ...e, [campo]: null }));

  const validar = () => {
    const e = {};
    if (!usuario.trim()) e.usuario = 'Nome do usuario obrigatorio';
    if (!livro.trim()) e.livro = 'Titulo ou ISBN do livro obrigatorio';
    if (!dataEmp.trim()) {
      e.dataEmp = 'Data de emprestimo obrigatoria';
    } else if (!validarData(dataEmp)) {
      e.dataEmp = 'Data invalida (use DD/MM/AAAA)';
    }
    if (!dataDev.trim()) {
      e.dataDev = 'Data de devolucao obrigatoria';
    } else if (!validarData(dataDev)) {
      e.dataDev = 'Data invalida (use DD/MM/AAAA)';
    } else if (validarData(dataEmp) && parseDate(dataDev) <= parseDate(dataEmp)) {
      e.dataDev = 'Devolucao deve ser depois do emprestimo';
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirmar = () => {
    if (!validar()) return;
    Alert.alert(
      'Emprestimo registrado!',
      `Livro "${livro}" registrado para "${usuario}".\nDevolucao prevista: ${dataDev}.`,
      [{ text: 'OK', onPress: nav.goBack }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.card }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TopBar title="Registrar emprestimo" onBack={nav.goBack} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <Field
          label="Usuario *"
          placeholder="Buscar usuario pelo nome ou CPF"
          value={usuario}
          onChangeText={(t) => { setUsuario(t); limparErro('usuario'); }}
          autoCapitalize="words"
        />
        {erros.usuario ? <Text style={styles.erro}>{erros.usuario}</Text> : null}

        <Field
          label="Livro *"
          placeholder="Buscar pelo titulo ou ISBN"
          value={livro}
          onChangeText={(t) => { setLivro(t); limparErro('livro'); }}
        />
        {erros.livro ? <Text style={styles.erro}>{erros.livro}</Text> : null}

        <Field
          label="Data do emprestimo *"
          placeholder="DD/MM/AAAA"
          value={dataEmp}
          onChangeText={(t) => { setDataEmp(formatDate(t)); limparErro('dataEmp'); }}
          keyboardType="numeric"
        />
        {erros.dataEmp ? <Text style={styles.erro}>{erros.dataEmp}</Text> : null}

        <Field
          label="Data de devolucao prevista *"
          placeholder="DD/MM/AAAA"
          value={dataDev}
          onChangeText={(t) => { setDataDev(formatDate(t)); limparErro('dataDev'); }}
          keyboardType="numeric"
        />
        {erros.dataDev ? <Text style={styles.erro}>{erros.dataDev}</Text> : null}

        <AccentButton onPress={handleConfirmar} accessibilityLabel="Confirmar emprestimo">
          Confirmar emprestimo
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
