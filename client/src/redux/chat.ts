import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  connection_id: string;
  group: string;
  content: string;
  colour: string;
};

interface IInitialState {
  chat_input: string;
  messages: Array<Message>;
}

const initialState: IInitialState = {
  chat_input: "",
  messages: [],
};

interface ISetChatInputPayload {
  chat_input: string;
}

interface IAddMessage {
  message: Message;
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatInput: (
      state: IInitialState,
      action: PayloadAction<ISetChatInputPayload>,
    ) => {
      state.chat_input = action.payload.chat_input;
    },
    addMessage(state: IInitialState, action: PayloadAction<IAddMessage>) {
      state.messages = [...state.messages, action.payload.message];
    },
  },
});

export const { setChatInput, addMessage } = chatSlice.actions;
export const chat_reducer = chatSlice.reducer;
