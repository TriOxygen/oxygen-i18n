'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.addMessages = addMessages;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeInfoRegex = /^:([a-z])(\((.+)\))?/;
var messages = {};

var I18N = function () {
  function I18N(locale, defaultCurrency) {
    _classCallCheck(this, I18N);

    _initialiseProps.call(this);

    this.setLocale(locale, defaultCurrency);
  }

  _createClass(I18N, [{
    key: 'setLocalizers',
    value: function setLocalizers() {
      var _this = this;

      var locale = this.locale;
      var defaultCurrency = this.defaultCurrency;

      this._localizers = {
        s /*string*/: function s(v) {
          return (v || '').toLocaleString(locale);
        },
        c /*currency*/: function c(v, currency) {
          return v.toLocaleString(locale, {
            style: 'currency',
            currency: currency || defaultCurrency
          });
        },
        n /*number*/: function n(v, fractionalDigits) {
          return v.toLocaleString(locale, {
            minimumFractionDigits: fractionalDigits,
            maximumFractionDigits: fractionalDigits
          });
        },
        d: function d(v) {
          return _this.dateTimeFormat.format(v);
        }
      };
    }
  }, {
    key: '_extractTypeInfo',
    value: function _extractTypeInfo(literal) {
      var match = typeInfoRegex.exec(literal);
      if (match) {
        return { type: match[1], options: match[3] };
      } else {
        return { type: 's', options: '' };
      }
    }
  }, {
    key: '_localize',
    value: function _localize(value, _ref) {
      var type = _ref.type;
      var options = _ref.options;

      return this._localizers[type](value, options);
    }

    // e.g. I18n._buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'

  }, {
    key: '_buildKey',
    value: function _buildKey(literals) {
      var stripType = function stripType(s) {
        return s.replace(typeInfoRegex, '');
      };
      var lastPartialKey = stripType(literals[literals.length - 1]);
      var prependPartialKey = function prependPartialKey(memo, curr, i) {
        return stripType(curr) + '{' + i + '}' + memo;
      };

      return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
    }

    // e.g. I18n._formatStrings('{0} {1}!', 'hello', 'world') == 'hello world!'

  }, {
    key: '_buildMessage',
    value: function _buildMessage(str) {
      for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }

      return str.replace(/{(\d)}/g, function (_, index) {
        return values[Number(index)];
      });
    }
  }]);

  return I18N;
}();

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.translate = function (literals) {
    for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }

    var messageBundle = messages[_this2.locale];
    var translationKey = _this2._buildKey(literals);
    var translationString = messageBundle[translationKey];

    if (translationString) {
      var _ret = function () {
        var typeInfoForValues = literals.slice(1).map(_this2._extractTypeInfo);
        var localizedValues = values.map(function (v, i) {
          return _this2._localize(v, typeInfoForValues[i]);
        });
        return {
          v: _this2._buildMessage.apply(_this2, [translationString].concat(_toConsumableArray(localizedValues)))
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return 'Error: translation missing!';
  };

  this.setLocale = function (locale, defaultCurrency) {
    _this2.locale = locale;
    messages[locale] = messages[locale] || {};
    _this2.defaultCurrency = defaultCurrency;
    _this2.dateTimeFormat = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    _this2.setLocalizers();
    if (_this2.onChange) {
      _this2.onChange(locale, defaultCurrency);
    }
  };
};

function addMessages(messageBundles) {
  Object.keys(messageBundles).forEach(function (locale) {
    messages[locale] = messages[locale] || {};
    messages[locale] = Object.assign({}, messages[locale], messageBundles[locale]);
  });
}

var i18n = new I18N('en-US', 'EUR');
var translate = i18n.translate;
var setLocale = i18n.setLocale;
exports.translate = translate;
exports.setLocale = setLocale;
exports.default = i18n;