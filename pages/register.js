import styleRegister from "../styles/Register.module.css";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Register = () => {
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const nickNameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const passRef2 = useRef();
  const router = useRouter();

  useEffect(() => {
    // Wake up backend server when the component is mounted
    const wakeUpServer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/user`);
        if (!res.ok) {
          throw new Error("Failed to wake up server");
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("Server started");
      }
    };

    wakeUpServer();
  }, []);

  const toLoginHandler = () => {
    router.push("login");
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    if (passRef.current.value !== passRef2.current.value) {
      setErrMessage("Passwords do not match");
      return;
    }
    setLoading(true);

    const data = {
      nickName: nickNameRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE}/auth/register`,
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
        setLoading(false);
        return;
      }

      Cookies.set("token", responseData.token, { expires: 7 });
      Cookies.set("photo", responseData.user.photo, { expires: 7 });
      Cookies.set("nickName", responseData.user.nickName, { expires: 7 });
      router.push("/");
    } catch (error) {
      setErrMessage("Error creating account");
      setLoading(false);
    }
  };

  return (
    <div className={styleRegister.all}>
      <div className={styleRegister.loginPic}>
        <img src="/login.png" alt="Login" />
      </div>
      <div className={styleRegister.div}>
        <form onSubmit={submitRegister}>
          <h2>Instagram</h2>
          <input
            ref={nickNameRef}
            name="nickName"
            type="text"
            placeholder="Nickname"
          />
          <input ref={nameRef} name="name" type="text" placeholder="Name" />
          <input ref={emailRef} name="email" type="email" placeholder="Email" />
          <input
            ref={passRef}
            name="password"
            type="password"
            placeholder="Password"
          />
          <input
            ref={passRef2}
            name="password"
            type="password"
            placeholder="Confirm Password"
          />
          <p>{loading ? "Creating account..." : errMessage}</p>
          <button
            className={styleRegister.logIn}
            type="submit"
            disabled={loading}
          >
            Create account
          </button>
        </form>
        <div>
          <p>Already have an account?</p>
          <button className={styleRegister.logIn} onClick={toLoginHandler}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
