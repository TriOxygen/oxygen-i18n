import createCurrencyFormatter from './formatters/createCurrencyFormatter';
import createDateFormatter from './formatters/createDateFormatter';
import createNumberFormatter from './formatters/createNumberFormatter';
import createPercentFormatter from './formatters/createPercentFormatter';
import createStringFormatter from './formatters/createStringFormatter';
import buildKey from './buildKey';
import buildMessage from './buildMessage';
import extractTypeInfo from './extractTypeInfo';

export interface DateOptions {
  d?: Intl.DateTimeFormatOptions;
  D?: Intl.DateTimeFormatOptions;
  f?: Intl.DateTimeFormatOptions;
  F?: Intl.DateTimeFormatOptions;
  g?: Intl.DateTimeFormatOptions;
  G?: Intl.DateTimeFormatOptions;
  M?: Intl.DateTimeFormatOptions;
  m?: Intl.DateTimeFormatOptions;
  t?: Intl.DateTimeFormatOptions;
  T?: Intl.DateTimeFormatOptions;
  y?: Intl.DateTimeFormatOptions;
  Y?: Intl.DateTimeFormatOptions;
}

export type NumberOptions = Intl.NumberFormatOptions;

export interface PercentOptions extends Intl.NumberFormatOptions {
  style?: string,
}

export interface CurrencyOptions extends Intl.NumberFormatOptions {
  style?: string,
}

export type Options = {
  fallback?: boolean,
  locale: string,
  currency: string,
  format: {
    currency?: CurrencyOptions,
    date?: DateOptions,
    number?: Intl.NumberFormatOptions,
    percent?: PercentOptions,
  },
};

type MessageBundle = Record<string, string>

export type MessageBundles = Record<string, MessageBundle>;

export type Token = string | number | Date;

const defaultOptions: Options = {
  fallback: false,
  locale: 'en-US',
  currency: 'EUR',
  format: {}
};

const messageStore: MessageBundles = {};

export const addMessages = (messageBundles: MessageBundles) => {
  Object.keys(messageBundles).forEach((key) => {
    messageStore[key] = messageStore[key] || {};
    messageStore[key] = {
      ...messageStore[key],
      ...messageBundles[key]
    };
  });
};

export default (options: Options = defaultOptions) => {
  const numberStyleCurrency = 'currency';
  let { locale, currency } = options;
  messageStore[locale] = messageStore[locale] || {};

  let _localizers = {
    c: createCurrencyFormatter(locale, currency, options.format.currency),
    n: createNumberFormatter(locale, options.format.number),
    p: createPercentFormatter(locale, options.format.percent),
    s: createStringFormatter(),
    t: createDateFormatter(locale, options.format.date)
  };

  const _localize = (value: Token, { type, options }: {
    type: string,
    options?: string,
  }) => {
    if (type === 't') {
      return _localizers[type](value, options as keyof DateOptions);
    }
    return _localizers[type as 'c' | 'n' | 'p' | 's'](value, options as string);
  };

  const formatCurrency = (value: number, alternateCurrency: string) => {
    return value.toLocaleString(locale, {
      style: numberStyleCurrency,
      ...options.format.currency,
      currency: alternateCurrency || currency
    });
  };

  const setLocale = (newLocale: string) => {
    locale = newLocale;
    messageStore[locale] = messageStore[locale] || {};
    _localizers = {
      c: createCurrencyFormatter(locale, currency, options.format.currency),
      n: createNumberFormatter(locale, options.format.number),
      p: createPercentFormatter(locale, options.format.percent),
      s: createStringFormatter(),
      t: createDateFormatter(locale, options.format.date)
    };
  };

  const translate = (literals: TemplateStringsArray, ...values: Array<Token>) => {
    const translationKey = buildKey(literals);
    let translationString = translationKey === '{0}' ? translationKey : messageStore[locale][translationKey];
    if (options.fallback && !translationString) {
      translationString = messageStore['en-US'][translationKey];
    }
    if (translationString) {
      const typeInfoForValues = literals.slice(1).map(extractTypeInfo);
      const localizedValues = values.map((v, i) => {
        if (typeof v === 'number' && typeInfoForValues[i].type === 's') {
          if (typeof v === 'number') {
            return _localize(v, { type: 'n', options: '' });
          }
        }
        return _localize(v, typeInfoForValues[i]);
      });
      return buildMessage(translationString, ...localizedValues);
    }
    return `${translationKey}[${locale}]`;
  };

  const i18n = {
    formatCurrency,
    translate,
    setLocale
  };

  return i18n;
};
