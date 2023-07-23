import style from "./AddPost.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useContext } from "react";
import Cookies from "js-cookie";
import Context from "@/store/createContext";
import { useRouter } from "next/router";

const Backdrop = (props) => {
  return <div onClick={props.onHide} className={style.backdrop}></div>;
};

const AddPost = (props) => {
  const router = useRouter();
  const textRef = useRef();
  const [file, setFile] = useState();
  const { togglePost } = useContext(Context);

  const takeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let description = textRef.current.value;
    let formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    const response = await fetch(process.env.NEXT_PUBLIC_SITE + `/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        /*  Accept: "application/json",
        "Content-Type": "multipart/form-data", */
      },
      body: formData,
    });
    const data = response.json();
    console.log(data);
    togglePost();
    router.push("/");
  };
  return (
    <div>
      <Backdrop onHide={togglePost} />
      <form onSubmit={onSubmit} className={style.form}>
        <FontAwesomeIcon
          onClick={togglePost}
          className={style.x}
          icon={faXmark}
        />
        <input onChange={takeFile} type="file" placeholder="Choose a file" />
        <textarea
          ref={textRef}
          type="text"
          placeholder="Write a description"
        ></textarea>
        <button type="submit">Share</button>
      </form>
    </div>
  );
};

export default AddPost;
