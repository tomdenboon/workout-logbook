const toOptions = (data: Record<string, string>) => {
  return Object.entries(data).map(([key, value]) => ({
    label: value,
    value: key,
  }));
};

export default toOptions;
