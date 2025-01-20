import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Chatter = {
  group: string;
  connection_id: string;
  colour: string;
};

interface IInitialState {
  chatter: Chatter | null;
}

const initialState: IInitialState = {
  chatter: null,
};

interface ISetChatter {
  chatter: Chatter;
}

export const chatHubSlice = createSlice({
  name: "chatHub",
  initialState,
  reducers: {
    setChatter(state: IInitialState, action: PayloadAction<ISetChatter>) {
      state.chatter = action.payload.chatter;
    },
  },
});

export const { setChatter } = chatHubSlice.actions;
export const chat_hub_reducer = chatHubSlice.reducer;
