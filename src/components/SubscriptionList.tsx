import { CircularProgress } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getSubscriptions } from "../firebase/FirestoreMethods";
import useUser from "../hooks/useUser";
import { Subscription } from "../typeDefs";
import SubscriptionCard from "./SubscriptionCard";

/*

{
  "id": "RpcUQD3A1bw5ODxDNpMn",
  "type": "entertainment",
  "cost": 25,
  "recurring": "monthly",
  "name": "Spotify"
},
{
  "id": "uaLVuIiBvzykGdDYCY0A",
  "type": "entertainment",
  "recurring": "monthly",
  "cost": 28,
  "name": "Netflix"
}

*/

const SubscriptionList = () => {
  const user = useUser();
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>([
    {
      id: "RpcUQD3A1bw5ODxDNpMn",
      type: "entertainment",
      cost: 25,
      recurring: "monthly",
      name: "Spotify",
    },
    {
      id: "uaLVuIiBvzykGdDYCY0A",
      type: "entertainment",
      recurring: "monthly",
      cost: 28,
      name: "Netflix",
    },
  ]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subscriptions = await getSubscriptions(user.uid);
        setSubscriptions(subscriptions);
      } catch (err) {
        console.log("Error!", err);
      }
    };

    // fetchSubscriptions();
  }, []);

  if (subscriptions === null) {
    return <CircularProgress isIndeterminate />;
  }

  return (
    <div>
      {subscriptions.map((sub) => (
        <SubscriptionCard data={sub} />
      ))}
    </div>
  );
};

export default SubscriptionList;
