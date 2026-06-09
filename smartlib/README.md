# SmartLib

Protótipo navegável da biblioteca digital pública **SmartLib**, feito em React Native (Expo). São 12 telas que reproduzem o protótipo do Figma, com navegação própria (sem biblioteca externa de navegação, para rodar liso no Expo Snack sem conflito de versão).

## Como abrir no Expo Snack

A forma recomendada para o grupo é importar pelo GitHub: suba este projeto num repositório e, no Snack, vá em **Project (⋯) → Import GitHub repo** e cole a URL. A vantagem é que quando alguém dá `push`, o Snack atualiza junto.

Alternativa sem GitHub: no Snack, crie as pastas `src`, `src/components` e `src/screens` pelo ícone de nova pasta e arraste os arquivos para a árvore (ou use **Project (⋯) → Import files**). Depois substitua o `App.js` padrão pelo deste projeto.

Observação sobre o SDK: o `app.json` está fixado no SDK 55. Se o Snack estiver numa versão diferente e oferecer para atualizar o SDK no import, pode aceitar — o app usa só componentes nativos do React Native, então funciona em qualquer SDK recente.

## Estrutura

```
App.js                 navegador + registro das telas
src/
  theme.js             tokens de cor (paleta do Figma) e cores de badge
  data.js              dados mock (catalogo, emprestimos, historico)
  components/
    TopBar.js          barra de topo com voltar/titulo/acao
    BottomNav.js       barra inferior (Home / Buscar / Emprestimos / Perfil)
    Badge.js           selo de status (Disponivel, Atrasado, etc.)
    Cover.js           placeholder de capa de livro
    Field.js           input com label
    Button.js          PrimaryButton, GhostButton, AccentButton, TextButton
  screens/
    Splash.js          1. Splash
    Login.js           2. Login (com selecao de papel)
    Home.js            3. Home do usuario
    Catalogo.js        4. Catalogo de livros
    Detalhe.js         5. Detalhes do livro
    Emprestimos.js     6. Meus emprestimos
    Historico.js       7. Historico
    Perfil.js          8. Perfil
    DashBib.js         9. Dashboard do bibliotecario
    Cadastro.js        10. Cadastro de livro
    Registrar.js       11. Registrar emprestimo
    DashGer.js         12. Dashboard gerencial
```

## Fluxo de navegação

A Splash abre o Login. No Login os três ícones de papel são selecionáveis e o "Entrar" leva para a tela inicial correspondente: Usuário vai para a Home, Bibliotecário para o Dashboard da Biblioteca e Gestor para o Dashboard Gerencial. Na Home os cards levam ao Catálogo, aos Empréstimos e ao Histórico; tocar num livro do Catálogo abre os Detalhes. No Perfil, "Sair da conta" volta ao Login. Nos dashboards, as ações rápidas abrem o Cadastro de Livro e o Registrar Empréstimo. A barra inferior funciona em todas as telas principais.

## Paleta

As cores ficam centralizadas em `src/theme.js`, então mudar uma cor reflete no app inteiro. As principais: navy `#142145`, amarelo `#ffc721`, fundo `#f5f7fa`, texto escuro `#1a1a1a`, mutado `#999`. Botões de ação do dashboard do bibliotecário usam verde `#2eb86b` e laranja `#ff8c1a`.

## Observações

As capas de livro e os ícones aparecem como blocos coloridos com rótulo, igual ao protótipo do Figma (que não tinha imagens reais). O gráfico de pizza do dashboard gerencial é uma aproximação com `borderColor`, já que o React Native puro não desenha setores sem SVG. Se quiser ícones de verdade dá para usar `@expo/vector-icons` (já vem no Snack) e, para o gráfico, `react-native-svg`.
