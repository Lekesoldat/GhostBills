export type Subscription = {
  id?: string;
  name: string;
  cost: number;
  recurring: SubscriptionRecurrence;
  type: SubscriptionType;
};

export type SubscriptionType =
  | "entertainment"
  | "administrative"
  | "productivity"
  | "training";

export type SubscriptionRecurrence = "daily" | "weekly" | "monthly" | "yearly";

export interface SubscriptionTotals {
  yearly: number;
  monthly: number;
  weekly: number;
  daily: number;
}
