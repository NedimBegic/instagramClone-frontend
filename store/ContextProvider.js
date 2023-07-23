import Context from "./createContext";
import { useState } from "react";
import Cookies from "js-cookie";

const ContextProvider = (props) => {
  const token = Cookies.get("token");
  const [postId, setPostId] = useState("");
  const [posting, setPosting] = useState(false);

  const togglePost = () => {
    setPosting((prevState) => !prevState);
  };

  const changePostId = (id) => {
    setPostId(id);
  };

  const context = {
    token: token,
    postId,
    changePostId,
    posting,
    togglePost,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
