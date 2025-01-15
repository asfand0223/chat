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

interface IAddUser {
  user: User;
}

interface ISetUserId {
  user_id: string;
}

interface IRemoveUsers {
  connection_ids: Array<string>;
}

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId(state: IInitialState, action: PayloadAction<ISetUserId>) {
      state.user_id = action.payload.user_id;
    },
    addUser(state: IInitialState, action: PayloadAction<IAddUser>) {
      const user = action.payload.user;
      if (state.users.find((u: User) => u.id === user.id)) return;
      state.users = [...state.users, user];
    },
    removeUsers(state: IInitialState, action: PayloadAction<IRemoveUsers>) {
      state.users = state.users.filter((u: User) =>
        action.payload.connection_ids.includes(u.id),
      );
    },
  },
});

export const { setUserId, addUser, removeUsers } = userSlice.actions;
export const authReducer = userSlice.reducer;
