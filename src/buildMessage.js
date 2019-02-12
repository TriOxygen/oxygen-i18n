//@flow
export default (str: string, ...values: Array<string>) => {
  return str.replace(/{(\d)}/g, (_, index) => values[Number(index)]);
};
