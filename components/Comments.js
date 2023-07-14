import styleComment from "./Comments.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import Context from "@/store/createContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

/* Backkdrop component */
const Backdrop = () => {
  return <div className={styleComment.backdrop}></div>;
};

/* Content component */
const Content = (props) => {
  const photo = Cookies.get("photo");
  const { postId } = useContext(Context);
  const [post, setPost] = useState();
  const buttonRef = useRef();
  const inputRef = useRef();

  /* Get the single post  */
  /*  UNFINISHED !!!!!!!!!!!!!!!!!!!!!!!!! */
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/post/${postId}`);
      const data = await res.json();
      setPost(data.data);
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
    e.target.reset();
  };
  /*  Chaniging opacity of button on input focus */
  const buttonShow = () => {
    buttonRef.current.style.opacity = 1;
  };
  const buttonHide = () => {
    buttonRef.current.style.opacity = 0.4;
  };
  return (
    <div className={styleComment.content}>
      <div className={styleComment.pic}>picture</div>
      <div className={styleComment.right}>
        <div className={styleComment.head}>
          <FontAwesomeIcon
            onClick={props.toggleComments}
            className={styleComment.arrow}
            icon={faChevronLeft}
          />
          <h4>Comments</h4>
        </div>
        <section className={styleComment.postComment}>
          <div>
            {" "}
            <img
              src={process.env.NEXT_PUBLIC_SITE + "/uploads/" + photo}
              alt="picture of loged user"
            />
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
      <Backdrop />
      <Content toggleComments={props.toggleComments} />
    </div>
  );
};

export default Comments;
