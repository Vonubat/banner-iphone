export const addPrice = (innerHtml: string, price: string): string => {
  return innerHtml.replaceAll('{{price}}', price);
};
