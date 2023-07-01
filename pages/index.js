import React, { useState, useEffect, useContext } from "react";
import Feed from "@/components/Feed";
import Context from "@/store/createContext";
import { useRouter } from "next/router";
import Register from "../pages/register";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <Header />
      <Feed />
      <Footer />
    </div>
  );
};

export default Homepage;
