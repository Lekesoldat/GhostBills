import {
  CircularProgress,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import { useDatastore } from "../context/Datastore";

const TotalBar = () => {
  const { totals } = useDatastore();

  if (!totals) {
    return <CircularProgress isIndeterminate />;
  }

  return (
    <StatGroup
      d="grid"
      gridTemplateColumns={{
        base: "1fr 1fr",
        lg: "1fr 1fr 1fr 1fr",
      }}
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      m={5}
    >
      <Stat
        d="flex"
        justifyContent="center"
        borderRight="2px solid pink"
        borderBottom={{ base: "2px solid pink", md: "none" }}
        p={2}
      >
        <StatLabel>Yearly</StatLabel>
        <StatNumber>{totals.yearly}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>

      <Stat
        d="flex"
        justifyContent="center"
        borderBottom={{ base: "2px solid pink", md: "none" }}
        borderRight={{ lg: "2px solid pink" }}
        p={2}
      >
        <StatLabel>Monthly</StatLabel>
        <StatNumber>{totals.monthly}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>

      <Stat d="flex" justifyContent="center" borderRight="2px solid pink" p={2}>
        <StatLabel>Weekly</StatLabel>
        <StatNumber>{totals.weekly}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>

      <Stat d="flex" justifyContent="center" p={2}>
        <StatLabel>Daily</StatLabel>
        <StatNumber>{totals.daily}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default TotalBar;
