import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      console.log(" in add use : , state, : ", state, " action is : ", action);
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
    getLoggedUser: (state) => {
      return state;
    },
  },
});

// export actions
export const { addUser, removeUser, getLoggedUser } = userSlice.actions;

// export reducer
export default userSlice.reducer;
