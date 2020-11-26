import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getSubscriptions,
  getSubscriptionTotals,
} from "../firebase/FirestoreMethods";
import useUser from "../hooks/useUser";
import {
  Subscription,
  SubscriptionRecurrence,
  SubscriptionTotals,
  SubscriptionType,
} from "../typeDefs";

const initialTotals = {
  daily: 15.74,
  monthly: 478.75,
  weekly: 110.48,
  yearly: 5745,
};

const initialSubs = [
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

export interface Datastore {
  totals: SubscriptionTotals | null;
  subscriptions: Subscription[] | null;
  updateDatastore: () => Promise<void>;
  updateTotals: () => Promise<void>;
  updateSubscriptions: () => Promise<void>;
}

const DataStoreContext = createContext<Datastore | null>(null);

export const useDatastore = () => useContext(DataStoreContext)!;

const DatastoreProvider = ({ children }: PropsWithChildren<{}>) => {
  const user = useUser();
  const [totals, setTotals] = useState<SubscriptionTotals | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(
    null
  );

  const updateTotals = async () => {
    try {
      console.log("Fetching totals");
      const totals = await getSubscriptionTotals(user.uid);
      setTotals(totals);
    } catch (err) {
      console.error("Error!", err);
    }
  };

  const updateSubscriptions = async () => {
    try {
      const subs = await getSubscriptions(user.uid);
      setSubscriptions(subs);
    } catch (err) {
      console.error("Error!", err);
    }
  };

  const updateDatastore = async () => {
    await updateTotals();
    await updateSubscriptions();
  };

  // Set both totals and subscriptions initially
  useEffect(() => {
    const fetchData = async () => {
      await updateDatastore();
    };
    // fetchData();
  }, []);

  return (
    <DataStoreContext.Provider
      value={{
        totals,
        subscriptions,
        updateDatastore,
        updateTotals,
        updateSubscriptions,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export default DatastoreProvider;
