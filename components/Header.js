import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSquarePlus,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styleHeader from "./Header.module.css";
const Header = () => {
  const [showDiv, setShowDiv] = useState(false);

  const onShowDivHandler = () => {
    setShowDiv((prevState) => !prevState);
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
          <div className={styleHeader.showDiv}>
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
