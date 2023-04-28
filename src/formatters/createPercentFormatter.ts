import type { PercentOptions, Token } from '../createTranslator';
const numberStylePercent = 'percent';

const createPercentFormatter = (locale: string, options: PercentOptions = {}) => (v: Token, _format?: string) => {
  if (typeof v === 'number') {
    const percentOptions = {
      style: numberStylePercent,
      ...options
    };

    return v.toLocaleString(locale, percentOptions);
  }
  return v.toString();
};

export default createPercentFormatter;
