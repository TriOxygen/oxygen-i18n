import type { DateOptions, Token } from '../createTranslator';

const formatStrings: DateOptions = {
  d: {
    weekday: undefined,
    era: undefined,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
  },
  D: {
    weekday: 'long',
    era: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
  },
  f: {
    weekday: 'long',
    era: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: undefined,
    timeZoneName: undefined
  },
  F: {
    weekday: 'long',
    era: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: undefined
  },
  g: {
    weekday: undefined,
    era: undefined,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: undefined,
    timeZoneName: undefined
  },
  G: {
    weekday: undefined,
    era: undefined,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: undefined
  },
  m: {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: 'short',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
  },
  M: {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: 'long',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
  },
  w: {
    weekday: 'long',
    era: undefined,
    year: undefined,
    month: 'numeric',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
  },
  W: {
    weekday: 'long',
    era: undefined,
    year: undefined,
    month: 'long',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
  },
  t: {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    hour: 'numeric',
    minute: '2-digit',
    second: undefined,
    timeZoneName: undefined
  },
  T: {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: undefined
  },
  y: {
    weekday: undefined,
    era: undefined,
    year: 'numeric',
    month: 'short',
    day: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
  },
  Y: {
    weekday: undefined,
    era: undefined,
    year: 'numeric',
    month: 'long',
    day: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
  }
};

const createDateFormatter = (locale: string, options: DateOptions = {}) => {
  const dateOptions = {
    ...formatStrings
  };
  (Object.keys(options) as (keyof DateOptions)[]).forEach((format: keyof DateOptions) => {
    dateOptions[format] = {
      ...dateOptions[format],
      ...options[format]
    };
  });

  return (v: Token, format?: keyof DateOptions) => {
    if (typeof v === 'object') {
      if (format) {
        const ucFormat = format.toUpperCase();
        if (ucFormat === 'R') return v.toUTCString();
        if (ucFormat === 'O') return v.toISOString();
        const formatOptions = dateOptions[format];
        if (formatOptions) {
          return v.toLocaleString(locale, formatOptions);
        }
      }
      return v.toLocaleString(locale, {});
    }
    return v.toString();
  };
};

export default createDateFormatter;
