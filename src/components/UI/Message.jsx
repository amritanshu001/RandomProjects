import styles from "./Message.module.css";

const Message = (props) => {
  return (
    <div className={`${styles.message} ${props.className}`}>
      <p>{props.children}</p>
    </div>
  );
};

export default Message;
