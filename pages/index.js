import React, { useState, useEffect, useContext } from "react";
import Feed from "@/components/Feed";
import Context from "@/store/createContext";
import { useRouter } from "next/router";

const Homepage = (props) => {
  const { token } = useContext(Context);
  const router = useRouter();

  // if token don't exist redirect to login
  useEffect(() => {
    if (!token) {
      router.push("login");
    }
  }, []);
  return (
    <div>
      <Feed />
    </div>
  );
};

export default Homepage;
