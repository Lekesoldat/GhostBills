import { Box } from "@chakra-ui/react";
import React from "react";
import SubscriptionList from "../components/SubscriptionList";
import TotalBar from "../components/TotalBar";
import useUser from "../hooks/useUser";
const Home = () => {
  const user = useUser();
  return (
    <Box borderRadius="lg" borderWidth="1px" width="80%">
      <TotalBar />
      <SubscriptionList />
    </Box>
  );
};

export default Home;
