export const stringToNumber = (value) => {
  return Number(value.toString().replace(',', '.'));
};

export const fromKilo = (value) => {
  if (typeof value === 'number') {
    return value * 1000;
  }
  return Math.floor(stringToNumber(value) * 1000);
};

export const toKilo = (value) => {
  if (typeof value === 'number') {
    return value / 1000;
  }
  return stringToNumber(value) / 1000;
};
