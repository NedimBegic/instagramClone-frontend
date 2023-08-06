import React, { useState, useEffect, useContext } from "react";
import Feed from "@/components/Feed";
import Context from "@/store/createContext";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styleMain from "../styles/main.module.css";

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
    <div className={styleMain.all}>
      <Header />
      <Feed />
      <Footer />
    </div>
  );
};

export default Homepage;
