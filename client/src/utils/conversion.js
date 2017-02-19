export const fromKilo = (value) => {
  if (typeof value === 'number') {
    return value * 1000;
  }
  return Math.floor(Number(value.toString().replace(',', '.')) * 1000);
};

export const toKilo = (value) => {
  if (typeof value === 'number') {
    return value / 1000;
  }
  return Number(value.toString().replace(',', '.')) / 1000;
};
