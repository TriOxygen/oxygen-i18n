const typeInfoRegex = /^:([a-z])(\(([^\)]+)\))?/

export default (literal) => {
  const match = typeInfoRegex.exec(literal);
  if (match) {
    return { type: match[1], options: match[3] };
  } else {
    return { type: 's', options: '' };
  }
};
