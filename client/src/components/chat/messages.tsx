"use client";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Message as M } from "@/redux/chat";
import Message from "./message";
import styles from "../../styles/chat/messages.module.scss";

const Messages = () => {
  const { messages, chat_input } = useSelector(
    (state: RootState) => state.chat,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, chat_input]);
  return (
    <div className={styles.container} ref={containerRef}>
      {messages &&
        messages.map((message: M, index: number) => (
          <Message key={index} message={message} />
        ))}
    </div>
  );
};

export default Messages;
