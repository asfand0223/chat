import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Chatter = {
  group: string;
  connection_id: string;
  colour: string;
};

interface IInitialState {
  chatters: Array<Chatter>;
}

const initialState: IInitialState = {
  chatters: [],
};

interface IAddChatter {
  chatter: Chatter;
}

interface IAddChatters {
  chatters: Array<Chatter>;
}

interface IRemoveChatter {
  connection_id: string;
}

export const chatHubSlice = createSlice({
  name: "chatHub",
  initialState,
  reducers: {
    addChatter(state: IInitialState, action: PayloadAction<IAddChatter>) {
      const newChatter = action.payload.chatter;
      if (
        state.chatters.find(
          (c: Chatter) => c.connection_id === newChatter.connection_id,
        )
      )
        return;
      state.chatters = [...state.chatters, newChatter];
    },
    addChatters(state: IInitialState, action: PayloadAction<IAddChatters>) {
      action.payload.chatters
        .filter(
          (c: Chatter) =>
            !state.chatters.find(
              (x: Chatter) => x.connection_id === c.connection_id,
            ),
        )
        .map((c: Chatter) => {
          state.chatters = [...state.chatters, c];
        });
    },
    removeChatter(state: IInitialState, action: PayloadAction<IRemoveChatter>) {
      state.chatters = state.chatters.filter(
        (c: Chatter) => action.payload.connection_id !== c.connection_id,
      );
    },
  },
});

export const { addChatter, addChatters, removeChatter } = chatHubSlice.actions;
export const chat_hub_reducer = chatHubSlice.reducer;
