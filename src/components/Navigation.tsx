import { Flex, IconButton } from "@chakra-ui/core";
import React from "react";
import { signOut } from "../firebase/FirebaseAuthMethods";
import useUser from "../hooks/useUser";
import ThemeToggler from "./ThemeToggler";

const Navigation = () => {
  const user = useUser();
  return (
    <Flex alignItems="center" justifyContent="flex-end" p={"1rem"}>
      {/* <Box>
        <Link href="/">
          <Image src="./logo_no_text.png" alt="Logo" size="75px" />
        </Link>
      </Box> */}

      <Flex direction="row">
        <ThemeToggler />

        {user ? (
          <IconButton
            ml={1}
            aria-label=""
            icon="lock"
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
