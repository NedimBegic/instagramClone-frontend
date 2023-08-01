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
import ErrorHandler from "@/ChildComponents/ErrorHandler";

const Footer = () => {
  const router = useRouter();
  const photo = Cookies.get("photo");
  const logedUser = Cookies.get("nickName");
  const [image, setImage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  useEffect(() => {
    setImage(photo);
  }, [image, setImage]);

  const toProfile = () => {
    router.push(`/${logedUser}`);
  };

  const goFeed = () => {
    router.push("/");
  };

  const onSearch = () => {
    setErrMessage("No search yet.");
    setShowError(true);
  };

  const onReel = () => {
    setErrMessage("No reels yet.");
    setShowError(true);
  };

  const onMessage = () => {
    setErrMessage("No messanger yet.");
    setShowError(true);
  };

  const hideError = () => {
    setShowError(false);
  };
  return (
    <div className={styleFooter.div}>
      <FontAwesomeIcon onClick={goFeed} icon={faHouse} />
      <FontAwesomeIcon onClick={onSearch} icon={faMagnifyingGlass} />
      <FontAwesomeIcon onClick={onReel} icon={faCirclePlay} />
      <FontAwesomeIcon onClick={onMessage} icon={faPaperPlane} />
      <img
        onClick={toProfile}
        src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + image}
      />
      <div className={styleFooter.noDiv}>
        {showError && <ErrorHandler onHide={hideError} message={errMessage} />}
      </div>
    </div>
  );
};

export default Footer;
