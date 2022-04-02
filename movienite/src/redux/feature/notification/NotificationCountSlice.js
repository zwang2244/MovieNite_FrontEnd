import { createSlice } from "@reduxjs/toolkit";
import notificationData from '../../../_mock/json/notification.json'

// const arr = notification.read;
const items = notificationData.notifications.read;
export const notificationCountSlice = createSlice({
  name: "notificationCount",
  // initialState: {
  //   value: 4, // after that get value from backend
  // },
  initialState: {
    value: items.filter(item => !item.read && !item.delete).length
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
