//@flow
import type { Token } from 'createTranslator';

// eslint-disable-next-line no-unused-vars
const createStringFormatter = () => (v?: Token, _?: string) => {
  return (v || '').toLocaleString();
};

export default createStringFormatter;
