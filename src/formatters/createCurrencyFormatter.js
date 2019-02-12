//@flow
const numberStyleCurrency = 'currency';

type CurrencyOptions = {
  style?: string,
  [string]: string,
};

const createCurrencyFormatter = (locale: string, currency: string, options?: CurrencyOptions = {}) => (
  v: number,
  alternateCurrency: string
) => {
  const currencyOptions = {
    style: numberStyleCurrency,
    ...options,
  };
  return v.toLocaleString(locale, {
    ...currencyOptions,
    currency: alternateCurrency || currency,
  });
};

export default createCurrencyFormatter;
