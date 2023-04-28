const typeInfoRegex = /^:([a-z])(\(([^)]+)\))?/;

const extractTypeInfo = (literal: string) => {
  const match = typeInfoRegex.exec(literal);
  if (match) {
    return { type: match[1], options: match[3] };
  }
  return { type: 's', options: '' };
};

export default extractTypeInfo;
