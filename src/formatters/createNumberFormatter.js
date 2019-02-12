//@flow
import type { Token, NumberOptions } from '../createTranslator';
const numberStyleDecimal = 'decimal';

const createNumberFormatter = (locale: string, options: NumberOptions = {}) => (v: Token, _?: string) => {
  if (typeof v === 'number') {
    const numberOptions = {
      style: numberStyleDecimal,
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
      ...options,
    };

    return v.toLocaleString(locale, numberOptions);
  }
  return v.toString();
};

export default createNumberFormatter;
