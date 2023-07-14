import Context from "./createContext";
import { useState } from "react";
import Cookies from "js-cookie";

const ContextProvider = (props) => {
  const token = Cookies.get("token");
  const [postId, setPostId] = useState("");

  const changePostId = (id) => {
    setPostId(id);
  };

  const context = {
    token: token,
    postId,
    changePostId,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
