import {
  CircularProgress,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getSubscriptionTotals } from "../firebase/FirestoreMethods";
import useUser from "../hooks/useUser";
import { SubscriptionTotals } from "../typeDefs";

const TotalBar = () => {
  const user = useUser();
  const [fields, setFields] = useState<SubscriptionTotals | null>({
    daily: 15.74,
    monthly: 478.75,
    weekly: 110.48,
    yearly: 5745,
  });

  useEffect(() => {
    const fetchUserFields = async () => {
      const totals = await getSubscriptionTotals(user.uid);
      setFields(totals);
    };

    // fetchUserFields();
  }, []);

  if (!fields) {
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
      justifyContent="space-between"
      p={5}
      m={5}
    >
      <Stat
        d="flex"
        justifyContent="center"
        borderBottom={{ base: "2px solid pink", md: "none" }}
        borderRight="2px solid pink"
        p={2}
      >
        <StatLabel>Yearly</StatLabel>
        <StatNumber>{fields.yearly}</StatNumber>
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
        <StatNumber>{fields.monthly}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>

      <Stat d="flex" justifyContent="center" borderRight="2px solid pink" p={2}>
        <StatLabel>Weekly</StatLabel>
        <StatNumber>{fields.weekly}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>

      <Stat d="flex" justifyContent="center" p={2}>
        <StatLabel>Daily</StatLabel>
        <StatNumber>{fields.daily}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default TotalBar;
