import React from "react";
import { signOut } from "../firebase/FirebaseAuthMethods";
import useUser from "../hooks/useUser";

const Home = () => {
  const user = useUser();

  return (
    <>
      <button onClick={() => signOut()}>Sign out!</button>
    </>
  );
};

export default Home;
