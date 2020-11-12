const multiplicands = {
  yearly: 1,
  monthly: 12,
  weekly: 52,
  daily: 365,
};

export const calculateTotals = (
  recurring: "daily" | "weekly" | "monthly" | "yearly",
  price: number
) => {
  const yearlyPrice = price * multiplicands[recurring];

  return {
    yearly: yearlyPrice,
    monthly: yearlyPrice / 12,
    weekly: yearlyPrice / 52,
    daily: yearlyPrice / 365,
  };
};
