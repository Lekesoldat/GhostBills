import { Box, CircularProgress } from "@chakra-ui/react";
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
      id: "6vIrGNJ2ydVRDanQKZWw",
      recurring: "yearly",
      name: "Bear Pro",
      type: "productivity",
      cost: 149,
    },
    {
      id: "HAf9o9CJ3L9pzrz4vy4o",
      recurring: "monthly",
      type: "administrative",
      name: "iCloud",
      cost: 10,
    },
    {
      id: "PKOMjQnE35qBh4jeby5B",
      type: "administrative",
      name: "1Password",
      cost: 27,
      recurring: "monthly",
    },
    {
      id: "RpcUQD3A1bw5ODxDNpMn",
      name: "Spotify",
      cost: 25,
      type: "entertainment",
      recurring: "monthly",
    },
    {
      id: "Y4IqFxI121cVXvk6FPwJ",
      type: "productivity",
      cost: 29,
      name: "TickTick",
      recurring: "monthly",
    },
    {
      id: "gNdaDMXEzsFRhk5aZRB4",
      name: "Impulse",
      cost: 299,
      type: "training",
      recurring: "monthly",
    },
    {
      id: "kU6z1Jd0ATszp8eJzEU5",
      cost: 580,
      recurring: "yearly",
      type: "entertainment",
      name: "PlayStation Plus",
    },
    {
      id: "uaLVuIiBvzykGdDYCY0A",
      cost: 28,
      recurring: "monthly",
      type: "entertainment",
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

  console.log(subscriptions);

  if (subscriptions === null) {
    return <CircularProgress isIndeterminate />;
  }

  return (
    <Box>
      {subscriptions.map((sub) => (
        <SubscriptionCard data={sub} />
      ))}
    </Box>
  );
};

export default SubscriptionList;
