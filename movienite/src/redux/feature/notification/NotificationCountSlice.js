import { createSlice } from "@reduxjs/toolkit";

export const notificationCountSlice = createSlice({
  name: "notificationCount",
  initialState: {
    value: 4, // after that get value from backend
  },
  reducers: {
    increment: (state) => {
      state.value += 1; //mark as unread
    },
    decrement: (state) => {
      state.value -= 1; //mark as read
    },
  },
});

export const {increment, decrement} = notificationCountSlice.actions;
export default notificationCountSlice.reducer;
export const selectNotificationCount = (state) => state.notificationCount.value;
