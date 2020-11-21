import { Badge } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import { SubscriptionType } from "./typeDefs";

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

export const Badges: Record<SubscriptionType, JSX.Element> = {
  administrative: (
    <Badge variant="subtle" colorScheme="purple">
      administrative
    </Badge>
  ),
  entertainment: (
    <Badge variant="subtle" colorScheme="blue">
      entertainment
    </Badge>
  ),
  productivity: (
    <Badge variant="subtle" colorScheme="pink">
      productivity
    </Badge>
  ),
  training: (
    <Badge variant="subtle" colorScheme="orange">
      training
    </Badge>
  ),
};
