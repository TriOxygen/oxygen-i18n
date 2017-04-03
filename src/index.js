import React from 'react';
const typeInfoRegex = /^:([a-z])(\((.+)\))?/;
const messages = {};


class I18N {
  fallback = false;

  translate = (literals, ...values) => {
    const messageBundle = messages[this.locale];
    const translationKey = this._buildKey(literals);
    let translationString = messageBundle[translationKey];

    if (this.fallback && !translationString) {
      translationString = messages['en-US'][translationKey];
    }
    if (translationString) {
      let hasReact = false;
      const typeInfoForValues = literals.slice(1).map(this._extractTypeInfo);
      const localizedValues = values.map((v, i) => {
        if (typeInfoForValues[i].type === 's' && typeof v === 'object') {
          hasReact = true;
          return v;
        }
        return this._localize(v, typeInfoForValues[i])
      });
      if (hasReact) {
        return this._buildReact(translationString, ...localizedValues);
      }
      return this._buildMessage(translationString, ...localizedValues);
    }
    return `${translationKey}[${this.locale}]`;
  };

  setLocale = (locale, defaultCurrency) => {
    this.locale = locale;
    messages[locale] = messages[locale] || {};
    this.defaultCurrency = defaultCurrency;
    this.dateTimeFormat = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    this.dateFormat = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    this.setLocalizers();
    if (this.onChange) {
      this.onChange(locale, defaultCurrency);
    }
  };

  constructor(locale, defaultCurrency) {
    this.setLocale(locale, defaultCurrency);
  }

  setLocalizers() {
    const { locale, defaultCurrency } = this;
    this._localizers = {
      s /*string*/: v => (v || '').toLocaleString(locale),
      c /*currency*/: (v, currency) => (
        v.toLocaleString(locale, {
          style: 'currency',
          currency: currency || defaultCurrency
        })
      ),
      n /*number*/: (v, fractionalDigits) => (
        v.toLocaleString(locale, {
          minimumFractionDigits: fractionalDigits,
          maximumFractionDigits: fractionalDigits
        })
      ),
      dt: v => this.dateTimeFormat.format(v),
      d: v => this.dateFormat.format(v)
    };
  }

  _extractTypeInfo(literal) {
    let match = typeInfoRegex.exec(literal);
    if (match) {
      return { type: match[1], options: match[3] };
    } else {
      return { type: 's', options: '' };
    }
  }

  _localize(value, { type, options }) {
    return this._localizers[type](value, options);
  }

  // e.g. I18n._buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'
  _buildKey(literals) {
    let stripType = s => s.replace(typeInfoRegex, '');
    let lastPartialKey = stripType(literals[literals.length - 1]);
    let prependPartialKey = (memo, curr, i) => `${stripType(curr)}{${i}}${memo}`;

    return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
  }

  // e.g. I18n._formatStrings('{0} {1}!', 'hello', 'world') == 'hello world!'
  _buildMessage(str, ...values) {
    return str.replace(/{(\d)}/g, (_, index) => values[Number(index)]);
  }

  _buildReact(str, ...values) {
    const tokens = str.split(/({\d+})/).map(token => {
      const match = token.match(/{(\d+)}/);
      if (match) {
        return values[Number(match[1])];
      }
      return token;
    });
    return React.createElement('span', {}, ...tokens);

  }
}

export function addMessages(messageBundles) {
  Object.keys(messageBundles).forEach(locale => {
    messages[locale] = messages[locale] || {};
    messages[locale] = Object.assign({}, messages[locale], messageBundles[locale]);
  });
}

const i18n = new I18N('en-US', 'EUR');
const { translate, setLocale } = i18n;

export { translate, setLocale };
export default i18n;