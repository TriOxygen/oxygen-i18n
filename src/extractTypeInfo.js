//@flow
const typeInfoRegex = /^:([a-z])(\(([^)]+)\))?/;

export default (literal: string) => {
  const match = typeInfoRegex.exec(literal);
  if (match) {
    return { type: match[1], options: match[3] };
  }
  return { type: 's', options: '' };
};
