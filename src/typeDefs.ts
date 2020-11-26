export type Subscription = {
  id?: string;
  name: string;
  cost: number;
  recurring: SubscriptionRecurrence;
  type: SubscriptionType;
};

export enum SubscriptionType {
  ENTERTAINMENT = "entertainment",
  ADMINISTRATIVE = "administrative",
  PRODUCTIVITY = "productivity",
  TRAINING = "training",
}

export enum SubscriptionRecurrence {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export interface SubscriptionTotals {
  yearly: number;
  monthly: number;
  weekly: number;
  daily: number;
}
