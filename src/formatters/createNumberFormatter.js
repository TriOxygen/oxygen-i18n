const numberStyleDecimal = 'decimal';

const createNumberFormatter = (locale, currency, options = {}) => (v, format) => {
  const numberOptions = {
    style: numberStyleDecimal,
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
    ...options,
  };

  return v.toLocaleString(locale, numberOptions);
};

export default createNumberFormatter;
