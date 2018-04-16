import _l, { i18n } from '../src';

i18n.addMessages({
  'en-US': {
    'Hello there {0}': 'Hello there {0}',
    'Want some money? {0}': 'Want some money? {0}',
  }
})



const date = new Date();
const money = 3123;

console.log(_l`Hello there ${ date }:t(D)`)
console.log(_l`Want some money? ${ i18n.formatCurrency(money) }`)
