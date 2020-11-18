import React from "react";
import { Subscription } from "../typeDefs";

interface SubscriptionData {
  data: Subscription;
}

const SubscriptionCard = ({
  data: { id, name, cost, recurring, type },
}: SubscriptionData) => {
  return (
    <div>
      <div>ID: {id}</div>
      <div>Name: {name}</div>
      <div>Cost: {cost}</div>
      <div>Recurring: {recurring}</div>
      <div>Type: {type}</div>
    </div>
  );
};

export default SubscriptionCard;
