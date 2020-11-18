import _ from "lodash";

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
    yearly: _.round(yearlyPrice, 2),
    monthly: _.round(yearlyPrice / 12, 2),
    weekly: _.round(yearlyPrice / 52, 2),
    daily: _.round(yearlyPrice / 365, 2),
  };
};
