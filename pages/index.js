import React, { useState, useEffect } from "react";
import Feed from "@/components/Feed";
import Login from "@/components/Login";
const Homepage = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <div>
      <Login />
      {isAuth && <Feed />}
    </div>
  );
};

export default Homepage;
