import styleRegister from "../styles/Register.module.css";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Context from "@/store/createContext";

const Register = () => {
  const [errMessage, setErrMessage] = useState("");
  const nickNameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const passRef2 = useRef();
  const router = useRouter();

  // go to login route
  const toLoginHandler = () => {
    router.push("login");
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    if (passRef.current.value !== passRef2.current.value) {
      setErrMessage("Passwords not match");
      return;
    }
    const data = {
      nickName: nickNameRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    // send data
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE + "/auth/register",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    // Response data
    const responseData = await response.json();
    /* Check if there is an error */
    if (responseData.message) {
      console.log(responseData.message);
      setErrMessage(responseData.message);
      return;
    }

    Cookies.set("token", `${responseData.token}`, { expires: 7 });
    Cookies.set("photo", `${responseData.user.photo}`, { expires: 7 });
    Cookies.set("nickName", `${responseData.user.nickName}`, { expires: 7 });
    router.push("/");
  };

  return (
    <div className={styleRegister.div}>
      <form onSubmit={submitRegister}>
        <h2>Instagram</h2>
        <input
          ref={nickNameRef}
          name="nickName"
          type="text"
          placeholder="nickname"
        />
        <input ref={nameRef} name="name" type="text" placeholder="name" />
        <input ref={emailRef} name="email" type="email" placeholder="email" />
        <input
          ref={passRef}
          name="password"
          type="password"
          placeholder="password"
        />
        <input
          ref={passRef2}
          name="password"
          type="password"
          placeholder="password"
        />
        <p>{errMessage}</p>
        <button type="submit">Create account</button>
      </form>
      <div>
        <p>Already have an accaunt?</p>
        <button onClick={toLoginHandler}>Log in</button>
      </div>
    </div>
  );
};

export default Register;
