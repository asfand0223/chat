import React from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import styles from "./styles.module.scss";

const Chat = () => {
  return (
    <div className={styles.container}>
      <Messages />
      <ChatInput maxRows={5} />
    </div>
  );
};

export default Chat;
