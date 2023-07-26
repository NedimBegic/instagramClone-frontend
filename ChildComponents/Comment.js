import styleComment from "./Comment.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Comment = (props) => {
  const router = useRouter();
  const loading = <p className={styleComment.loading}>{props.isComment}</p>;

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

  const visitProfile = (author) => {
    router.push(`/${author}`);
  };
  return (
    <ul className={styleComment.ul}>
      {props.post.length > 0
        ? props.post.reverse().map((item) => (
            <li key={item.id}>
              <div>
                {
                  <img
                    onClick={visitProfile.bind(null, item.author)}
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
