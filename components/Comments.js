import styleComment from "./Comments.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import Context from "@/store/createContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Comment from "@/ChildComponents/Comment";
import Cookies from "js-cookie";

/* Backkdrop component */
const Backdrop = (props) => {
  return (
    <div onClick={props.toggleComments} className={styleComment.backdrop}></div>
  );
};

/* Content component */
const Content = (props) => {
  const photo = Cookies.get("photo");
  const nickaName = Cookies.get("nickName");
  const { postId, postPhoto } = useContext(Context);
  const buttonRef = useRef();
  const inputRef = useRef();
  const [post, setPost] = useState([]);
  const [isComment, setIsComment] = useState("Loading...");

  /* Get the single post  */
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE}/comment/${postId}`
      );
      const data = await res.json();
      setPost(data.data);
      if (post.length == 0) {
        setIsComment("No Comments");
      }
    };
    fetchData();
  }, []);
  /* Put a comment */
  const putComment = (e) => {
    e.preventDefault();
    const postComment = async () => {
      const data = {
        comment: inputRef.current.value,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE}/post/${postId}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    };
    postComment();
    // make the new comment and push it to old
    let newComment = {
      comment: inputRef.current.value,
      createdAt: new Date(),
      author: nickaName,
      id: Math.random(),
      user: [{ photo: photo }],
    };
    setPost((prevState) => [...prevState, newComment]);
    e.target.reset();
  };
  /*  Chaniging opacity of button on input focus */
  const buttonShow = () => {
    buttonRef.current.style.opacity = 1;
  };
  const buttonHide = () => {
    buttonRef.current.style.opacity = 0.4;
  };

  // check if the user has updated his photo
  let userPhoto;
  if (photo == "no-photo.jpg") {
    userPhoto = "/avatar.jpg";
  } else {
    userPhoto = process.env.NEXT_PUBLIC_SITE + "/uploads/" + photo;
  }

  return (
    <div className={styleComment.content}>
      <div className={styleComment.pic}>
        <img src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + postPhoto} />
      </div>
      <div className={styleComment.right}>
        <div className={styleComment.head}>
          <FontAwesomeIcon
            onClick={props.toggleComments}
            className={styleComment.arrow}
            icon={faChevronLeft}
          />
          <h4>Comments</h4>
        </div>
        <Comment postId={postId} post={post} isComment={isComment} />
        <section className={styleComment.postComment}>
          <div>
            {" "}
            <img src={userPhoto} alt="picture of loged user" />
          </div>
          <form onSubmit={putComment}>
            <input
              onFocus={buttonShow}
              onBlur={buttonHide}
              placeholder="Add a comment..."
              ref={inputRef}
            />
            <button type="submit" ref={buttonRef}>
              Post
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

const Comments = (props) => {
  return (
    <div>
      <Backdrop toggleComments={props.toggleComments} />
      <Content toggleComments={props.toggleComments} />
    </div>
  );
};

export default Comments;
