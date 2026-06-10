import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { AccentButton, TextButton } from '../components/Button';

export default function Devolucao({ nav }) {
  const [usuario, setUsuario] = useState('');
  const [livro, setLivro] = useState('');
  const [dataDev, setDataDev] = useState('');
  const [erros, setErros] = useState({});

  const limparErro = (campo) => setErros((e) => ({ ...e, [campo]: null }));

  const validar = () => {
    const e = {};
    if (!usuario.trim()) e.usuario = 'Nome do usuario obrigatorio';
    if (!livro.trim()) e.livro = 'Titulo ou ISBN do livro obrigatorio';
    if (!dataDev.trim()) e.dataDev = 'Data de devolucao obrigatoria';
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirmar = () => {
    if (!validar()) return;
    Alert.alert(
      'Devolucao registrada!',
      `O livro "${livro}" foi devolvido por "${usuario}" em ${dataDev}.`,
      [{ text: 'OK', onPress: nav.goBack }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.card }}>
      <TopBar title="Registrar devolucao" onBack={nav.goBack} />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.infoBox}>
          <Text style={styles.infoTxt}>
            Registre a devolucao informando o usuario e o livro devolvido.
          </Text>
        </View>

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
          label="Data de devolucao *"
          placeholder="DD/MM/AAAA"
          value={dataDev}
          onChangeText={(t) => { setDataDev(t); limparErro('dataDev'); }}
          keyboardType="numeric"
        />
        {erros.dataDev ? <Text style={styles.erro}>{erros.dataDev}</Text> : null}

        <AccentButton
          onPress={handleConfirmar}
          accessibilityLabel="Confirmar devolucao"
          style={{ backgroundColor: C.orange }}
        >
          Confirmar devolucao
        </AccentButton>
        <TextButton onPress={nav.goBack} accessibilityLabel="Cancelar">
          Cancelar
        </TextButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: C.orangeT,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: C.orange,
  },
  infoTxt: { fontSize: 13, color: C.orangeText, lineHeight: 18 },
  erro: { color: C.danger, fontSize: 12, marginTop: -12, marginBottom: 10 },
});
