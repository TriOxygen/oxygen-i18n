import type { Token } from './createTranslator';
export default (str: string, ...values: Token[]) => {
  return str.replace(/{(\d)}/g, (_, index) => values[Number(index)].toLocaleString());
};
