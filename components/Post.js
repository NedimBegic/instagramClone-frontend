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
import Liked from "@/ChildComponents/Liked";
import ErrorHandler from "@/ChildComponents/ErrorHandler";

const Post = (props) => {
  const [saveButton, setSaveButton] = useState(false);
  const [clickLike, setClickLike] = useState(false);
  const [likeArray, setLikeArray] = useState(props.post.whoLiked);
  const [numOfComments, setNumOfComments] = useState(props.post.comment.length);
  const router = useRouter();
  const logedUser = Cookies.get("nickName");
  const [errMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { changePostId, changePostPhoto } = useContext(Context);
  const [openLikes, setOpenLikes] = useState(false);

  /* Did the logged user liked the post ( used for initial render to remember the like) */
  useEffect(() => {
    if (likeArray.includes(logedUser)) {
      setClickLike(true);
    }
  }, [likeArray]);
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
    changePostPhoto(props.post.photo);
    changePostId(props.post.id);
    props.openComments();
  };

  /* Redirect to a profile */
  const openUser = () => {
    router.push(`/${props.post.user.nickName}`);
  };

  const viewLikes = () => {
    setOpenLikes((prevState) => !prevState);
  };

  const goToPost = () => {
    router.push(`/post/${props.post.id}`);
  };

  const onErrorHandler = () => {
    setErrorMessage("No messenger yet");
    setIsError((prevState) => !prevState);
  };

  const style = stylePost.li + " " + props.className;
  return (
    <li className={style} key={props.post.id}>
      {isError && <ErrorHandler message={errMessage} onHide={onErrorHandler} />}
      {openLikes && <Liked viewLikes={viewLikes} users={likeArray} />}
      <div className={stylePost.creator}>
        <img
          onClick={openUser}
          src={
            process.env.NEXT_PUBLIC_SITE + "/uploads/" + props.post.user.photo
          }
        />
        <h5 onClick={openUser}>{props.post.user.nickName}</h5>
        <span>{"• " + dateOFPost(props.post.createdAt)}</span>
      </div>
      <img
        onClick={goToPost}
        src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + props.post.photo}
      />
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
          <FontAwesomeIcon onClick={onErrorHandler} icon={faPaperPlane} />
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
      <p onClick={viewLikes} className={stylePost.liked}>
        {liked}
      </p>
      <div className={stylePost.desDiv}>
        {props.post.description ? (
          <span className={stylePost.desc}>
            <b> {props.post.user.nickName}</b>
            {" " + props.post.description}
          </span>
        ) : (
          ""
        )}
        <span onClick={goToComments} className={stylePost.comments}>
          {comments}
        </span>
      </div>
    </li>
  );
};

export default Post;
