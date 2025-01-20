"use client";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setChatInput } from "@/redux/chat";
import { getSignalRConnection, sendMessage } from "@/utils/signalr";
import styles from "../../styles/chat/chat_input.module.scss";

interface IChatInputProps {
  maxRows: number;
}

const ChatInput: React.FC<IChatInputProps> = ({ maxRows }) => {
  const connection = getSignalRConnection();
  const { chat_input } = useSelector((state: RootState) => state.chat);
  const { chatter } = useSelector((state: RootState) => state.chat_hub);
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
    if (
      !chatter ||
      chat_input.trim().length <= 0 ||
      !connection ||
      !connection.connectionId
    )
      return;
    dispatch(setChatInput({ chat_input: "" }));
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }
    await sendMessage({
      message: {
        connection_id: chatter.connection_id,
        group: chatter.group,
        content: chat_input,
        colour: chatter.colour,
      },
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
        className={`${styles.sendButton} ${chat_input.trim().length <= 0 && styles.disabled}`}
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
