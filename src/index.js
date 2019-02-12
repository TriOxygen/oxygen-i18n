//@flow

import createTranslator from './createTranslator';
import type { Options } from './createTranslator';
export { addMessages } from './createTranslator';

const cache = {};

const defaultOptions: Options = {
  fallback: false,
  locale: 'en-US',
  currency: 'EUR',
  format: {},
};

export default (options: Options = defaultOptions) => {
  const _options = {
    ...defaultOptions,
    options,
    format: {
      ...defaultOptions.format,
      ...options.format,
    },
  };
  const { locale, currency } = _options;
  if (!cache[locale]) {
    cache[locale] = {};
  }
  if (!cache[locale][currency]) {
    const translator = createTranslator(_options);
    cache[locale][currency] = translator;
  }
  return cache[locale][currency];
};
