"use client";
import { useEffect } from "react";
import Chat from "../components/chat/chat";
import {
  getSignalRConnection,
  joinGroup,
  startSignalRConnection,
} from "@/utils/signalr";
import { addMessage, Message } from "@/redux/chat";
import { useDispatch } from "react-redux";
import { Chatter, setChatter } from "@/redux/chat_hub";
import styles from "./page.module.scss";

const Home = () => {
  const group = "Chat";
  const dispatch = useDispatch();
  const hubUrl = `${process.env.NEXT_PUBLIC_CHAT_HUB_URL as string}/chat`;

  useEffect(() => {
    const startSignalRConnectionAsync = async () => {
      try {
        const connection = await startSignalRConnection(hubUrl);

        if (!connection) return;

        connection.on("JoinedGroup", (chatter: Chatter) => {
          dispatch(setChatter({ chatter }));
        });
        connection.on("ReceiveMessage", (message: Message) => {
          dispatch(
            addMessage({
              message,
            }),
          );
        });
        await joinGroup({ group });
      } catch (error) {
        console.error("Start SignalR connection:", error);
      }
    };

    startSignalRConnectionAsync();

    return () => {
      getSignalRConnection()?.stop();
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Chat />
    </div>
  );
};

export default Home;
