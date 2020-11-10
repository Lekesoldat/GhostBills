import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/Authentication";
import { signIn } from "../firebase/FirebaseAuthMethods";

interface Inputs {
  email: string;
  password: string;
}

const signInErrors = {
  "auth/user-not-found": "email",
  "auth/wrong-password": "password",
} as const;

type SignInErrors = keyof typeof signInErrors;

const SignIn = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, errors, setError } = useForm<Inputs>();

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async ({ email, password }: Inputs) => {
    setLoading(true);
    try {
      await signIn(email, password);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(signInErrors[err.code as SignInErrors], {
        type: "manual",
        message: err.message,
      });
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        minWidth={["80%", "80%", "50%", "25%"]}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="test@test.com"
                ref={register}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={6} isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  size="lg"
                  ref={register}
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
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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

            <Link href="/sign-up" color="gray.500">
              <Text mt={6}>Don't have an account? Sign up!</Text>
            </Link>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;
