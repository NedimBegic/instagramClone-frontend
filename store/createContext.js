import React from "react";

const Context = React.createContext({
  token: "",
  image: "",
  post: Object,
  fillComments: () => {},
});

export default Context;
