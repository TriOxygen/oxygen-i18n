//@flow
const numberStylePercent = 'percent';

type PercentOptions = {
  style?: string,
  [string]: string,
};

const createPercentFormatter = (locale: string, options: PercentOptions = {}) => (v: number) => {
  const percentOptions = {
    style: numberStylePercent,
    ...options,
  };

  return v.toLocaleString(locale, percentOptions);
};

export default createPercentFormatter;
