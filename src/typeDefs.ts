type Subscription = {
  name: string;
  cost: number;
  recurring: "daily" | "weekly" | "monthly" | "yearly";
  type: "entertainment" | "administrative" | "productivity" | "training";
};

export default Subscription;
