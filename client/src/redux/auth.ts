import { generateRandomRGB } from "@/utils/rgb";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  rgb: string;
};

interface IInitialState {
  users: User[];
  user_id: string | null;
}

const initialState: IInitialState = {
  users: [],
  user_id: null,
};

interface IAddUsers {
  connection_ids: Array<string>;
}

interface ISetUserId {
  user_id: string;
}

interface IRemoveUser {
  connection_id: string;
}

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId(state: IInitialState, action: PayloadAction<ISetUserId>) {
      state.user_id = action.payload.user_id;
    },
    addUsers(state: IInitialState, action: PayloadAction<IAddUsers>) {
      const connection_ids = action.payload.connection_ids;
      connection_ids
        .filter((cid: string) => !state.users.find((u: User) => u.id === cid))
        .map((cid: string) => {
          state.users = [...state.users, { id: cid, rgb: generateRandomRGB() }];
        });
    },
    removeUser(state: IInitialState, action: PayloadAction<IRemoveUser>) {
      state.users = state.users.filter(
        (u: User) => action.payload.connection_id !== u.id,
      );
    },
  },
});

export const { setUserId, addUsers, removeUser } = userSlice.actions;
export const authReducer = userSlice.reducer;
