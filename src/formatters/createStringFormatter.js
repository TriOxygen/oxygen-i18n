//@flow

const createStringFormatter = () => (v?: string) => {
  return (v || '').toLocaleString();
};

export default createStringFormatter;
