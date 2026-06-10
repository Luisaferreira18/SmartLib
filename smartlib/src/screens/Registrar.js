import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { AccentButton, TextButton } from '../components/Button';

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
    if (!dataEmp.trim()) e.dataEmp = 'Data de emprestimo obrigatoria';
    if (!dataDev.trim()) e.dataDev = 'Data de devolucao obrigatoria';
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
    <View style={{ flex: 1, backgroundColor: C.card }}>
      <TopBar title="Registrar emprestimo" onBack={nav.goBack} />
      <ScrollView
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
          onChangeText={(t) => { setDataEmp(t); limparErro('dataEmp'); }}
          keyboardType="numeric"
        />
        {erros.dataEmp ? <Text style={styles.erro}>{erros.dataEmp}</Text> : null}

        <Field
          label="Data de devolucao prevista *"
          placeholder="DD/MM/AAAA"
          value={dataDev}
          onChangeText={(t) => { setDataDev(t); limparErro('dataDev'); }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  erro: { color: C.danger, fontSize: 12, marginTop: -12, marginBottom: 10 },
});
