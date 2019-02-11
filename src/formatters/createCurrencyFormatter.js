const numberStyleCurrency = 'currency';

const createCurrencyFormatter = (locale, currency, options = {}) => (v, alternateCurrency) => {
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
