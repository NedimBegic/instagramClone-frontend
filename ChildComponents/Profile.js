import styleProfile from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEllipsis,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../public/avatar.jpg";
import ErrorHandler from "./ErrorHandler";
import { useState, useContext } from "react";
import AddPost from "./AddPost";
import { useRouter } from "next/router";
import Context from "@/store/createContext";

const Profile = (props) => {
  const { posting, togglePost } = useContext(Context);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
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
  return (
    <article className={styleProfile.all}>
      {error && <ErrorHandler onHide={hideError} message={message} />}
      {posting && <AddPost />}
      <div className={styleProfile.head}>
        <FontAwesomeIcon
          onClick={backToFeed}
          className={styleProfile.arrow}
          icon={faChevronLeft}
        />
        <h4>{props.profile.nickName}</h4>
      </div>
      <div className={styleProfile.pic}>
        <img
          src={
            process.env.NEXT_PUBLIC_SITE + "/uploads/" + props.profile.photo ||
            avatar
          }
        />
        <div className={styleProfile.info}>
          <div>
            <p>{props.profile.nickName}</p>
            {!props.isYours && (
              <FontAwesomeIcon
                onClick={showError}
                className={styleProfile.dots}
                icon={faEllipsis}
              />
            )}
          </div>
          {!props.isYours && (
            <div>
              <button onClick={showError}>Follow</button>
              <button onClick={showError}>Message</button>
              <FontAwesomeIcon
                onClick={showError}
                className={styleProfile.add}
                icon={faUserPlus}
              />
            </div>
          )}
          {props.isYours && (
            <div>
              <button>Edit Profile</button>
              <button onClick={showPosting}>Add Post</button>
            </div>
          )}
        </div>
      </div>
      <article>
        <h5>{props.profile.name}</h5>
        <p>{props.profile.description || "No description added"}</p>
      </article>
      <section>
        <div className={styleProfile.posts}>
          <p>posts:</p> <h5>{props.profile.post.length}</h5>
        </div>
        <div>
          {props.profile.post ? (
            props.profile.post.map((post, i) => (
              <img
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
