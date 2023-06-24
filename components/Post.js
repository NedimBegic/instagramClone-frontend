import { useState } from "react";
import stylePost from "./Post.module.css";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import { faFlag as flagSolid } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Post = (props) => {
  const [saveButton, setSaveButton] = useState(false);
  const dateOFPost = (numDate) => {
    // date of creation in miliseconds
    let dateOfCreation = numDate;
    let today = new Date();
    let minutes = Math.floor((today - dateOfCreation) / 1000 / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    if (hours > 24) {
      return days + "days";
    } else if (minutes > 59) {
      return hours + "h";
    } else {
      return minutes + "min";
    }
  };

  // save the post
  const save = () => {
    setSaveButton((prevState) => !prevState);
  };

  // Liked by
  let liked =
    props.post.whoLiked.length == 0
      ? "No likes"
      : props.post.whoLiked.length == 1
      ? props.post.whiLiked[0] + " liked"
      : `Liked by ${props.post.whoLiked[0]} and ${
          props.post.whoLiked.length - 1
        } others`;
  // Comments
  let comments =
    props.post.comment.length == 0
      ? `Write first comment`
      : `View all ${props.post.comment.length} comments`;

  return (
    <li className={stylePost.li} key={props.post.id}>
      <div className={stylePost.creator}>
        <img
          src={
            process.env.NEXT_PUBLIC_SITE + "/uploads/" + props.post.user.photo
          }
        />
        <h5>{props.post.user.nickName}</h5>
        <span>{"• " + dateOFPost(props.post.createdAt)}</span>
      </div>
      <img
        src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + props.post.photo}
      />
      <span>{props.post.description}</span>
      <div className={stylePost.bellow}>
        <div>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faComment} />
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        {!saveButton ? (
          <FontAwesomeIcon
            className={stylePost.flag}
            onClick={save}
            icon={faFlag}
          />
        ) : (
          <FontAwesomeIcon
            className={stylePost.flag}
            onClick={save}
            icon={flagSolid}
          />
        )}
      </div>
      <p className={stylePost.liked}>{liked}</p>
      <span className={stylePost.comments}>{comments}</span>
    </li>
  );
};

export default Post;
