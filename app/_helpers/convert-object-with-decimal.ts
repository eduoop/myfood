export const convertObjectWithDecimal = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
