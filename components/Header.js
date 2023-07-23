import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSquarePlus,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Context from "@/store/createContext";
import styleHeader from "./Header.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import AddPost from "@/ChildComponents/AddPost";

const Header = () => {
  const [showDiv, setShowDiv] = useState(false);
  const router = useRouter();
  const { posting, togglePost } = useContext(Context);
  const onShowDivHandler = () => {
    setShowDiv((prevState) => !prevState);
  };

  const onLogOut = () => {
    Cookies.remove("token");
    router.push("/login");
    setShowDiv(false);
  };

  const showPosting = () => {
    togglePost();
  };

  return (
    <div className={styleHeader.div}>
      <div>
        <h2>Instagram</h2>
        <FontAwesomeIcon
          onClick={onShowDivHandler}
          className={styleHeader.downArrow}
          icon={faChevronDown}
        />
        {showDiv && (
          <div onClick={onLogOut} className={styleHeader.showDiv}>
            <p>Log out</p>
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
        )}
      </div>
      <div>
        <FontAwesomeIcon onClick={showPosting} icon={faSquarePlus} />
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  );
};

export default Header;
