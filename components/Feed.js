import { useState, useEffect } from "react";
import styleFeed from "./Feed.module.css";
import Post from "./Post";
import Comments from "@/components/Comments";
import { useRouter } from "next/router";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [comments, setComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/post`);
      const data = await res.json();
      setFeed(data.data);
    };
    fetchData();
  }, []);

  const openComments = () => {
    setComments((prevState) => !prevState);
  };

  return (
    <div>
      <main>
        {comments && <Comments toggleComments={openComments} />}
        <ul className={styleFeed.ul}>
          {feed.map((post) => (
            <Post openComments={openComments} key={post.id} post={post} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Feed;
