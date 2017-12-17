import _l, { addMessages } from '../src';

addMessages({
  'en-US': {
    'Hello there {0}': 'Hello there {0}',
    'Want some money? {0}': 'Want some money? {0}',
  }
})


const date = new Date();
const money = 3123;

console.log(_l`Hello there ${ date }:t(D)`)
console.log(_l`Want some money? ${ money }:p`)