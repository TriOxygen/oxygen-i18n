const typeInfoRegex = /^:([a-z])(\(([^\)]+)\))?/

export default (literals) => {
  let stripType = s => s.replace(typeInfoRegex, '');
  let lastPartialKey = stripType(literals[literals.length - 1]);
  let prependPartialKey = (memo, curr, i) => `${stripType(curr)}{${i}}${memo}`;

  return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey).replace(/\r\n/g, '\n');
};
