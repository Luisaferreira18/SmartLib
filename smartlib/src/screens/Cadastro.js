import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { AccentButton } from '../components/Button';

export default function Cadastro({ nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.card }}>
      <TopBar title="Cadastrar novo livro" onBack={nav.goBack} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 14 }}>
            <Field label="ISBN" placeholder="Ex.: 9788539902967" />
          </View>
          <View style={styles.capa}>
            <Text style={styles.capaTxt}>Capa</Text>
          </View>
        </View>
        <Field label="Titulo" placeholder="Digite o titulo" />
        <Field label="Autor" placeholder="Digite o autor" />
        <Field label="Categoria" placeholder="Selecione..." />
        <Field label="Editora" placeholder="Digite a editora" />
        <Field label="Ano" placeholder="Ex.: 2020" />
        <AccentButton onPress={nav.goBack}>Salvar livro</AccentButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  capa: {
    width: 94,
    height: 94,
    borderRadius: 12,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: '#cfd4e0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 21,
  },
  capaTxt: { color: C.muted, fontSize: 13 },
});
