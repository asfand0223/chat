import { Message } from "@/redux/chat";
import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (
  hubUrl: string,
): Promise<signalR.HubConnection> => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    try {
      await connection.start();
    } catch (error) {
      console.error("SignalR connection error:", error);
    }
  }

  return connection;
};

interface IJoinGroupParams {
  group: string;
}

export const joinGroup = async ({ group }: IJoinGroupParams) => {
  const connection = getSignalRConnection();
  if (connection) {
    try {
      await connection.invoke("JoinGroup", group);
    } catch (error) {
      console.error("JoinGroup Error:", error);
    }
  }
};

interface ISendMessageParams {
  message: Message;
}

export const sendMessage = async ({ message }: ISendMessageParams) => {
  const connection = getSignalRConnection();
  if (connection) {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.error("SendMessage Error:", error);
    }
  }
};

export const getSignalRConnection = (): signalR.HubConnection | null =>
  connection;
