const typeInfoRegex = /^:([a-z])(\((.+)\))?/;
const messages = {};

class I18N {

  translate = (literals, ...values) => {
    const messageBundle = messages[this.locale];
    const translationKey = this._buildKey(literals);
    const translationString = messageBundle[translationKey];

    if (translationString) {
      const typeInfoForValues = literals.slice(1).map(this._extractTypeInfo);
      const localizedValues = values.map((v, i) => this._localize(v, typeInfoForValues[i]));
      return this._buildMessage(translationString, ...localizedValues);
    }
    return 'Error: translation missing!';
  };

  setLocale = (locale, defaultCurrency) => {
    this.locale = locale;
    messages[locale] = messages[locale] || {};
    this.defaultCurrency = defaultCurrency;
    this.dateTimeFormat = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
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
      d: v => this.dateTimeFormat.format(v)
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