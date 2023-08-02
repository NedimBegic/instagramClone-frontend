import Post from "@/components/Post";
import { useState } from "react";
import Comments from "@/components/Comments";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styleList from "./PostId.module.css";

const SinglePost = (props) => {
  const [comments, setComments] = useState(false);
  const openComments = () => {
    setComments((prevState) => !prevState);
  };

  return (
    <div>
      <Header />
      {comments && <Comments toggleComments={openComments} />}
      <Post
        className={styleList.list}
        openComments={openComments}
        post={props.post.data}
      />
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  let data;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/post`);

  data = await res.json();

  return {
    // property where we configure if every obj has a path, seting it to false we configure that every path has his value
    // it is pre-rendering some most visited contents and other is rendering on user request from DB dynamicaly
    fallback: false,
    // its a must have array in which we have obj
    paths: data.data.map((post) => ({
      // we insert a must have params and obj of meetup id
      params: { postId: post._id },
    })),
  };
}

export async function getStaticProps({ params }) {
  const postId = params.postId;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/post/${postId}`);
  const data = await res.json();

  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
