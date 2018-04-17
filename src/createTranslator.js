import _buildKey from './buildKey';
import _buildReact from './buildReact';
import _buildMessage from './buildMessage';
import _extractTypeInfo from './extractTypeInfo';

export default (_options = {}, callback) => {

  const messages = {};
  const formatOptionNumeric = 'numeric';
  const formatOptionLong = 'long';
  const formatOption2Digit = '2-digit';
  const numberStyleDecimal = 'decimal';
  const numberStyleCurrency = 'currency';
  const numberStylePercent = 'percent';
  const _localizers = {};
  let locale = 'en-US';
  let currency = 'EUR';

  const options = {
    fallback: false,
    onChange: null,
    ..._options,
  };

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

const _localize = (value, { type, options }) => {
  return _localizers[type](value, options);
};


  const setLocalizers = () => {
    _localizers.s = v => { // string
      return (v || '').toLocaleString(locale);
    }

    _localizers.c = (v, alternateCurrency) => {
      return v.toLocaleString(locale, {
        style: numberStyleCurrency,
        currency: alternateCurrency || currency,
      });
    }

    _localizers.n = (v, format) => {
      return v.toLocaleString(locale, { style: numberStyleDecimal, minimumFractionDigits: 0, maximumFractionDigits: 3 });
    }

    _localizers.t = (v, format) => {
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
    }

    _localizers.p = (v) => {
      return v.toLocaleString(locale, { style: numberStylePercent });
    }
  };

  const setLocale = (newLocale, newCurrency) => {
    locale = newLocale;
    currency = currency || newCurrency;
    messages[locale] = messages[locale] || {};
    setLocalizers();
    if (options.onChange) {
      options.onChange(locale, currency);
    }
  };

  const formatCurrency = (value, alternateCurrency) => {
    return value.toLocaleString(locale, {
      style: numberStyleCurrency,
      currency: alternateCurrency || currency,
    });
  };



  const translate = (literals, ...values) => {
    const messageBundle = messages[locale];
    const translationKey = _buildKey(literals);
    let translationString = messageBundle[translationKey];

    if (options.fallback && !translationString) {
      translationString = messages['en-US'][translationKey];
    }
    if (translationString) {
      let hasReact = false;
      const typeInfoForValues = literals.slice(1).map(_extractTypeInfo);
      const localizedValues = values.map((v, i) => {
        if (typeInfoForValues[i].type === 's' && typeof v === 'object') {
          hasReact = true;
          return v;
        } else if (typeof (v) === 'number' && typeInfoForValues[i].type == 's') {
          if (typeof (v) == 'number') {
            return _localize(v, { type: 'n', options: '' });
          }
        }
        return _localize(v, typeInfoForValues[i])
      });
      if (hasReact) {
        return _buildReact(translationString, ...localizedValues);
      }
      return _buildMessage(translationString, ...localizedValues);
    }
    return `${translationKey}[${locale}]`;
  };

  const addMessages = (messageBundles) => {
    Object.keys(messageBundles).forEach(key => {
      messages[key] = messages[key] || {};
      messages[key] = {
        ...messages[key],
        ...messageBundles[key],
      };
    });
  }

  const setOptions = (option, value) => {
    options[option] = value;
  };

  setLocale('en-US');

  const i18n = {
    setLocale,
    addMessages,
    formatCurrency,
    translate,
    setOptions,
  };

  if (callback) {
    callback(i18n);
  }


  return i18n;

}
