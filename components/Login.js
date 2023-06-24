import styleLogin from "./Login.module.css";
import { useRef, useState } from "react";

const Login = () => {
  // state for error
  const [errMessage, setErrMessage] = useState("");
  // ref for inputs
  const emailRef = useRef();
  const passRef = useRef();

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
    console.log(responseData);
    /* Check if there is an error */
    if (responseData.message) {
      setErrMessage(responseData.message);
    }
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
        <button>Sing up</button>
      </div>
    </div>
  );
};

export default Login;
