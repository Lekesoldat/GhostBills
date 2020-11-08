type Subscription = {
  name: string;
  cost: number;
  recurring: "hourly" | "daily" | "weekly" | "monthly" | "yearly";
  type: "entertainment" | "administrative" | "productivity" | "training";
};

export default Subscription;
