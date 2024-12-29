"use client";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { setChatInput } from "@/redux/chat";

interface IChatInputProps {
  maxRows: number;
}

const ChatInput: React.FC<IChatInputProps> = ({ maxRows }) => {
  const { chatInput } = useSelector((state: RootState) => state.chat);
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

    dispatch(setChatInput({ chatInput: e.target.value }));
  };
  return (
    <div className={styles.container}>
      <textarea
        ref={textAreaRef}
        value={chatInput}
        rows={1}
        onChange={handletextAreaChange}
        className={styles.textarea}
      ></textarea>
      <button className={styles.sendButton}>Send</button>
    </div>
  );
};

export default ChatInput;
