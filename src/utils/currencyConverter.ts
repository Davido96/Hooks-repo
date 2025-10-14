// show the currency form of a number using the .toLocaleString()
export const toNaira = (number: number): string => {
  return number.toLocaleString("en-NG", {
    currency: "NGN",
    style: "currency",
    minimumFractionDigits: 0,
  });
};
