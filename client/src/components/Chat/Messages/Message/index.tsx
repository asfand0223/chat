import React from "react";
import { Message as M } from "@/redux/chat";
import styles from "./styles.module.scss";

type IMessageProps = {
  message: M;
};

const Message: React.FC<IMessageProps> = ({ message }) => {
  return (
    <div className={styles.message}>
      <span
        style={{
          color: message.rgb,
        }}
      >
        {message.id.toLowerCase()}
      </span>
      <span>: </span>
      <span>{message.content}</span>
    </div>
  );
};

export default Message;
