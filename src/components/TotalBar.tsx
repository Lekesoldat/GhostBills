import {
  CircularProgress,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { getSubscriptionTotals } from "../firebase/FirestoreMethods";
import useUser from "../hooks/useUser";
import { SubscriptionTotals } from "../typeDefs";

const TotalBar = () => {
  const user = useUser();
  const [fields, setFields] = useState<SubscriptionTotals | null>();

  useEffect(() => {
    const fetchUserFields = async () => {
      const totals = await getSubscriptionTotals(user.uid);
      setFields(totals);
    };
    fetchUserFields();
  }, []);

  if (!fields) {
    return <CircularProgress isIndeterminate />;
  }

  return (
    <StatGroup>
      <Stat>
        <StatLabel>Yearly</StatLabel>
        <StatNumber>{fields.yearly}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Monthly</StatLabel>
        <StatNumber>{fields.monthly}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Weekly</StatLabel>
        <StatNumber>{fields.weekly}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Daily</StatLabel>
        <StatNumber>{fields.daily}</StatNumber>
        <StatHelpText>NOK</StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default TotalBar;
