import { IconButton, useColorMode } from "@chakra-ui/core";
import React from "react";

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label=""
      icon={colorMode === "light" ? "moon" : "sun"}
      onClick={toggleColorMode}
      variant="outline"
    />
  );
};

export default ThemeToggler;
