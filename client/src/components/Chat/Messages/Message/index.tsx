import React from "react";
import { Message as M } from "@/redux/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/redux/auth";
import styles from "./styles.module.scss";

type IMessageProps = {
  message: M;
};

const Message: React.FC<IMessageProps> = ({ message }) => {
  const { users } = useSelector((state: RootState) => state.auth);
  return (
    <div className={styles.message}>
      <span
        style={{
          color: users.find((u: User) => u.id === message.id)?.rgb,
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
