import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  chatInput: string;
}

const initialState: IInitialState = {
  chatInput: "",
};

interface ISetChatInputPayload {
  chatInput: string;
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatInput: (
      state: IInitialState,
      action: PayloadAction<ISetChatInputPayload>,
    ) => {
      state.chatInput = action.payload.chatInput;
    },
  },
});

export const { setChatInput } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
