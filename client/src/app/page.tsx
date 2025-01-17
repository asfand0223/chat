"use client";
import { useEffect, useRef } from "react";
import Chat from "@/components/Chat";
import {
  getSignalRConnection,
  joinGroup,
  startSignalRConnection,
} from "@/utils/signalr";
import { addMessage } from "@/redux/chat";
import { useDispatch } from "react-redux";
import { addUsers, removeUser, User } from "@/redux/auth";
import styles from "./page.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const hubUrl = "http://localhost:5000/chat";
  const { users } = useSelector((state: RootState) => state.auth);
  const usersRef = useRef<User[]>(users);
  useEffect(() => {
    usersRef.current = users;
  }, [users]);
  useEffect(() => {
    const connectToSignalR = async () => {
      const connection = await startSignalRConnection(hubUrl);

      if (connection) {
        await joinGroup();
        connection.on(
          "ReceiveMessage",
          (connection_id: string, message: string) => {
            dispatch(
              addMessage({
                message: {
                  id: connection_id,
                  content: message,
                  rgb:
                    usersRef.current.find((u: User) => u.id === connection_id)
                      ?.rgb || "rgb(0, 0, 0)",
                },
              }),
            );
          },
        );
        connection.on(
          "ReceiveConnectionIds",
          (connection_ids: Array<string>) => {
            dispatch(
              addUsers({
                connection_ids,
              }),
            );
          },
        );
        connection.on("RemoveConnectionId", (connection_id: string) => {
          dispatch(
            removeUser({
              connection_id,
            }),
          );
        });
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
