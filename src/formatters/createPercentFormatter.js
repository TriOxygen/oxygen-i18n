const numberStylePercent = 'percent';

const createNumberFormatter = (locale, currency, options = {}) => (v, format) => {
  const percentOptions = {
    style: numberStylePercent,
    ...options,
  };

  return v.toLocaleString(locale, percentOptions);
};

export default createNumberFormatter;
