import Context from "./createContext";
import { useState } from "react";
import Cookies from "js-cookie";

const ContextProvider = (props) => {
  const token = Cookies.get("token");

  const context = {
    token: token,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
