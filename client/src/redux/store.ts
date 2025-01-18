import { configureStore } from "@reduxjs/toolkit";
import { chat_reducer } from "./chat";
import { chat_hub_reducer } from "./chat_hub";

export const store = configureStore({
  reducer: { chat_hub: chat_hub_reducer, chat: chat_reducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
