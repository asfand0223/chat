"use client";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { setChatInput } from "@/redux/chat";
import { getSignalRConnection, sendMessage } from "@/utils/signalr";

interface IChatInputProps {
  maxRows: number;
}

const ChatInput: React.FC<IChatInputProps> = ({ maxRows }) => {
  const connection = getSignalRConnection();
  const { chat_input } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handletextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textArea = e.target;
    const lineHeight = parseFloat(
      getComputedStyle(textArea).lineHeight || "20",
    );
    const maxHeight = lineHeight * maxRows;

    textArea.style.height = "auto";
    const newHeight = Math.min(maxHeight, textArea.scrollHeight);
    textArea.style.height = `${newHeight}px`;

    dispatch(setChatInput({ chat_input: e.target.value }));
  };
  const handleSubmit = async () => {
    if (chat_input.length <= 0 || !connection || !connection.connectionId)
      return;
    dispatch(setChatInput({ chat_input: "" }));
    await sendMessage({
      connectionId: connection.connectionId,
      message: chat_input,
    });
  };
  return (
    <div className={styles.container}>
      <textarea
        ref={textAreaRef}
        value={chat_input}
        rows={1}
        onChange={handletextAreaChange}
        className={styles.textarea}
      ></textarea>
      <button
        className={`${styles.sendButton} ${chat_input.length <= 0 && styles.disabled}`}
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
