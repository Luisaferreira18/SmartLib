/* Dados mock do protótipo */

export const CATALOGO = [
  {
    t: 'Dom Casmurro', a: 'Machado de Assis', s: 'Disponivel', k: 'ok', cat: 'Literatura',
    editora: 'Penguin', ano: '1899', unidades: 3,
    sinopse: 'O narrador Bentinho relembra a infancia e o amor de Capitu, numa das obras mais discutidas e enigmaticas da literatura brasileira.',
  },
  {
    t: '1984', a: 'George Orwell', s: 'Disponivel', k: 'ok', cat: 'Literatura',
    editora: 'Companhia', ano: '1949', unidades: 4,
    sinopse: 'Em um futuro totalitario, Winston Smith enfrenta o regime do Grande Irmao numa distopia que permanece assustadoramente atual.',
  },
  {
    t: 'O Pequeno Principe', a: 'A. de Saint-Exupery', s: 'Poucas unidades', k: 'warn', cat: 'Infantil',
    editora: 'Agir', ano: '1943', unidades: 1,
    sinopse: 'Uma linda fabula sobre amizade, amor e descobertas. Uma historia atemporal que encanta leitores de todas as idades ao redor do mundo.',
  },
  {
    t: 'A Revolucao dos Bichos', a: 'George Orwell', s: 'Disponivel', k: 'ok', cat: 'Literatura',
    editora: 'Penguin', ano: '1945', unidades: 5,
    sinopse: 'Os animais de uma fazenda se rebelam contra os humanos em uma alegoria sobre o poder, a corrupcao e os ideais traidos.',
  },
  {
    t: 'Memorias Postumas', a: 'Machado de Assis', s: 'Indisponivel', k: 'neutral', cat: 'Literatura',
    editora: 'Objetiva', ano: '1881', unidades: 0,
    sinopse: 'O defunto-autor Bras Cubas narra sua propria vida apos a morte, em uma obra ironica e revolucionaria da literatura brasileira.',
  },
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
