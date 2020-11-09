import { Alert, AlertDescription, AlertIcon, Box } from "@chakra-ui/core";
import React from "react";

const ErrorMessage = ({ message }: { message: string }) => (
  <Box my={4}>
    <Alert status="error" borderRadius={4}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  </Box>
);

export default ErrorMessage;
