import React from "react";
import { Message as M } from "@/redux/chat";
import styles from "../../styles/chat/message.module.scss";

type IMessageProps = {
  message: M;
};

const Message: React.FC<IMessageProps> = ({ message }) => {
  return (
    <div className={styles.message}>
      <span
        style={{
          color: message.colour,
        }}
      >
        {message.connection_id.toLowerCase()}
      </span>
      <span>: </span>
      <span>{message.content}</span>
    </div>
  );
};

export default Message;
