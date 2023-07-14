import { useState, useEffect, useContext } from "react";
import stylePost from "./Post.module.css";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import {
  faFlag as flagSolid,
  faHeart as heart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Context from "@/store/createContext";

const Post = (props) => {
  const [saveButton, setSaveButton] = useState(false);
  const [clickLike, setClickLike] = useState(false);
  const [likeArray, setLikeArray] = useState(props.post.whoLiked);
  const [numOfComments, setNumOfComments] = useState(props.post.comment.length);
  const router = useRouter();
  const logedUser = Cookies.get("nickName");
  const { changePostId } = useContext(Context);

  /* Did the logged user liked the post ( used for initial render to remember the like) */
  useEffect(() => {
    if (likeArray.includes(logedUser)) {
      setClickLike(true);
    }
  }, []);
  /* if clicked like add to array */
  useEffect(() => {
    if (clickLike) {
      setLikeArray((prevState) => [logedUser, ...prevState]);
    } else {
      setLikeArray((prevState) => prevState.filter((e) => e !== logedUser));
    }
  }, [clickLike]);

  /* Calculating the date of post */
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

  let liked =
    likeArray.length == 0
      ? "No likes"
      : likeArray.length == 1
      ? likeArray[0] + " liked this"
      : likeArray[0] + ` and ${likeArray.length - 1} more likes this`;

  // Comments
  let comments =
    props.post.comment.length == 0
      ? `Write first comment`
      : `View all ${numOfComments} comments`;

  // Likes
  const postLike = async (e) => {
    // send like
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE + `/post/${props.post._id}/like`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    setClickLike((prevState) => !prevState);
  };

  /* Open the comments */
  const goToComments = () => {
    changePostId(props.post.id);
    props.openComments();
  };

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
        onClick={goToComments}
        src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + props.post.photo}
      />
      <span>{props.post.description}</span>
      <div className={stylePost.bellow}>
        <div>
          {clickLike ? (
            <FontAwesomeIcon
              onClick={postLike}
              style={{ color: "red" }}
              icon={heart}
            />
          ) : (
            <FontAwesomeIcon onClick={postLike} icon={faHeart} />
          )}
          <FontAwesomeIcon onClick={goToComments} icon={faComment} />
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
      <span onClick={goToComments} className={stylePost.comments}>
        {comments}
      </span>
    </li>
  );
};

export default Post;
