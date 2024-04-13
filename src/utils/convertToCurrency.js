export const currencyToNumber = (currency) => {
  if (typeof currency === "string") {
    // Remove Rp and commas, then parse as float
    return parseFloat(currency.replace(/[Rp,.]/g, "")) || 0;
  }

  if (typeof currency === "int") {
    return currency;
  }

  return currency;
};

export const numberToCurrency = (number) => {
  // Format the number as Indonesian Rupiah
  return `Rp ${number.toLocaleString("id-ID")}`;
};
