import { Box, Text } from "@chakra-ui/react";
import React from "react";
import SubscriptionList from "../components/SubscriptionList";
import TotalBar from "../components/TotalBar";
import useUser from "../hooks/useUser";
const Home = () => {
  const user = useUser();
  return (
    <Box borderRadius="lg" borderWidth="1px" width="80%">
      <Text textAlign="center">
        ⚠ Note that the following data is mocked and that the app is not yet
        fully functional ⚠
      </Text>
      <TotalBar />
      <SubscriptionList />
    </Box>
  );
};

export default Home;
