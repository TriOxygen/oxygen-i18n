//@flow
export default (str, ...values) => {
  return str.replace(/{(\d)}/g, (_, index) => values[Number(index)]);
};
