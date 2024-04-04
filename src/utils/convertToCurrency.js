export const currencyToNumber = (currency) => {
  if (typeof currency === "string") {
    // Remove Rp and commas, then parse as float
    return parseFloat(currency.replace(/[Rp,.]/g, "")) || 0; // Return 0 if parseFloat returns NaN
  }
  return 0;
};

export const numberToCurrency = (number) => {
  // Format the number as Indonesian Rupiah
  return `Rp ${number.toLocaleString("id-ID")}`;
};
