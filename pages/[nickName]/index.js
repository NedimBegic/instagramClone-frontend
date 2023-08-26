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
    fallback: true,
    paths: data.data.map((user) => ({
      params: { nickName: user.nickName },
    })),
  };
}

export async function getStaticProps(context) {
  const nickName = context.params.nickName;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE}/user/${nickName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTY2NThlN2QxYmE4NDY5ZGQ1MzI0ZSIsImlhdCI6MTY5MjgyMDg3OCwiZXhwIjoxNjk1NDEyODc4fQ.omelLFXK-6Mi4QluoKlBQfYkVdKNK0_f0fM0nbjKhmc`,
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
    revalidate: 2,
  };
}

export default User;
