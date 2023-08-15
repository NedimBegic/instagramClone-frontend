import { useState, useEffect, useContext } from "react";
import Context from "@/store/createContext";
import styleFeed from "./Feed.module.css";
import Post from "./Post";
import Comments from "@/components/Comments";
import AddPost from "@/ChildComponents/AddPost";
import UserList from "@/ChildComponents/UserList";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [comments, setComments] = useState(false);
  const { posting, togglePost } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/post`);
      const data = await res.json();
      setFeed(data.data.reverse());
    };
    fetchData();
  }, [posting]);

  const openComments = () => {
    setComments((prevState) => !prevState);
  };

  return (
    <div className={styleFeed.all}>
      <main>
        {posting && <AddPost />}
        {comments && <Comments toggleComments={openComments} />}
        <UserList />
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
