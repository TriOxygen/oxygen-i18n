import type { CurrencyOptions, Token } from '../createTranslator';
const numberStyleCurrency = 'currency';

const createCurrencyFormatter = (locale: string, currency: string, options: CurrencyOptions = {}) => (
  v: Token,
  format?: string
) => {
  if (typeof v === 'number') {
    const currencyOptions = {
      style: numberStyleCurrency,
      ...options
    };
    return v.toLocaleString(locale, {
      ...currencyOptions,
      currency: format || currency
    });
  }
  return v.toString();
};

export default createCurrencyFormatter;
