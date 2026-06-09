import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import Field from '../components/Field';
import { AccentButton } from '../components/Button';

export default function Cadastro({ nav }) {
  const [isbn, setIsbn] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [editora, setEditora] = useState('');
  const [ano, setAno] = useState('');
  const [erros, setErros] = useState({});

  const limparErro = (campo) => setErros((e) => ({ ...e, [campo]: null }));

  const validar = () => {
    const e = {};
    if (!isbn.trim()) e.isbn = 'ISBN obrigatorio';
    if (!titulo.trim()) e.titulo = 'Titulo obrigatorio';
    if (!autor.trim()) e.autor = 'Autor obrigatorio';
    const anoNum = parseInt(ano);
    if (ano.trim() && (isNaN(anoNum) || anoNum < 1000 || anoNum > new Date().getFullYear())) {
      e.ano = 'Ano invalido';
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSalvar = () => {
    if (!validar()) return;
    Alert.alert('Livro cadastrado!', `"${titulo}" foi adicionado ao catalogo com sucesso.`, [
      { text: 'OK', onPress: nav.goBack },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.card }}>
      <TopBar title="Cadastrar novo livro" onBack={nav.goBack} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 14 }}>
            <Field
              label="ISBN *"
              placeholder="Ex.: 9788539902967"
              value={isbn}
              onChangeText={(t) => { setIsbn(t); limparErro('isbn'); }}
              keyboardType="numeric"
            />
            {erros.isbn ? <Text style={styles.erro}>{erros.isbn}</Text> : null}
          </View>
          <View style={styles.capa}>
            <Text style={styles.capaTxt}>📷</Text>
            <Text style={styles.capaLabel}>Capa</Text>
          </View>
        </View>

        <Field
          label="Titulo *"
          placeholder="Digite o titulo do livro"
          value={titulo}
          onChangeText={(t) => { setTitulo(t); limparErro('titulo'); }}
        />
        {erros.titulo ? <Text style={styles.erro}>{erros.titulo}</Text> : null}

        <Field
          label="Autor *"
          placeholder="Nome completo do autor"
          value={autor}
          onChangeText={(t) => { setAutor(t); limparErro('autor'); }}
        />
        {erros.autor ? <Text style={styles.erro}>{erros.autor}</Text> : null}

        <Field
          label="Categoria"
          placeholder="Ex.: Literatura, Infantil, Didatico..."
          value={categoria}
          onChangeText={setCategoria}
        />

        <Field
          label="Editora"
          placeholder="Nome da editora"
          value={editora}
          onChangeText={setEditora}
        />

        <Field
          label="Ano de publicacao"
          placeholder="Ex.: 2020"
          value={ano}
          onChangeText={(t) => { setAno(t); limparErro('ano'); }}
          keyboardType="numeric"
        />
        {erros.ano ? <Text style={styles.erro}>{erros.ano}</Text> : null}

        <AccentButton onPress={handleSalvar} accessibilityLabel="Salvar livro">
          Salvar livro
        </AccentButton>
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
  capaTxt: { fontSize: 24 },
  capaLabel: { color: C.muted, fontSize: 11, marginTop: 4 },
  erro: { color: '#b91c1c', fontSize: 12, marginTop: -12, marginBottom: 10 },
});
