import stylePhoto from "./UploadProfilePhoto.module.css";
import { Backdrop } from "./ErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState, useContext } from "react";
import Context from "@/store/createContext";

const UploadProfilePhoto = (props) => {
  const [photo, setPhoto] = useState();
  const router = useRouter();

  const takePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", photo);
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE + `/user/${props.profileId}/photo`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          /*  Accept: "application/json",
          "Content-Type": "application/json", */
        },
        body: formData,
      }
    );
    // ! change photo in footer who uses Cookies data
    const getNewPhoto = await fetch(
      process.env.NEXT_PUBLIC_SITE + `/user/${Cookies.get("nickName")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    let newPhoto = await getNewPhoto.json();
    // change photo in the footer
    Cookies.set("photo", `${newPhoto.data.photo}`, { expires: 7 });
    props.showUploadHandler();
    router.push(`/${Cookies.get("nickName")}`);
  };
  return (
    <div>
      <Backdrop onHide={props.showUploadHandler} />
      <div className={stylePhoto.all}>
        <div className={stylePhoto.head}>
          <FontAwesomeIcon
            onClick={props.viewLikes}
            className={stylePhoto.arrow}
            icon={faChevronLeft}
          />
          <h4>Change profile photo</h4>
        </div>
        <form onSubmit={onSubmitHandler}>
          <input
            onChange={takePhoto}
            type="file"
            placeholder="Upload profile photo"
          />
          <button type="submit">Upload Photo</button>
        </form>
      </div>
    </div>
  );
};

export default UploadProfilePhoto;
