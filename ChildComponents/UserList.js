import styleUser from "./UserList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/user`);
      const data = await res.json();
      setUsers(data.data);
    };
    getUsers();
  }, []);

  const userPhoto = (pic) => {
    let photo;
    if (pic == "no-photo.jpg") {
      photo = "/avatar.jpg";
    } else {
      photo = process.env.NEXT_PUBLIC_SITE + "/uploads/" + pic;
    }
    return photo;
  };

  const visitProfile = (nickName) => {
    router.push(`/${nickName}`);
  };

  return (
    <ul className={styleUser.ulUser}>
      {users.map((user) => (
        <li key={user._id} onClick={visitProfile.bind(null, user.nickName)}>
          <img src={userPhoto(user.photo)} />
          <p>{user.nickName}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
