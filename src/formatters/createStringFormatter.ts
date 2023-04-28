import type { Token } from '../createTranslator';

const createStringFormatter = () => (v: Token, _format?: string) => {
  return (v || '').toLocaleString();
};

export default createStringFormatter;
