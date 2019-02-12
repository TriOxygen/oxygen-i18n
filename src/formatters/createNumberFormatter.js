//@flow
const numberStyleDecimal = 'decimal';

type NumberOptions = {
  style?: string,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  [string]: string,
};

const createNumberFormatter = (locale: string, options: NumberOptions = {}) => (v: number) => {
  const numberOptions = {
    style: numberStyleDecimal,
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
    ...options,
  };

  return v.toLocaleString(locale, numberOptions);
};

export default createNumberFormatter;
