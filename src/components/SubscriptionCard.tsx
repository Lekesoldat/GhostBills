import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import useUser from "../hooks/useUser";
import { Subscription } from "../typeDefs";
import { Badges } from "../utils";

interface SubscriptionData {
  data: Subscription;
}

const SubscriptionCard = ({
  data: { id, name, cost, recurring, type },
}: SubscriptionData) => {
  const user = useUser();
  return (
    <Flex
      p={5}
      m={5}
      justifyContent="space-between"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex direction="column">
        <Box>{name}</Box>
        {Badges[type]}
      </Flex>

      <Flex direction="column">
        <Box textAlign="end">{cost},- </Box>
        <Box color="gray.400">{recurring}</Box>
      </Flex>
    </Flex>
  );
};

export default SubscriptionCard;
