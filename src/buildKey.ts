const typeInfoRegex = /^:([a-z])(\(([^)]+)\))?/;

export default (literals: TemplateStringsArray) => {
  const stripType = (s: string) => s.replace(typeInfoRegex, '');
  const lastPartialKey = stripType(literals[literals.length - 1]);
  const prependPartialKey = (memo:string, curr: string, i: number) => `${stripType(curr)}{${i}}${memo}`;

  return literals
    .slice(0, -1)
    .reduceRight(prependPartialKey, lastPartialKey)
    .replace(/\r\n/g, '\n');
};
