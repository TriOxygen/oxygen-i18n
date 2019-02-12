//@flow
import type { Token, CurrencyOptions } from '../createTranslator';
const numberStyleCurrency = 'currency';

const createCurrencyFormatter = (locale: string, currency: string, options?: CurrencyOptions = {}) => (
  v: Token,
  alternateCurrency: string
) => {
  if (typeof v === 'number') {
    const currencyOptions = {
      style: numberStyleCurrency,
      ...options,
    };
    return v.toLocaleString(locale, {
      ...currencyOptions,
      currency: alternateCurrency || currency,
    });
  }
  return v.toString();
};

export default createCurrencyFormatter;
