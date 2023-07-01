import styleLogin from "../components/Login.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Context from "@/store/createContext";

const Login = () => {
  // state for error
  const [errMessage, setErrMessage] = useState("");
  // ref for inputs
  const emailRef = useRef();
  const passRef = useRef();
  const { token } = useContext(Context);
  const router = useRouter();

  const { hf, setHf } = Context;

  // redirect to homepage if token exist
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    // send data
    const response = await fetch(process.env.NEXT_PUBLIC_SITE + "/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // Response data
    const responseData = await response.json();
    /* Check if there is an error */

    if (responseData.message) {
      setErrMessage(responseData.message);
      return;
    }

    Cookies.set("token", `${responseData.token}`, { expires: 7 });
    Cookies.set("photo", `${responseData.user.photo}`, { expires: 7 });
    Cookies.set("nickName", `${responseData.user.nickName}`, { expires: 7 });
    router.push("/");
  };

  const toRegisterHandler = () => {
    router.push("register");
  };

  return (
    <div className={styleLogin.div}>
      <h2>Instagram</h2>
      <form onSubmit={submitLogin}>
        <input ref={emailRef} name="email" type="email" placeholder="email" />
        <input
          ref={passRef}
          name="password"
          type="password"
          placeholder="password"
        />
        <p>{errMessage}</p>
        <button type="submit">Log in</button>
      </form>
      <div>
        <p>Don't have an accaunt?</p>
        <button onClick={toRegisterHandler}>Sing up</button>
      </div>
    </div>
  );
};

export default Login;
