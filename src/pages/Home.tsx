import { CircularProgress, Flex } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { getSubscriptions } from "../firebase/FirestoreMethods";
import useUser from "../hooks/useUser";

const Home = () => {
  const user = useUser();

  const [subscriptions, setSubscriptions] = useState<any[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSubscriptions(user.uid);
      setSubscriptions(res);
    };

    fetchData();
  }, []);

  if (!subscriptions) {
    return <CircularProgress isIndeterminate />;
  }

  if (subscriptions.length < 1) {
    return <div>No data!</div>;
  }

  return (
    <Flex minWidth="80%" height="100%" direction="column" bg="red.500">
      <pre>{JSON.stringify(subscriptions, null, 2)}</pre>
    </Flex>
  );
};

export default Home;
