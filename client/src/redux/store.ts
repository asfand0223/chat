import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./chat";
import { authReducer } from "./auth";

export const store = configureStore({
  reducer: { auth: authReducer, chat: chatReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
