import React from "react";
import Chat from "./Chat";
import styles from "./styles.module.scss";

const Chats = () => {
  return (
    <div className={styles.container}>
      <Chat />
    </div>
  );
};

export default Chats;
