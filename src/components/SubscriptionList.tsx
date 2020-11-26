import { Box, CircularProgress } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getSubscriptions } from "../firebase/FirestoreMethods";
import useUser from "../hooks/useUser";
import {
  Subscription,
  SubscriptionRecurrence,
  SubscriptionType,
} from "../typeDefs";
import SubscriptionCard from "./SubscriptionCard";

const initialValues = [
  {
    id: "6vIrGNJ2ydVRDanQKZWw",
    name: "Bear Pro",
    cost: 149,
    type: SubscriptionType.PRODUCTIVITY,
    recurring: SubscriptionRecurrence.YEARLY,
  },
  {
    id: "HAf9o9CJ3L9pzrz4vy4o",
    name: "iCloud",
    cost: 10,
    type: SubscriptionType.ADMINISTRATIVE,
    recurring: SubscriptionRecurrence.MONTHLY,
  },
  {
    id: "PKOMjQnE35qBh4jeby5B",
    name: "1Password",
    cost: 27,
    type: SubscriptionType.ADMINISTRATIVE,
    recurring: SubscriptionRecurrence.MONTHLY,
  },
  {
    id: "RpcUQD3A1bw5ODxDNpMn",
    name: "Spotify",
    cost: 25,
    type: SubscriptionType.ENTERTAINMENT,
    recurring: SubscriptionRecurrence.MONTHLY,
  },
  {
    id: "Y4IqFxI121cVXvk6FPwJ",
    cost: 29,
    name: "TickTick",
    type: SubscriptionType.PRODUCTIVITY,
    recurring: SubscriptionRecurrence.MONTHLY,
  },
  {
    id: "gNdaDMXEzsFRhk5aZRB4",
    name: "Impulse",
    cost: 299,
    type: SubscriptionType.TRAINING,
    recurring: SubscriptionRecurrence.MONTHLY,
  },
  {
    id: "kU6z1Jd0ATszp8eJzEU5",
    name: "PlayStation Plus",
    cost: 580,
    type: SubscriptionType.ENTERTAINMENT,
    recurring: SubscriptionRecurrence.MONTHLY,
  },
  {
    id: "uaLVuIiBvzykGdDYCY0A",
    name: "Netflix",
    cost: 28,
    type: SubscriptionType.ENTERTAINMENT,
    recurring: SubscriptionRecurrence.MONTHLY,
  },
];

const SubscriptionList = () => {
  const user = useUser();
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(
    initialValues
  );

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
    <Box>
      {subscriptions.map((sub) => (
        <SubscriptionCard key={sub.id} data={sub} />
      ))}
    </Box>
  );
};

export default SubscriptionList;
