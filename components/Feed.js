import { useState, useEffect } from "react";
import styleFeed from "./Feed.module.css";
import Post from "./Post";
const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/post`);
      const data = await res.json();
      console.log(data.data);
      setFeed(data.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <main>
        <ul className={styleFeed.ul}>
          {feed.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Feed;
