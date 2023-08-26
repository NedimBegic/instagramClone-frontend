import Profile from "@/ChildComponents/Profile";
import Footer from "@/components/Footer";
import style from "./index.module.css";
const User = (props) => {
  if (!props.user) {
    // Handle the case where data is not available yet
    return <div className={style.loading}>Loading...</div>;
  }
  console.log(props.user.data);
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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTNiOGM5MWUzYzIyNGU2NDI1YTM3NCIsImlhdCI6MTY5MjY0NzAyNiwiZXhwIjoxNjk1MjM5MDI2fQ.I78P0LaFxbLqdlBUTZw8kqS0EjNQf-xAliLmTYjgg3k`,
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
