import { Backdrop } from "./ErrorHandler";
import styleMore from "./More.module.css";

const More = (props) => {
  return (
    <div>
      <Backdrop onHide={props.onhide} />
      <div className={styleMore.all}>
        <button onClick={props.onPostHandler}>Create post</button>
        <button onClick={props.onLogOut}>Log out</button>
      </div>
    </div>
  );
};

export default More;
