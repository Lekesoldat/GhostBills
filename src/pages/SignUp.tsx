import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Link,
  Text,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/Authentication";
import { signUp } from "../firebase/FirebaseAuthMethods";

interface Inputs {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

const signupErrors = {
  "auth/email-already-in-use": "email",
  "auth/invalid-email": "email",
  "auth/weak-password": "password",
} as const;

type SignupErrors = keyof typeof signupErrors;

const SignUp = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, errors, setError } = useForm<Inputs>();

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async ({ username, email, password }: Inputs) => {
    setLoading(true);
    try {
      await signUp(username, email, password);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(signupErrors[err.code as SignupErrors], {
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
          <Heading>Sign Up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.username ? true : false}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                name="username"
                type="text"
                placeholder="Bob"
                ref={register}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              pt={6}
              isRequired
              isInvalid={errors.email ? true : false}
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="test@test.com"
                ref={register}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              mt={6}
              isInvalid={errors.password ? true : false}
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={"password"}
                  placeholder="*******"
                  size="lg"
                  ref={register}
                />
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              mt={6}
              isInvalid={errors.repeatedPassword ? true : false}
            >
              <FormLabel htmlFor="repeatedPassword">Repeat password</FormLabel>
              <InputGroup>
                <Input
                  name="repeatedPassword"
                  type={"password"}
                  placeholder="*******"
                  size="lg"
                  ref={register({
                    validate: {
                      matchingPassword: (value) =>
                        value === watch("password") ||
                        "The repeated password is not matching the first.",
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.repeatedPassword?.message}
              </FormErrorMessage>
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
                "Sign Up"
              )}
            </Button>

            <Box mt={6} textAlign="center">
              <Link href="/sign-in" color="gray.500">
                <Text>Already have an account? Sign in!</Text>
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUp;
