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
        <div className={styleUpdate.pic}>
          <div>
            <img
              src={
                process.env.NEXT_PUBLIC_SITE +
                  "/uploads/" +
                  props.profile.photo || avatar
              }
            />
          </div>
          <div>
            <h5>{props.profile.nickName}</h5>
            <button>Change profile picture</button>
          </div>
        </div>
        <div className={styleUpdate.info}>
          <form>
            <h5>Bio</h5>
            <textarea
              defaultValue={props.profile.description}
              name="description"
              placeholder="Change description"
            ></textarea>
            <h5>Name</h5>

            <input
              defaultValue={props.profile.name}
              name="name"
              placeholder="Change name"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
