import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Badge from '../components/Badge';
import Cover from '../components/Cover';
import { PrimaryButton, GhostButton } from '../components/Button';

export default function Detalhe({ nav, params }) {
  const b = (params && params.book) || { t: 'O Pequeno Principe', a: 'Antoine de Saint-Exupery' };
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="" onBack={nav.goBack} right="Compartilhar" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 110 }}>
        <View style={{ flexDirection: 'row' }}>
          <Cover w={130} h={178} label="LIVRO" big />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.title}>{b.t}</Text>
            <Text style={styles.author}>{b.a}</Text>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Badge kind="ok">Disponivel</Badge>
            </View>
            <Text style={styles.units}>5 unidades</Text>
          </View>
        </View>

        <View style={styles.hr} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.metaLabel}>Categoria</Text>
            <Text style={styles.metaValue}>Infantil</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Editora</Text>
            <Text style={styles.metaValue}>Agir</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Ano</Text>
            <Text style={styles.metaValue}>1943</Text>
          </View>
        </View>

        <Text style={[styles.metaLabel, { marginTop: 22 }]}>Descricao</Text>
        <Text style={styles.desc}>
          Uma linda fabula sobre amizade, amor e descobertas. Uma historia atemporal que encanta
          leitores de todas as idades.
        </Text>

        <PrimaryButton>Reservar</PrimaryButton>
        <GhostButton>Favoritar</GhostButton>
      </ScrollView>
      <BottomNav active="buscar" nav={nav} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', color: C.dark },
  author: { fontSize: 14, color: C.muted, marginTop: 6 },
  units: { fontSize: 13, color: C.muted, marginTop: 10 },
  hr: { height: 1, backgroundColor: C.line, marginVertical: 22 },
  metaLabel: { fontSize: 12, color: C.muted },
  metaValue: { fontSize: 14, color: C.dark, fontWeight: '600', marginTop: 4 },
  desc: { fontSize: 14, color: '#555', lineHeight: 21, marginTop: 8 },
});
