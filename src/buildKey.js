//@flow
const typeInfoRegex = /^:([a-z])(\(([^)]+)\))?/;

export default (literals: Array<string>) => {
  const stripType = (s) => s.replace(typeInfoRegex, '');
  const lastPartialKey = stripType(literals[literals.length - 1]);
  const prependPartialKey = (memo, curr, i) => `${stripType(curr)}{${i}}${memo}`;

  return literals
    .slice(0, -1)
    .reduceRight(prependPartialKey, lastPartialKey)
    .replace(/\r\n/g, '\n');
};
