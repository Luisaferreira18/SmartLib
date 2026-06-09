import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Share } from 'react-native';
import { C } from '../theme';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Badge from '../components/Badge';
import Cover from '../components/Cover';
import { PrimaryButton, GhostButton } from '../components/Button';

export default function Detalhe({ nav, params, user }) {
  const b = (params && params.book) || { t: 'O Pequeno Principe', a: 'Antoine de Saint-Exupery' };
  const [favorito, setFavorito] = useState(false);
  const [reservado, setReservado] = useState(false);

  const handleReservar = () => {
    if (reservado) {
      Alert.alert('Ja reservado', 'Voce ja possui uma reserva para este livro.');
      return;
    }
    Alert.alert(
      'Confirmar reserva',
      `Deseja reservar "${b.t}"?\n\nVoce tera 3 dias uteis para retirada.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reservar',
          onPress: () => {
            setReservado(true);
            Alert.alert('Reserva confirmada!', 'Retire o livro em ate 3 dias uteis na biblioteca.');
          },
        },
      ]
    );
  };

  const handleFavoritar = () => {
    setFavorito((prev) => !prev);
  };

  const handleCompartilhar = async () => {
    try {
      await Share.share({
        message: `Estou lendo "${b.t}" de ${b.a} na SmartLib! Baixe o app e explore nossa biblioteca.`,
        title: 'SmartLib',
      });
    } catch {
      // compartilhamento cancelado
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar
        title=""
        onBack={nav.goBack}
        right="Compartilhar"
        onRightPress={handleCompartilhar}
      />
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
            <Text style={styles.metaValue}>Literatura</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Editora</Text>
            <Text style={styles.metaValue}>Companhia</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Ano</Text>
            <Text style={styles.metaValue}>1943</Text>
          </View>
        </View>

        <Text style={[styles.metaLabel, { marginTop: 22 }]}>Descricao</Text>
        <Text style={styles.desc}>
          Uma linda fabula sobre amizade, amor e descobertas. Uma historia atemporal que encanta
          leitores de todas as idades ao redor do mundo.
        </Text>

        <PrimaryButton
          onPress={handleReservar}
          accessibilityLabel={reservado ? 'Livro ja reservado' : 'Reservar livro'}
          style={reservado ? { backgroundColor: '#2eb86b' } : {}}
        >
          {reservado ? '✓ Reservado' : 'Reservar'}
        </PrimaryButton>
        <GhostButton
          onPress={handleFavoritar}
          accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {favorito ? '♥  Favoritado' : '♡  Favoritar'}
        </GhostButton>
      </ScrollView>
      <BottomNav active="buscar" nav={nav} role="usuario" />
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
