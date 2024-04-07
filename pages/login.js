import styleLogin from "../components/Login.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Context from "@/store/createContext";

const Login = () => {
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const emailRef = useRef();
  const passRef = useRef();
  const { token } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request is sent

    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SITE + "/auth/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.message) {
        setErrMessage(responseData.message);
        setLoading(false); // Reset loading state
        return;
      }

      Cookies.set("token", `${responseData.token}`, { expires: 7 });
      Cookies.set("photo", `${responseData.user.photo}`, { expires: 7 });
      Cookies.set("nickName", `${responseData.user.nickName}`, { expires: 7 });
      router.push("/");
    } catch (error) {
      setErrMessage("Error sending data");
      setLoading(false); // Reset loading state
    }
  };

  const toRegisterHandler = () => {
    router.push("register");
  };

  return (
    <div className={styleLogin.all}>
      <div className={styleLogin.loginPic}>
        <img src="/login.png" />
      </div>
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
          <p>{loading ? "Sending data..." : errMessage}</p>{" "}
          {/* Display loading message if loading */}
          <button
            className={styleLogin.singup}
            type="submit"
            disabled={loading}
          >
            Log in
          </button>
        </form>
        <div>
          <p>Don't have an account?</p>
          <button className={styleLogin.singup} onClick={toRegisterHandler}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
