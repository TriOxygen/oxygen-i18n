//@flow
import React from 'react';
import type { Token } from 'createTranslator';

export default (str: string, ...values: Array<string>) => {
  const matchToken = (token) => {
    const match = token.match(/{(\d+)}/);
    if (match) {
      return values[Number(match[1])];
    }
    return token;
  };
  const tokens = str.split(/({\d+})/).map(matchToken);
  return React.createElement('span', {}, ...tokens);
};
