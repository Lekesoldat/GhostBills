import { Box, CircularProgress } from "@chakra-ui/react";
import React from "react";
import { useDatastore } from "../context/Datastore";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionList = () => {
  const { subscriptions } = useDatastore();

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
