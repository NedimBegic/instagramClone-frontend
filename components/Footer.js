import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styleFooter from "./Footer.module.css";
import {
  faPaperPlane,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Footer = () => {
  const photo = Cookies.get("photo");
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(photo);
  }, [image, setImage]);
  return (
    <div className={styleFooter.div}>
      <FontAwesomeIcon icon={faHouse} />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <FontAwesomeIcon icon={faCirclePlay} />
      <FontAwesomeIcon icon={faPaperPlane} />
      <img src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + image} />
    </div>
  );
};

export default Footer;
