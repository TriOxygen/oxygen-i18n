export default (value, { type, options }) => {
  return _localizers[type](value, options);
};
