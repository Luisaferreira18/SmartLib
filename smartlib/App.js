import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import CriarConta from './src/screens/CriarConta';
import EditarPerfil from './src/screens/EditarPerfil';
import Notificacoes from './src/screens/Notificacoes';
import AlterarSenha from './src/screens/AlterarSenha';

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
  criarConta: CriarConta,
  editarPerfil: EditarPerfil,
  notificacoes: Notificacoes,
  alterarSenha: AlterarSenha,
};

const NOTIFS_INIT = [
  { id: 1, title: 'Devolucao proxima', msg: '"1984" vence em 2 dias. Renove ou devolva.', hora: '09:30', lida: false },
  { id: 2, title: 'Reserva disponivel', msg: 'O livro "O Senhor dos Aneis" esta disponivel para retirada.', hora: 'Ontem', lida: false },
  { id: 3, title: 'Emprestimo renovado', msg: '"Dom Casmurro" foi renovado com sucesso ate 30/06.', hora: 'Seg', lida: true },
  { id: 4, title: 'Livro devolvido', msg: 'A devolucao de "O Pequeno Principe" foi confirmada.', hora: '02/06', lida: true },
  { id: 5, title: 'Nova recomendacao', msg: 'Com base no seu historico: "Admiravel Mundo Novo".', hora: '01/06', lida: true },
];

const KEYS = { user: '@smartlib:user', notifs: '@smartlib:notifs' };

export default function App() {
  const [stack, setStack] = useState([{ name: 'splash', params: {} }]);
  const [user, setUserState] = useState(null);
  const [notifs, setNotifsState] = useState(NOTIFS_INIT);
  const [hydrated, setHydrated] = useState(false);
  const stackRef = useRef(stack);
  useEffect(() => { stackRef.current = stack; }, [stack]);

  // Carrega dados persistidos
  useEffect(() => {
    async function load() {
      try {
        const [rawUser, rawNotifs] = await Promise.all([
          AsyncStorage.getItem(KEYS.user),
          AsyncStorage.getItem(KEYS.notifs),
        ]);
        if (rawUser) {
          const u = JSON.parse(rawUser);
          setUserState(u);
          // Pula splash e vai direto ao dashboard correto
          const home = u.role === 'bibliotecario' ? 'dashBib' : u.role === 'gestor' ? 'dashGer' : 'home';
          setStack([{ name: home, params: {} }]);
        }
        if (rawNotifs) setNotifsState(JSON.parse(rawNotifs));
      } catch {
        // falha silenciosa; usa estado inicial
      } finally {
        setHydrated(true);
      }
    }
    load();
  }, []);

  const setUser = (u) => {
    const next = typeof u === 'function' ? u(user) : u;
    setUserState(next);
    if (next) {
      AsyncStorage.setItem(KEYS.user, JSON.stringify(next)).catch(() => {});
    } else {
      AsyncStorage.removeItem(KEYS.user).catch(() => {});
    }
  };

  const setNotifs = (n) => {
    const next = typeof n === 'function' ? n(notifs) : n;
    setNotifsState(next);
    AsyncStorage.setItem(KEYS.notifs, JSON.stringify(next)).catch(() => {});
  };

  const current = stack[stack.length - 1];
  const Screen = SCREENS[current.name];

  const nav = {
    navigate: (name, params = {}) => setStack((s) => [...s, { name, params }]),
    replace: (name, params = {}) => setStack((s) => [...s.slice(0, -1), { name, params }]),
    reset: (name, params = {}) => {
      // Limpa user ao navegar para login
      if (name === 'login') setUser(null);
      setStack([{ name, params }]);
    },
    goBack: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
  };

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stackRef.current.length > 1) {
        setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, []);

  // Espera a hidratação para não mostrar splash desnecessário
  if (!hydrated) return null;

  const unreadCount = notifs.filter((n) => !n.lida).length;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Screen
        nav={nav}
        params={current.params}
        user={user}
        setUser={setUser}
        notifs={notifs}
        setNotifs={setNotifs}
        unreadCount={unreadCount}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg, paddingTop: Platform.OS === 'android' ? 24 : 0 },
});
