//@flow
import React from 'react';

export default (str, ...values) => {
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
