import styleUpdate from "./UpdateProfile.module.css";
import { Backdrop } from "./ErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const UpdateProfile = (props) => {
  return (
    <div>
      <Backdrop onHide={props.edit} />
      <div className={styleUpdate.all}>
        <div className={styleUpdate.head}>
          <FontAwesomeIcon
            onClick={props.edit}
            className={styleUpdate.arrow}
            icon={faChevronLeft}
          />
          <h4>Edit Profile</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
