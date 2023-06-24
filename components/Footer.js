import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styleFooter from "./Footer.module.css";
import {
  faPaperPlane,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  return (
    <div className={styleFooter.div}>
      <FontAwesomeIcon icon={faHouse} />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <FontAwesomeIcon icon={faCirclePlay} />
      <FontAwesomeIcon icon={faPaperPlane} />
      <img style={{ border: "1px solid black" }} />
    </div>
  );
};

export default Footer;
