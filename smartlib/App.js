import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { C } from './src/theme';

import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Catalogo from './src/screens/Catalogo';
import Detalhe from './src/screens/Detalhe';
import Emprestimos from './src/screens/Emprestimos';
import Historico from './src/screens/Historico';
import Perfil from './src/screens/Perfil';
import DashBib from './src/screens/DashBib';
import Cadastro from './src/screens/Cadastro';
import Registrar from './src/screens/Registrar';
import Devolucao from './src/screens/Devolucao';
import DashGer from './src/screens/DashGer';

const SCREENS = {
  splash: Splash,
  login: Login,
  home: Home,
  catalogo: Catalogo,
  detalhe: Detalhe,
  emprestimos: Emprestimos,
  historico: Historico,
  perfil: Perfil,
  dashBib: DashBib,
  cadastro: Cadastro,
  registrar: Registrar,
  devolucao: Devolucao,
  dashGer: DashGer,
};

export default function App() {
  const [stack, setStack] = useState([{ name: 'splash', params: {} }]);
  const [user, setUser] = useState(null);
  const current = stack[stack.length - 1];
  const Screen = SCREENS[current.name];

  const nav = {
    navigate: (name, params = {}) => setStack((s) => [...s, { name, params }]),
    replace: (name, params = {}) => setStack((s) => [...s.slice(0, -1), { name, params }]),
    reset: (name, params = {}) => setStack([{ name, params }]),
    goBack: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Screen nav={nav} params={current.params} user={user} setUser={setUser} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg, paddingTop: Platform.OS === 'android' ? 24 : 0 },
});
