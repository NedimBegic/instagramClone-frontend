import styleLiked from "./Liked.module.css";
import { Backdrop } from "./ErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

const Liked = (props) => {
  const [user, setUser] = useState(props.users);

  return (
    <div>
      <Backdrop onHide={props.viewLikes} />
      <div className={styleLiked.likes}>
        <div className={styleLiked.head}>
          <FontAwesomeIcon
            onClick={props.viewLikes}
            className={styleLiked.arrow}
            icon={faChevronLeft}
          />
          <h4>Likes</h4>
        </div>
        <ul>
          {user.length > 0 ? (
            user.map((item) => (
              <li key={item}>
                <p>{item}</p>
                <Link className={styleLiked.button} href={`/${item}`}>
                  Visit profile
                </Link>
              </li>
            ))
          ) : (
            <p>No one liked this post </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Liked;
