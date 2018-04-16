'use strict';

var _templateObject = _taggedTemplateLiteral(['Hello there ', ':t(D)'], ['Hello there ', ':t(D)']),
    _templateObject2 = _taggedTemplateLiteral(['Want some money? ', ':p'], ['Want some money? ', ':p']);

var _src = require('../src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _src.addMessages)({
  'en-US': {
    'Hello there {0}': 'Hello there {0}',
    'Want some money? {0}': 'Want some money? {0}'
  }
});

var date = new Date();
var money = 3123;

console.log((0, _src2.default)(_templateObject, date));
console.log((0, _src2.default)(_templateObject2, money));