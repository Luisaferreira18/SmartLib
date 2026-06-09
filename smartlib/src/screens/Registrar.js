import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { AccentButton, TextButton } from '../components/Button';

export default function Registrar({ nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.card }}>
      <TopBar title="Registrar emprestimo" onBack={nav.goBack} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Field label="Usuario" placeholder="Buscar usuario" />
        <Field label="Livro" placeholder="Buscar livro" />
        <Field label="Data do emprestimo" placeholder="13/05/2024" />
        <Field label="Data de devolucao prevista" placeholder="27/05/2024" />
        <AccentButton onPress={nav.goBack}>Confirmar emprestimo</AccentButton>
        <TextButton onPress={nav.goBack}>Cancelar</TextButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
