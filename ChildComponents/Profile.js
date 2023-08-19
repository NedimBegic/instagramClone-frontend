import styleProfile from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEllipsis,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ErrorHandler from "./ErrorHandler";
import { useState, useContext, useEffect } from "react";
import AddPost from "./AddPost";
import { useRouter } from "next/router";
import Context from "@/store/createContext";
import UpdateProfile from "./UpdateProfile";
import UploadProfilePhoto from "./UploadProfilePhoto";
import Cookies from "js-cookie";

const Profile = (props) => {
  const { posting, togglePost } = useContext(Context);
  const router = useRouter();
  const photo = Cookies.get("photo");
  const [image, setImage] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [description, setDescription] = useState(props.profile.description);

  console.log(props.profile);

  // declare is this profile from logged user
  let isYours = Cookies.get("nickName") == props.profile.nickName;

  useEffect(() => {
    setImage(photo);
  }, [image, setImage, description, setDescription]);

  // check if the user has updated his photo
  let userPhoto;
  if (image == "no-photo.jpg") {
    userPhoto = "/avatar.jpg";
  } else {
    userPhoto = process.env.NEXT_PUBLIC_SITE + "/uploads/" + image;
  }
  const hideError = () => {
    setError(false);
  };

  const showError = () => {
    setMessage("No functionality yet");
    setError(true);
  };

  const showPosting = () => {
    togglePost();
  };

  const backToFeed = () => {
    router.push("/");
  };

  const edit = () => {
    setEditProfile((prevState) => !prevState);
  };

  const showUploadHandler = () => {
    setShowUpload((prevState) => !prevState);
    setEditProfile(false);
  };

  return (
    <article className={styleProfile.all}>
      {error && <ErrorHandler onHide={hideError} message={message} />}
      {posting && <AddPost />}

      {editProfile && (
        <UpdateProfile
          updateInfo={setDescription}
          profilePhoto={showUploadHandler}
          edit={edit}
          profile={props.profile}
        />
      )}
      {showUpload && (
        <UploadProfilePhoto
          profileId={props.profile._id}
          showUploadHandler={showUploadHandler}
        />
      )}
      <div className={styleProfile.head}>
        <FontAwesomeIcon
          onClick={backToFeed}
          className={styleProfile.arrow}
          icon={faChevronLeft}
        />
        <h4>{props.profile.nickName}</h4>
      </div>
      <div className={styleProfile.pic}>
        <img src={userPhoto} />
        <div className={styleProfile.info}>
          <div className={styleProfile.nameDot}>
            <p>{props.profile.nickName}</p>
            {!isYours && (
              <FontAwesomeIcon
                onClick={showError}
                className={styleProfile.dots}
                icon={faEllipsis}
              />
            )}
          </div>
          {!isYours && (
            <div className={styleProfile.inLine}>
              <button onClick={showError}>Follow</button>
              <button onClick={showError}>Message</button>
              <FontAwesomeIcon
                onClick={showError}
                className={styleProfile.add}
                icon={faUserPlus}
              />
            </div>
          )}
          {isYours && (
            <div className={styleProfile.inLine}>
              <button onClick={edit}>Edit Profile</button>
              <button onClick={showPosting}>Add Post</button>
            </div>
          )}
        </div>
      </div>
      <article>
        <h5>{props.profile.name}</h5>
        <p>{description || "No description added"}</p>
      </article>
      <section>
        <div className={styleProfile.posts}>
          <p>posts:</p> <h5>{props.profile.post.length}</h5>
        </div>
        <div>
          {props.profile.post.length > 0 ? (
            props.profile.post.map((post, i) => (
              <img
                onClick={() => router.push(`/post/${post._id}`)}
                key={i}
                src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + post.photo}
              />
            ))
          ) : (
            <p>No posts yet</p>
          )}
        </div>
      </section>
    </article>
  );
};

export default Profile;
