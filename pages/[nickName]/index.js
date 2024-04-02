import Profile from "@/ChildComponents/Profile";
import Footer from "@/components/Footer";
import style from "./index.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { nickName } = router.query; // Extract nickName from URL query parameters

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/user`);
        const data = await res.json();
        setUserData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to find user by nickName in userData array
  const findUserByNickName = (nickName) => {
    return userData.find((user) => user.nickName === nickName);
  };

  return (
    <div className={style.allDiv}>
      {loading ? (
        <div className={style.loading}>Loading...</div>
      ) : (
        <>
          {/* Pass the user object corresponding to the nickName in the URL */}
          <Profile profile={findUserByNickName(nickName)} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default User;
