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

export const joinGroup = async () => {
  const connection = getSignalRConnection();
  if (connection) {
    try {
      await connection.invoke("JoinGroup");
    } catch (error) {
      console.error("JoinGroup Error:", error);
    }
  }
};

interface ISendMessageParams {
  connectionId: string;
  message: string;
}

export const sendMessage = async ({
  connectionId,
  message,
}: ISendMessageParams) => {
  const connection = getSignalRConnection();
  if (connection) {
    try {
      await connection.invoke("SendMessage", connectionId, message);
    } catch (error) {
      console.error("SendMessage Error:", error);
    }
  }
};

export const getSignalRConnection = (): signalR.HubConnection | null =>
  connection;
