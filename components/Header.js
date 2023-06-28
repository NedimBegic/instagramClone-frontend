import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSquarePlus,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styleHeader from "./Header.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Header = () => {
  const [showDiv, setShowDiv] = useState(false);
  const router = useRouter();

  const onShowDivHandler = () => {
    setShowDiv((prevState) => !prevState);
  };

  const onLogOut = () => {
    Cookies.remove("token");
    router.push("/login");
    setShowDiv(false);
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
        <FontAwesomeIcon icon={faSquarePlus} />
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  );
};

export default Header;
