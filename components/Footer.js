import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styleFooter from "./Footer.module.css";
import {
  faPaperPlane,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const photo = Cookies.get("photo");
  const logedUser = Cookies.get("nickName");
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(photo);
  }, [image, setImage]);

  const toProfile = () => {
    router.push(`/${logedUser}`);
  };

  const goFeed = () => {
    router.push("/");
  };
  return (
    <div className={styleFooter.div}>
      <FontAwesomeIcon onClick={goFeed} icon={faHouse} />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <FontAwesomeIcon icon={faCirclePlay} />
      <FontAwesomeIcon icon={faPaperPlane} />
      <img
        onClick={toProfile}
        src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + image}
      />
    </div>
  );
};

export default Footer;
