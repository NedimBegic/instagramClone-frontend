import styleUpdate from "./UpdateProfile.module.css";
import { Backdrop } from "./ErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const UpdateProfile = (props) => {
  const descRef = useRef();
  const nameRef = useRef();
  const router = useRouter();

  const changeInfoHandler = async (e) => {
    e.preventDefault();
    const data = {
      description: descRef.current.value,
      name: nameRef.current.value,
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE + `/user/${props.profile.nickName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    props.edit();
    router.push(`/${props.profile.nickName}`);
  };

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
          <form onSubmit={changeInfoHandler}>
            <h5>Bio</h5>
            <textarea
              ref={descRef}
              defaultValue={props.profile.description}
              name="description"
              placeholder="Change description"
            ></textarea>
            <h5>Name</h5>

            <input
              ref={nameRef}
              defaultValue={props.profile.name}
              name="name"
              placeholder="Change name"
            />
            <button type="submit">Change info</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
