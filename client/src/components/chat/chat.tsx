import React from "react";
import ChatInput from "./chat_input";
import Messages from "./messages";
import styles from "../../styles/chat/chat.module.scss";

const Chat = () => {
  return (
    <div className={styles.container}>
      <Messages />
      <ChatInput maxRows={5} />
    </div>
  );
};

export default Chat;
