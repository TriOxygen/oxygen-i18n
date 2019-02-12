//@flow
const formatOptionNumeric = 'numeric';
const formatOptionLong = 'long';
const formatOption2Digit = '2-digit';

const formatStrings = {
  d: {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionNumeric,
    day: formatOptionNumeric,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined,
  },
  D: {
    weekday: formatOptionLong,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined,
  },
  f: {
    weekday: formatOptionLong,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: undefined,
    timeZoneName: undefined,
  },
  F: {
    weekday: formatOptionLong,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: formatOption2Digit,
    timeZoneName: undefined,
  },
  g: {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionNumeric,
    day: formatOptionNumeric,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: undefined,
    timeZoneName: undefined,
  },
  G: {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionNumeric,
    day: formatOptionNumeric,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: formatOption2Digit,
    timeZoneName: undefined,
  },
  m: {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined,
  },
  M: {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined,
  },
  t: {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: undefined,
    timeZoneName: undefined,
  },
  T: {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: formatOption2Digit,
    timeZoneName: undefined,
  },
  y: {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined,
  },
  Y: {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined,
  },
};

type DateOptions = {
  [string]: {
    weekday?: string,
    era?: string,
    year?: string,
    month?: string,
    day?: string,
    hour?: string,
    minute?: string,
    second?: string,
    timeZoneName?: string,
  },
};

const createDateFormatter = (locale: string, currency: string, options: DateOptions = {}) => {
  const dateOptions = {
    ...formatStrings,
  };
  Object.keys(options).forEach((format) => {
    dateOptions[format] = {
      ...dateOptions[format],
      ...options[format],
    };
  });

  return (v: Date, format: string) => {
    if (format) {
      const ucFormat = format.toUpperCase();
      if (ucFormat === 'R') return v.toUTCString();
      if (ucFormat === 'O') return v.toISOString();
      const formatOptions = dateOptions[format];
      if (formatOptions) {
        return v.toLocaleString(locale, dateOptions);
      }
    }
    return v.toLocaleString(locale, {});
  };
};

export default createDateFormatter;
