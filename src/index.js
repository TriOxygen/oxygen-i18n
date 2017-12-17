import React from 'react';
const messages = {};
const typeInfoRegex = /^:([a-z])(\(([^\)]+)\))?/
const formatOptionNumeric = 'numeric';
const formatOptionLong = 'long';
const formatOption2Digit = '2-digit';
const numberStyleDecimal = 'decimal';
const numberStyleCurrency = 'currency';
const numberStylePercent = 'percent';
const defaultLocale = 'en-US';
const defaultCurrency = 'EUR';

const formatStrings = {
  d: { weekday: undefined, era: undefined, year: formatOptionNumeric, month: formatOptionNumeric, day: formatOptionNumeric, hour: undefined, minute: undefined, second: undefined, timeZoneName: undefined },
  D: { weekday: formatOptionLong, era: undefined, year: formatOptionNumeric, month: formatOptionLong, day: formatOptionNumeric, hour: undefined, minute: undefined, second: undefined, timeZoneName: undefined },
  f: { weekday: formatOptionLong, era: undefined, year: formatOptionNumeric, month: formatOptionLong, day: formatOptionNumeric, hour: formatOptionNumeric, minute: formatOption2Digit, second: undefined, timeZoneName: undefined },
  F: { weekday: formatOptionLong, era: undefined, year: formatOptionNumeric, month: formatOptionLong, day: formatOptionNumeric, hour: formatOptionNumeric, minute: formatOption2Digit, second: formatOption2Digit, timeZoneName: undefined },
  g: { weekday: undefined, era: undefined, year: formatOptionNumeric, month: formatOptionNumeric, day: formatOptionNumeric, hour: formatOptionNumeric, minute: formatOption2Digit, second: undefined, timeZoneName: undefined },
  G: { weekday: undefined, era: undefined, year: formatOptionNumeric, month: formatOptionNumeric, day: formatOptionNumeric, hour: formatOptionNumeric, minute: formatOption2Digit, second: formatOption2Digit, timeZoneName: undefined },
  m: { weekday: undefined, era: undefined, year: undefined, month: formatOptionLong, day: formatOptionNumeric, hour: undefined, minute: undefined, second: undefined, timeZoneName: undefined },
  M: { weekday: undefined, era: undefined, year: undefined, month: formatOptionLong, day: formatOptionNumeric, hour: undefined, minute: undefined, second: undefined, timeZoneName: undefined },
  t: { weekday: undefined, era: undefined, year: undefined, month: undefined, day: undefined, hour: formatOptionNumeric, minute: formatOption2Digit, second: undefined, timeZoneName: undefined },
  T: { weekday: undefined, era: undefined, year: undefined, month: undefined, day: undefined, hour: formatOptionNumeric, minute: formatOption2Digit, second: formatOption2Digit, timeZoneName: undefined },
  y: { weekday: undefined, era: undefined, year: formatOptionNumeric, month: formatOptionLong, day: undefined, hour: undefined, minute: undefined, second: undefined, timeZoneName: undefined },
  Y: { weekday: undefined, era: undefined, year: formatOptionNumeric, month: formatOptionLong, day: undefined, hour: undefined, minute: undefined, second: undefined, timeZoneName: undefined },
};

class I18N {
  fallback = false;
  currency = defaultCurrency;

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
        } else if (typeof (v) === 'number' && typeInfoForValues[i].type == 's') {
          if (typeof (v) == 'number') {
            return this._localize(v, { type: 'n', options: '' });
          }
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

  setLocale = (locale, currency) => {
    this.locale = locale;
    this.currency = currency;
    messages[locale] = messages[locale] || {};
    this.setLocalizers();
    if (this.onChange) {
      this.onChange(locale, currency);
    }
  };

  constructor(locale, currency) {
    this.setLocale(locale, currency);
  }

  setLocalizers() {
    const { locale, currency } = this;
    this._localizers = {
      s: v => { // string
        return (v || '').toLocaleString(locale);
      },
      c: (v, alternateCurrency) => {
        return v.toLocaleString(locale, {
          style: numberStyleCurrency,
          currency: alternateCurrency || currency,
        });
      },
      n: (v, format) => {
        return v.toLocaleString(locale, { style: numberStyleDecimal, minimumFractionDigits: 0, maximumFractionDigits: 3 });
      },
      t: (v, format) => {
        if (format) {
          switch (format.toUpperCase()) {
            case 'R':
              return v.toUTCString();
            case 'O':
              return v.toISOString();
          }
          const formatOptions = formatStrings[format];
          if(formatOptions) {
            return v.toLocaleString(locale, formatOptions);
          }
        }
        return v.toLocaleString(locale, {});
      },
      p: (v) => {
        return v.toLocaleString(locale, { style: numberStylePercent });
      }

    };
  }

  _extractTypeInfo(literal) {
    const match = typeInfoRegex.exec(literal);
    if (match) {
      return { type: match[1], options: match[3] };
    } else {
      return { type: 's', options: '' };
    }
  }

  _localize(value, { type, options }) {
    return this._localizers[type](value, options);
  }

  _buildKey(literals) {
    let stripType = s => s.replace(typeInfoRegex, '');
    let lastPartialKey = stripType(literals[literals.length - 1]);
    let prependPartialKey = (memo, curr, i) => `${stripType(curr)}{${i}}${memo}`;

    return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey).replace(/\r\n/g, '\n');
  }

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

const i18n = new I18N(defaultLocale, defaultCurrency);

export const setLocale = i18n.setLocale;
export default i18n.translate;