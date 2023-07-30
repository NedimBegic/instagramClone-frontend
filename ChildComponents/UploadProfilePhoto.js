import stylePhoto from "./UploadProfilePhoto.module.css";
import { Backdrop } from "./ErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const UploadProfilePhoto = (props) => {
  return (
    <div>
      <Backdrop />
      <div className={stylePhoto.all}>
        <div className={stylePhoto.head}>
          <FontAwesomeIcon
            onClick={props.viewLikes}
            className={stylePhoto.arrow}
            icon={faChevronLeft}
          />
          <h4>Change profile photo</h4>
        </div>
        <form>
          <input type="file" placeholder="Upload profile photo" />
          <button type="submit">Upload Photo</button>
        </form>
      </div>
    </div>
  );
};

export default UploadProfilePhoto;
