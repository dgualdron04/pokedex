const useFunctions = () => {
  return {
    toCamelCase: (str: string): string => {
      return str.replace(
        /\w+/g,
        (w: string) => w[0].toUpperCase() + w.slice(1).toLowerCase(),
      );
    },
  };
};

export default useFunctions;
