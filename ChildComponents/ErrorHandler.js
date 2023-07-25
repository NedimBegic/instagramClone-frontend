import styleError from "./ErrorHandler.module.css";

export const Backdrop = (props) => {
  return <div onClick={props.onHide} className={styleError.backdrop}></div>;
};

const Content = (props) => {
  return (
    <div className={styleError.content}>
      <p>{props.message}</p>
      <button onClick={props.onHide}>Ok</button>
    </div>
  );
};

const ErrorHandler = (props) => {
  return (
    <div>
      <Backdrop onHide={props.onHide} />
      <Content onHide={props.onHide} message={props.message} />
    </div>
  );
};

export default ErrorHandler;
