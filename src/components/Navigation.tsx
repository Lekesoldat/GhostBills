import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaLock } from "react-icons/fa";
import { signOut } from "../firebase/FirebaseAuthMethods";
import useUser from "../hooks/useUser";
import ThemeToggler from "./ThemeToggler";

const Navigation = () => {
  const user = useUser();
  return (
    <Flex alignItems="center" justifyContent="flex-end" p={"1rem"}>
      <Flex direction="row">
        <ThemeToggler />

        {user ? (
          <IconButton
            ml={1}
            aria-label=""
            icon={<FaLock />}
            color="yellow"
            onClick={signOut}
            variant="outline"
          />
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Navigation;
