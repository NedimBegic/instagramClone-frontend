import styleComment from "./Comment.module.css";
import { useState, useEffect } from "react";

const Comment = (props) => {
  const [post, setPost] = useState([]);
  const [isComment, setIsComment] = useState("Loading...");

  /* Get the single post  */
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE}/comment/${props.postId}`
      );
      const data = await res.json();
      setPost(data.data);
      if (post.length == 0) {
        setIsComment("No comments...");
      }
    };
    fetchData();
  }, []);

  const loading = <p className={styleComment.loading}>{isComment}</p>;

  /* Creating time for comments when its posted */
  const dateOfPost = (createdAt) => {
    const myTimeZone = new Date(createdAt).toLocaleString(undefined, {
      timeZone: "Europe/Sarajevo",
    });
    const milisecondsPost = new Date(myTimeZone).getTime();
    const milisecondsToday = new Date().getTime();
    let minutes = Math.floor((milisecondsToday - milisecondsPost) / 1000 / 60);
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
  return (
    <ul className={styleComment.ul}>
      {post.length > 0
        ? post.map((item) => (
            <li key={item.id}>
              <div>
                {
                  <img
                    src={
                      process.env.NEXT_PUBLIC_SITE +
                      "/uploads/" +
                      item.user[0].photo
                    }
                  />
                }
              </div>
              <div>
                <p>
                  <b>{item.author}</b>
                  &#160;{item.comment}
                </p>
                <span>{dateOfPost(item.createdAt)}</span>
              </div>
            </li>
          ))
        : loading}
    </ul>
  );
};

export default Comment;
