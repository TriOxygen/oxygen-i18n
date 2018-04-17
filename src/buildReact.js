import React from 'react';

export default (str, ...values) => {
  const tokens = str.split(/({\d+})/).map(token => {
    const match = token.match(/{(\d+)}/);
    if (match) {
      return values[Number(match[1])];
    }
    return token;
  });
  return React.createElement('span', {}, ...tokens);
};
