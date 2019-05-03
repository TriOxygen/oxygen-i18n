import React from 'react';
import createTranslator, { addMessages } from '../src';

addMessages({
  'en-US': {
    'Hello there {0}': 'Hello there {0}',
    'Want some money? {0}': 'Want some money? {0}',
  },
  'sv-SE': {
    'Hello there {0}': 'Hello there {0}',
    'Want some money? {0}': 'Want some money? {0}',
  },
});

const { translate: _l, formatCurrency } = createTranslator({
  locale: 'sv-SE',
});

const date = new Date();
const money = 3123;

console.log(_l`Hello there ${date}:t(t)`);
console.log(_l`Want some money? ${money}:c`);
console.log(_l`Want some money? ${formatCurrency(money, 'SEK')}`);
console.log(formatCurrency(money, 'SEK'));
// console.log(_l`Want some money? ${formatCurrency(money, 'USD')}`);
