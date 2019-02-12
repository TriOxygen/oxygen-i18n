//@flow
import buildKey from './buildKey';
import buildReact from './buildReact';
import buildMessage from './buildMessage';
import extractTypeInfo from './extractTypeInfo';
import createCurrencyFormatter from './formatters/createCurrencyFormatter';
import createNumberFormatter from './formatters/createNumberFormatter';
import createPercentFormatter from './formatters/createPercentFormatter';
import createStringFormatter from './formatters/createStringFormatter';
import createDateFormatter from './formatters/createDateFormatter';

type Options = {
  fallback?: boolean,
  locale: string,
  currency: string,
  format: {
    [string]: *,
  },
};

const defaultOptions: Options = {
  fallback: false,
  locale: 'en-US',
  currency: 'EUR',
  format: {},
};

const messageStore = {};

type MessageBundle = {
  [string]: {
    [string]: string,
  },
};

type MessageBundles = {
  [string]: MessageBundle,
};

export const addMessages = (messageBundles: MessageBundles) => {
  Object.keys(messageBundles).forEach((key) => {
    messageStore[key] = messageStore[key] || {};
    messageStore[key] = {
      ...messageStore[key],
      ...messageBundles[key],
    };
  });
};

export default (options: Options = defaultOptions) => {
  const numberStyleCurrency = 'currency';
  const _localizers = {};
  const { locale, currency } = options;
  messageStore[locale] = messageStore[locale] || {};

  _localizers.c = createCurrencyFormatter(locale, currency, options.format.currency);
  _localizers.n = createNumberFormatter(locale, options.format.number);
  _localizers.p = createPercentFormatter(locale, options.format.percent);
  _localizers.s = createStringFormatter();
  _localizers.t = createDateFormatter(locale, options.format.date);

  const _localize = (value, { type, options }) => {
    return _localizers[type](value, options);
  };

  const formatCurrency = (value, alternateCurrency) => {
    return value.toLocaleString(locale, {
      style: numberStyleCurrency,
      ...options.format.currency,
      currency: alternateCurrency || currency,
    });
  };

  const translate = (literals, ...values) => {
    const translationKey = buildKey(literals);
    let translationString = messageStore[locale][translationKey];

    if (options.fallback && !translationString) {
      translationString = messageStore['en-US'][translationKey];
    }
    if (translationString) {
      let hasReact = false;
      const typeInfoForValues = literals.slice(1).map(extractTypeInfo);
      const localizedValues = values.map((v, i) => {
        if (typeInfoForValues[i].type === 's' && typeof v === 'object') {
          hasReact = true;
          return v;
        } else if (typeof v === 'number' && typeInfoForValues[i].type === 's') {
          if (typeof v === 'number') {
            return _localize(v, { type: 'n', options: '' });
          }
        }
        return _localize(v, typeInfoForValues[i]);
      });
      if (hasReact) {
        return buildReact(translationString, ...localizedValues);
      }
      return buildMessage(translationString, ...localizedValues);
    }
    return `${translationKey}[${locale}]`;
  };

  const i18n = {
    formatCurrency,
    translate,
  };

  return i18n;
};
