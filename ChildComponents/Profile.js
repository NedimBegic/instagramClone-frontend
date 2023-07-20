import styleProfile from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEllipsis,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../public/avatar.jpg";

const Profile = (props) => {
  return (
    <article className={styleProfile.all}>
      <div className={styleProfile.head}>
        <FontAwesomeIcon
          onClick={props.toggleComments}
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
                className={styleProfile.dots}
                icon={faEllipsis}
              />
            )}
          </div>
          {!props.isYours && (
            <div>
              <button>Follow</button>
              <button>Message</button>
              <FontAwesomeIcon className={styleProfile.add} icon={faUserPlus} />
            </div>
          )}
          {props.isYours && (
            <div>
              <button>Edit Profile</button>
              <button>Add Post</button>
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
