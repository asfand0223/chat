"use client";
import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Message as M } from "@/redux/chat";
import Message from "./Message";

const Messages = () => {
  const { messages } = useSelector((state: RootState) => state.chat);
  return (
    <div className={styles.container}>
      {messages &&
        messages.map((message: M, index: number) => (
          <Message key={index} message={message} />
        ))}
    </div>
  );
};

export default Messages;
