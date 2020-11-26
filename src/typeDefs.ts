export type Subscription = {
  id?: string;
  name: string;
  cost: number;
  recurring: SubscriptionRecurrence;
  type: SubscriptionType;
};

export enum SubscriptionType {
  Entertainment = "entertainment",
  Administrative = "administrative",
  Productivity = "productivity",
  Training = "training",
}

export enum SubscriptionRecurrence {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}

export interface SubscriptionTotals {
  yearly: number;
  monthly: number;
  weekly: number;
  daily: number;
}
