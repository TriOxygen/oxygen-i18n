//@flow
import type { Token } from 'createTranslator';
export default (str: string, ...values: Array<Token>) => {
  return str.replace(/{(\d)}/g, (_, index) => values[Number(index)].toLocaleString());
};
