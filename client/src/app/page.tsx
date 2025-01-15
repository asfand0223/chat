"use client";
import { useEffect } from "react";
import Chat from "@/components/Chat";
import {
  getSignalRConnection,
  joinGroup,
  startSignalRConnection,
} from "@/utils/signalr";
import { addMessage } from "@/redux/chat";
import { useDispatch } from "react-redux";
import { generateRandomRGB } from "@/utils/rgb";
import { addUser, removeUsers } from "@/redux/auth";
import styles from "./page.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const hubUrl = "http://localhost:5000/chat";

  useEffect(() => {
    const connectToSignalR = async () => {
      const connection = await startSignalRConnection(hubUrl);

      if (connection) {
        await joinGroup();
        if (connection && connection.connectionId) {
        }
        connection.on(
          "ReceiveMessage",
          (connection_id: string, message: string) => {
            dispatch(
              addMessage({
                message: {
                  id: connection_id,
                  content: message,
                },
              }),
            );
          },
        );
        connection.on(
          "ReceiveConnectionIds",
          (connection_ids: Array<string>) => {
            connection_ids.map((cid: string) => {
              dispatch(
                addUser({
                  user: {
                    id: cid,
                    rgb: generateRandomRGB(),
                  },
                }),
              );
            });
          },
        );
        connection.on(
          "RemoveConnectionIds",
          (connection_ids: Array<string>) => {
            dispatch(
              removeUsers({
                connection_ids,
              }),
            );
          },
        );
      }
      await connection.invoke("GetConnectionIds");
    };

    connectToSignalR();
    return () => {
      const connection = getSignalRConnection();
      if (connection) {
        connection.stop();
      }
    };
  }, []);
  return (
    <div className={styles.container}>
      <Chat />
    </div>
  );
};

export default Home;
