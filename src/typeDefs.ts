export type Subscription = {
  id?: string;
  name: string;
  cost: number;
  recurring: "daily" | "weekly" | "monthly" | "yearly";
  type: "entertainment" | "administrative" | "productivity" | "training";
};

export interface SubscriptionTotals {
  yearly: number;
  monthly: number;
  weekly: number;
  daily: number;
}
