import { Backdrop } from "./ErrorHandler";
import styleMore from "./More.module.css";

const More = (props) => {
  return (
    <div>
      <Backdrop onHide={props.onhide} />
      <div className={styleMore.all}>
        <button>Create post</button>
        <button>Log out</button>
      </div>
    </div>
  );
};

export default More;
