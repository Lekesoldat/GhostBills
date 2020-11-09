import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useAuth } from "../context/Authentication";
import { signIn } from "../firebase/FirebaseAuthMethods";

interface Inputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm<Inputs>();

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async ({ email, password }: Inputs) => {
    setLoading(true);
    try {
      await signIn(email, password);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Redirect to Home if authenticated.
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <ErrorMessage message={error} />}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                isRequired
                name="email"
                type="email"
                placeholder="test@test.com"
                ref={register}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  size="lg"
                />
                <InputRightElement width="3rem">
                  <Button
                    h="1.5rem"
                    size="sm"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? (
                      <Icon name="view-off" />
                    ) : (
                      <Icon name="view" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              variantColor="teal"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;
