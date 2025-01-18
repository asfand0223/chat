"use client";
import { useEffect, useRef } from "react";
import Chat from "../components/chat/chat";
import {
  getSignalRConnection,
  joinGroup,
  startSignalRConnection,
} from "@/utils/signalr";
import { addMessage } from "@/redux/chat";
import { useDispatch } from "react-redux";
import {
  removeChatter,
  Chatter,
  addChatter,
  addChatters,
} from "@/redux/chat_hub";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styles from "./page.module.scss";

const Home = () => {
  const group = "Chat";
  const dispatch = useDispatch();
  const hubUrl = "http://localhost:5000/chat";
  const { chatters } = useSelector((state: RootState) => state.chat_hub);
  const chattersRef = useRef<Array<Chatter>>(chatters);

  useEffect(() => {
    chattersRef.current = chatters;
  }, [chatters]);

  useEffect(() => {
    const startSignalRConnectionAsync = async () => {
      try {
        const connection = await startSignalRConnection(hubUrl);

        if (!connection) return;

        connection.on("ChatterJoined", (chatter) => {
          dispatch(addChatter({ chatter }));
        });
        connection.on(
          "ReceiveMessage",
          (connection_id: string, message: string) => {
            console.log(
              chattersRef.current.find(
                (c: Chatter) => c.connection_id === connection_id,
              )?.colour,
            );
            dispatch(
              addMessage({
                message: {
                  id: connection_id,
                  content: message,
                  rgb:
                    chattersRef.current.find(
                      (c: Chatter) => c.connection_id === connection_id,
                    )?.colour || "rgb(0, 0, 0)",
                },
              }),
            );
          },
        );
        connection.on("RemoveChatter", (connection_id: string) => {
          dispatch(
            removeChatter({
              connection_id,
            }),
          );
        });
        connection.on("ReceiveChatters", (chatters) => {
          dispatch(addChatters({ chatters }));
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
