//@flow

const createNumberFormatter = (locale) => (v) => {
  // string
  return (v || '').toLocaleString(locale);
};

export default createNumberFormatter;
