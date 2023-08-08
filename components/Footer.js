import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faHouse,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import styleFooter from "./Footer.module.css";
import {
  faPaperPlane,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorHandler from "@/ChildComponents/ErrorHandler";
import More from "@/ChildComponents/More";

const Footer = () => {
  const router = useRouter();
  const photo = Cookies.get("photo");
  const logedUser = Cookies.get("nickName");
  const [image, setImage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [more, setMore] = useState(false);

  useEffect(() => {
    setImage(photo);
  }, [image, setImage]);

  const toProfile = () => {
    router.push(`/${logedUser}`);
  };

  const refresh = () => {
    window.location.reload(true);
  };
  const goFeed = () => {
    router.push("/");
    console.log("he");
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

  const toggleMore = () => {
    setMore((prevState) => !prevState);
  };

  return (
    <div className={styleFooter.div}>
      <article className={styleFooter.tablet} onClick={refresh}>
        <FontAwesomeIcon className={styleFooter.noTablet} icon={faInstagram} />
        <p className={styleFooter.insta}>Instagram</p>
      </article>
      <div onClick={goFeed}>
        <FontAwesomeIcon icon={faHouse} />
        <p className={styleFooter.destop}>Home</p>
      </div>
      <div onClick={onSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <p className={styleFooter.destop}>Explore</p>
      </div>
      <div onClick={onReel}>
        <FontAwesomeIcon icon={faCirclePlay} />
        <p className={styleFooter.destop}>Reels</p>
      </div>
      <div onClick={onMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />
        <p className={styleFooter.destop}>Messages</p>
      </div>
      <div onClick={toProfile}>
        <img src={userPhoto} />
        <p className={styleFooter.destop}>Profile</p>
      </div>

      <div className={styleFooter.noDiv}>
        {showError && <ErrorHandler onHide={hideError} message={errMessage} />}
      </div>
      <article onClick={toggleMore} className={styleFooter.tablet}>
        {more && <More onHide={toggleMore} />}
        <FontAwesomeIcon icon={faBars} />
        <p className={styleFooter.destop}>More</p>
      </article>
    </div>
  );
};

export default Footer;
