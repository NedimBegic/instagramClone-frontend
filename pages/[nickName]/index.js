import Profile from "@/ChildComponents/Profile";
import Footer from "@/components/Footer";
import style from "./index.module.css";
const User = (props) => {
  return (
    <div className={style.allDiv}>
      <Profile profile={props.user.data} isYours={props.user.hisProfile} />
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  let data;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/user`);

  data = await res.json();

  return {
    // property where we configure if every obj has a path, seting it to false we configure that every path has his value
    // it is pre-rendering some most visited contents and other is rendering on user request from DB dynamicaly
    fallback: false,
    // its a must have array in which we have obj
    paths: data.data.map((user) => ({
      // we insert a must have params and obj of meetup id
      params: { nickName: user.nickName },
    })),
  };
}

export async function getStaticProps(context) {
  const nickName = context.params.nickName;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/user/${nickName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODc1N2Q2MDUwYTFiYTZkOGU4NjNmMCIsImlhdCI6MTY4OTUyNDA2NywiZXhwIjoxNjkyMTE2MDY3fQ.tjrPoHWrQs32U2Kymcow66X5Caz0K3q4I5vXfTpvs7g`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return {
    props: {
      // we send this as props to this component
      user: {
        ...data,
      },
    },
  };
}

export default User;
