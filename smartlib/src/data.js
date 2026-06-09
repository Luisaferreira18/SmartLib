/* Dados mock do protótipo */

export const CATALOGO = [
  { t: 'Dom Casmurro', a: 'Machado de Assis', s: 'Disponivel', k: 'ok' },
  { t: '1984', a: 'George Orwell', s: 'Disponivel', k: 'ok' },
  { t: 'O Pequeno Principe', a: 'A. de Saint-Exupery', s: 'Poucas unidades', k: 'warn' },
  { t: 'A Revolucao dos Bichos', a: 'George Orwell', s: 'Disponivel', k: 'ok' },
  { t: 'Memorias Postumas', a: 'Machado de Assis', s: 'Devolvido', k: 'neutral' },
];

export const ATIVOS = [
  { t: '1984', a: 'George Orwell', badge: 'Em dia', k: 'ok', emp: '10/05', dev: '24/05' },
  { t: 'Dom Casmurro', a: 'Machado de Assis', badge: 'Proximo vencimento', k: 'warn', emp: '02/05', dev: '16/05' },
  { t: 'A Revolucao dos Bichos', a: 'George Orwell', badge: 'Atrasado', k: 'danger', emp: '20/04', dev: '04/05' },
];

export const HIST = [
  { t: 'O Hobbit', a: 'J.R.R. Tolkien', emp: '10/03', dev: '01/04' },
  { t: 'A Menina que Roubava Livros', a: 'Markus Zusak', emp: '15/02', dev: '01/03' },
  { t: 'Extraordinario', a: 'R.J. Palacio', emp: '10/01', dev: '26/01' },
];
