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

  // check if the user has updated his photo
  let userPhoto;
  if (image == "no-photo.jpg") {
    userPhoto = "/avatar.jpg";
  } else {
    userPhoto = process.env.NEXT_PUBLIC_SITE + "/uploads/" + image;
  }

  return (
    <div className={styleFooter.div}>
      <div>
        <FontAwesomeIcon onClick={goFeed} icon={faHouse} />{" "}
        <p className={styleFooter.destop}>Home</p>
      </div>
      <div>
        <FontAwesomeIcon onClick={onSearch} icon={faMagnifyingGlass} />{" "}
        <p className={styleFooter.destop}>Explore</p>
      </div>
      <div>
        <FontAwesomeIcon onClick={onReel} icon={faCirclePlay} />{" "}
        <p className={styleFooter.destop}>Reels</p>
      </div>
      <div>
        <FontAwesomeIcon onClick={onMessage} icon={faPaperPlane} />
        <p className={styleFooter.destop}>Messages</p>
      </div>
      <div>
        <img onClick={toProfile} src={userPhoto} />
        <p className={styleFooter.destop}>Profile</p>
      </div>

      <div className={styleFooter.noDiv}>
        {showError && <ErrorHandler onHide={hideError} message={errMessage} />}
      </div>
    </div>
  );
};

export default Footer;
